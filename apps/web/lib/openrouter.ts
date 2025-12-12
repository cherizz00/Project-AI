import { OpenRouter } from '@openrouter/sdk';

const openRouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
    httpReferer: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    xTitle: 'AI Interview Assistant',
});

export { openRouter };
