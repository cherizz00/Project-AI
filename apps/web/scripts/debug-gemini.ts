import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load env
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
    console.error("❌ GOOGLE_GENERATIVE_AI_API_KEY is missing in .env");
    process.exit(1);
}

const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
console.log(`Using Key: ${cleanKey.substring(0, 10)}...`);

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`;
    console.log(`Querying: ${url.replace(cleanKey, 'HIDDEN_KEY')}`);

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
            console.error("❌ API returned error:");
            console.error(JSON.stringify(data.error, null, 2));
        } else {
            console.log("✅ API Success. Available Models:");
            if (data.models) {
                data.models.forEach((m: any) => {
                    console.log(m.name);
                });
            } else {
                console.log("NO_MODELS");
            }
        }
    } catch (e) {
        console.error("❌ Network/Fetch Error:", e);
    }
}

listModels();
