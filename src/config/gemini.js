import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [],
    responseMimeType: "text/plain",
};

async function run(prompt) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        console.log(result);

        // ✅ Correct way to extract response text
        const aiResponse = result?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

        console.log(aiResponse); // Logs correct output

        return aiResponse; // Returns the AI response properly

    } catch (error) {
        console.error("Error generating text:", error);
        throw error;
    }
}

// ✅ Export function properly (without executing it)
export default run;
