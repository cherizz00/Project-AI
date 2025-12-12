export interface Question {
    id: number;
    title: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    frequency: 'Low' | 'Medium' | 'High' | 'Very High';
}

export const questions: Question[] = [
    {
        id: 1,
        title: "Explain the difference between event bubbling and capturing.",
        category: "Frontend",
        difficulty: "Medium",
        frequency: "High"
    },
    {
        id: 2,
        title: "How do you handle state management in a large React application?",
        category: "System Design",
        difficulty: "Hard",
        frequency: "Very High"
    },
    {
        id: 3,
        title: "What are the ACID properties in a database?",
        category: "Backend",
        difficulty: "Easy",
        frequency: "Medium"
    },
    {
        id: 4,
        title: "Design a URL shortener like Bit.ly.",
        category: "System Design",
        difficulty: "Hard",
        frequency: "High"
    },
    {
        id: 5,
        title: "Explain the concept of closures in JavaScript.",
        category: "Frontend",
        difficulty: "Medium",
        frequency: "Very High"
    },
    {
        id: 6,
        title: "What is the difference between TCP and UDP?",
        category: "Networking",
        difficulty: "Medium",
        frequency: "High"
    },
    {
        id: 7,
        title: "How does the browser rendering engine work?",
        category: "Frontend",
        difficulty: "Hard",
        frequency: "Medium"
    }
];
