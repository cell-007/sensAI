import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    },
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ],
});

// Initialize chat with standardized interview question context
const chatSession = model.startChat({
    history: [
        {
            role: "user",
            parts: [{
                text: "You are a technical interview expert. Generate interview questions and answers in JSON format. Always follow this format: [{question: string, answer: string}] without any additional commentary."
            }]
        },
        {
            role: "model",
            parts: [{
                text: "{\"questions\":[{\"question\":\"Sample question\",\"answer\":\"Sample answer\"}]}"
            }]
        }
    ]
});

export async function generateInterviewQuestions(prompt) {
    try {
        const result = await chatSession.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean and parse JSON response
        const cleanedResponse = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleanedResponse);
        
    } catch (error) {
        console.error('AI API Error:', error);
        throw new Error('Failed to generate interview questions');
    }
}

// Optional: Export chatSession directly if needed elsewhere
export { chatSession };