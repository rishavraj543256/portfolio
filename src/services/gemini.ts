import { GoogleGenerativeAI } from "@google/generative-ai";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

// Initialize Gemini API
// Note: In a production environment, you should use a backend proxy to hide your API key.
// For this portfolio, we'll use an environment variable.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

// Construct the system context from portfolio data
const getSystemContext = () => {
    const skillsList = skills.map(s => s.name).join(", ");

    const experienceList = experience.map(exp =>
        `${exp.role} at ${exp.company} (${exp.duration}): ${exp.description.join(" ")}`
    ).join("\n\n");

    const projectsList = projects.map(p =>
        `${p.title}: ${p.description} (Tags: ${p.tags.join(", ")})`
    ).join("\n\n");

    return `
    You are an intelligent virtual assistant for Rishav Raj's portfolio website.
    Your goal is to answer visitor questions about Rishav's professional background, skills, and projects.
    
    Here is Rishav's profile data:
    
    SKILLS:
    ${skillsList}
    
    EXPERIENCE:
    ${experienceList}
    
    PROJECTS:
    ${projectsList}
    
    CONTACT INFO:
    Email: rishavraj543256@gmail.com
    
    INSTRUCTIONS:
    1. Be professional, friendly, and concise.
    2. Answer in the first person plural (e.g., "We", "Rishav") or third person ("Rishav is...").
    3. If asked about something not in the data, politely say you don't have that information but they can contact Rishav directly.
    4. Keep responses short (under 3 sentences) unless asked for details.
    5. Highlight relevant skills or projects when answering general questions.
    6. If the API key is missing or invalid, apologize and provide basic info.
  `;
};

export const getGeminiResponse = async (userMessage: string) => {
    if (!API_KEY) {
        return {
            text: "I'm currently offline because my AI brain (API Key) isn't configured yet. Please contact Rishav directly!",
            options: ["Contact Info"]
        };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      ${getSystemContext()}
      
      User Question: ${userMessage}
      
      Answer:
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Simple heuristic to suggest follow-up options based on the response content
        let options: string[] = [];
        if (text.toLowerCase().includes("project")) options = ["Show Projects", "Skills"];
        else if (text.toLowerCase().includes("experience") || text.toLowerCase().includes("work")) options = ["Experience", "Download Resume"];
        else if (text.toLowerCase().includes("contact") || text.toLowerCase().includes("email")) options = ["Copy Email", "LinkedIn"];
        else options = ["Projects", "Experience", "Contact"];

        return { text, options };
    } catch (error) {
        console.error("Gemini API Error:", error);
        return {
            text: "I'm having trouble connecting to my AI services right now. Please try again later or contact Rishav directly.",
            options: ["Contact Info"]
        };
    }
};
