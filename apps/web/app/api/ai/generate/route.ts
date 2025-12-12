import { authOptions } from "@/lib/auth"
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { generateText } from "ai"
import { model } from "@/lib/ai-sdk"
import { z } from "zod"

const RequestSchema = z.object({
    question: z.string().min(1),
    context: z.object({
        role: z.string().optional(),
        experience: z.string().optional(),
        resumeSummary: z.string().optional(),
    }).optional(),
})

export async function POST(req: Request) {
    let body;
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        body = await req.json()
        const { question, context } = RequestSchema.parse(body)

        const isPro = await checkSubscription()
        const freeTrial = await checkApiLimit()
        // Bypass limit if custom key is present
        const hasCustomKey = !!process.env.GOOGLE_GENERATIVE_AI_API_KEY || !!process.env.GROQ_API_KEY;

        if (!isPro && !freeTrial && !hasCustomKey) {
            return new NextResponse(JSON.stringify({
                error: "Plan limit exceeded. Upgrade to Pro for unlimited usage."
            }), { status: 429, headers: { 'Content-Type': 'application/json' } })
        }

        // --- Mock Response for Testing without Real API Key ---
        const hasKey = !!process.env.GOOGLE_GENERATIVE_AI_API_KEY || !!process.env.GROQ_API_KEY || !!process.env.OPENROUTER_API_KEY || (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "mock");
        if (!hasKey) {
            console.log("[AI] Returning MOCK response due to missing/mock key.");

            // Wait a bit to simulate network
            await new Promise(r => setTimeout(r, 1000));

            const mockResponse = {
                answer: `[MOCK AI RESPONSE] \n\nThis is a simulated answer because the GROQ_API_KEY is currently set to 'mock' or is missing.\n\nYour Question: "${question}"\n\nIn a real scenario, I would analyze this using Groq Llama 3 and provide a structured interview response based on your role${context?.role ? " as " + context.role : ""} and experience level${context?.experience ? " (" + context.experience + ")" : ""}. \n\nTo enable real AI, please add a valid Groq API key to your .env file.`,
                structure: ["Point 1 (Mock)", "Point 2 (Mock)", "Point 3 (Mock)"],
                shortVersion: "Mock answer triggered."
            };

            if (!isPro) {
                await increaseApiLimit()
            }
            return NextResponse.json(mockResponse);
        }
        // -----------------------------------------------------

        // AI Generation Logic
        const systemPrompt = `You are an expert ${context?.role || "software engineer"} interviewer powered by Groq Llama 3. 
            Experience Level: ${context?.experience || "General"}.
            Resume Context: ${context?.resumeSummary || "None"}.
            
            Provide a structured answer to the interview question.
            If the user asks for code analysis or generation, you MUST provide the code in the 'answer' field using Markdown code blocks.
            CRITICAL: Ensure all newlines inside the 'answer' string are properly escaped (e.g. use \\n instead of literal newlines). The output must be valid minified JSON.

            Format your response as a JSON object with keys:
            - answer: The detailed answer.
            - structure: An array of strings representing key points.
            - shortVersion: A concise summary.
            
            Return ONLY valid JSON.`

        // Check for n8n/Custom Webhook Integration
        const n8nUrl = process.env.N8N_WEBHOOK_URL;

        if (n8nUrl) {
            console.log("Using n8n Webhook:", n8nUrl);
            const n8nResponse = await fetch(n8nUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question, context })
            });

            if (!n8nResponse.ok) {
                console.error("n8n Error:", await n8nResponse.text());
                throw new Error("Failed to fetch response from n8n");
            }

            const result = await n8nResponse.json();

            // Normalize n8n response if needed, assuming it matches the schema
            return NextResponse.json(result);
        }

        // Fallback to OpenAI (now OpenRouter via Vercel AI SDK)
        const { text } = await generateText({
            model: model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: question }
            ],
        })

        console.log("[AI RAW OUTPUT]:", text);

        // Robust JSON extraction: Find the first '{' and the last '}'
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');

        let cleanText = "";

        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
            cleanText = text.substring(jsonStart, jsonEnd + 1);
        } else {
            // Fallback: Strip markdown if exact braces verify hard
            cleanText = text.replace(/```json\n?|```/g, "").trim();
        }



        let result;
        try {
            // First attempt: Parse "clean" text
            result = JSON.parse(cleanText || "{}");
        } catch (initialError) {
            console.log("[AI_PARSE_ERROR] Initial parse failed:", initialError);

            // Second attempt: Try to sanitize newlines in strings
            try {
                const sanitizedText = cleanText.replace(/([a-zA-Z0-9])\n/g, "$1\\n");
                result = JSON.parse(sanitizedText);
            } catch {
                console.log("[AI_PARSE_ERROR] Retry failed. Using RAW FALLBACK.");
                // GUARANTEED FALLBACK: Never throw here
                result = {
                    answer: text || "No response generated.", // Use original full text
                    structure: ["Complex Output (Raw)"],
                    shortVersion: "Raw Output"
                };
            }
        }

        if (!isPro && !hasCustomKey) {
            await increaseApiLimit()
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error("DETAILS:", JSON.stringify(error, null, 2));
        console.error("MESSAGE:", (error as Error).message);
        console.log("[AI_GENERATE_ERROR]", error)

        // Handle Quota/Billing Error specifically
        if ((error as { code?: string })?.code === 'insufficient_quota') {
            console.log("[AI] Quota exceeded, falling back to mock response.");
            const mockResponse = {
                answer: `[FALLBACK RESPONSE] \n\nThe Google API key provided has exceeded its quota (insufficient_quota). \n\nI have switched to a simulated response so you can still test the UI.\n\nYour Question: "${body?.question || 'Unknown'}"\n\nTo fix this, check your billing details at aistudio.google.com.`,
                structure: ["Quota limit reached", "Falling back to mock", "Check Google billing"],
                shortVersion: "Quota exceeded. Mocking response."
            };
            return NextResponse.json(mockResponse);
        }

        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data", { status: 400 })
        }
        return new NextResponse(JSON.stringify({ error: (error as Error).message || "Internal Server Error", details: error }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}
