import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load env
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

console.log("Checking API Key...");
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
    console.error("❌ GOOGLE_GENERATIVE_AI_API_KEY is missing in .env");
    process.exit(1);
}

console.log(`✅ API Key found: ${apiKey.substring(0, 10)}...`);

const google = createGoogleGenerativeAI({
    apiKey: apiKey,
});

const model = google('gemini-1.5-flash');

async function testGen() {
    try {
        console.log("🚀 Testing Gemini 1.5 Flash generation...");
        const result = await generateText({
            model: model,
            prompt: 'Say "Hello, World!" and nothing else.',
        });
        console.log("✅ Generation Success!");
        console.log("Output:", result.text);
    } catch (e: any) {
        console.error("❌ Generation Failed:", e);
        if (e.message.includes("API key not valid")) {
            console.error("👉 Please check if the API key is correct and valid for Gemini.");
        }
    }
}

testGen();
