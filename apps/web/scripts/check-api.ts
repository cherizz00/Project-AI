
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY;

async function check() {
    if (!API_KEY) {
        console.error("❌ No API Key found in .env");
        return;
    }

    console.log("Checking OpenRouter API status...");

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "AI Interview Assistant Health Check"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.2-3b-instruct:free",
                messages: [{ role: "user", content: "Test." }]
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("✅ API is WORKING!");
            console.log("Response:", data.choices[0]?.message?.content?.slice(0, 50) + "...");
        } else {
            console.error(`❌ API Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error("Details:", text);
        }
    } catch (e: any) {
        console.error("❌ Connection failed:", e.message);
    }
}

check();
