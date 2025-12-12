import { openRouter } from '../lib/openrouter';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env from apps/web/.env
dotenv.config({ path: path.join(process.cwd(), 'apps/web/.env') });

async function main() {
    try {
        console.log('Testing OpenRouter connection...');
        if (!process.env.OPENROUTER_API_KEY) {
            console.error('Error: OPENROUTER_API_KEY is not set in environment variables.');
            // Try to read it manually just to see if the file write worked (ignoring dotenv issues)
            const fs = await import('fs');
            try {
                const envFile = fs.readFileSync(path.join(process.cwd(), 'apps/web/.env'), 'utf8');
                console.log('ENV file content length:', envFile.length);
                if (envFile.includes('OPENROUTER_API_KEY')) {
                    console.log('OPENROUTER_API_KEY found in .env text');
                } else {
                    console.log('OPENROUTER_API_KEY NOT found in .env text');
                }
            } catch (e) {
                console.error('Could not read .env file directly:', e);
            }
            return;
        }

        const completion = await openRouter.chat.send({
            model: 'openai/gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: 'Say "Hello, OpenRouter is working!" if you can hear me.',
                },
            ],
            stream: false,
        });

        if (completion && completion.choices && completion.choices[0]) {
            console.log('Response received:');
            console.log(completion.choices[0].message.content);
            console.log('Verification SUCCESS!');
        } else {
            console.error('Unexpected response structure:', JSON.stringify(completion, null, 2));
        }

    } catch (error) {
        console.error('Verification FAILED:', error);
    }
}

main();
