type EventName =
    | 'page_view'
    | 'generate_answer'
    | 'copy_answer'
    | 'feedback_thumbs_up'
    | 'feedback_thumbs_down'
    | 'checkout_started';

export const analytics = {
    track: (event: EventName, properties?: Record<string, string | number | boolean | null>) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] ${event}`, properties);
        }
        // In production, send to PostHog / Google Analytics
    }
};
