export const prompts = {
    generateAnswer: (question: string, type: string) => {
        return `You are an expert ${type} interviewer. 
Please provide a comprehensive answer to the following question: "${question}".
Use the STAR method (Situation, Task, Action, Result) if applicable.
Keep the tone professional and confident.`;
    },

    analyzeResume: (resumeText: string) => {
        return `Analyze the following resume and extract key skills, experience level, and potential interview red flags:
${resumeText}`;
    },

    mockInterview: (role: string) => {
        return `Act as a hiring manager interviewing a candidate for a ${role} position. 
Start by asking me to introduce myself.`;
    }
};
