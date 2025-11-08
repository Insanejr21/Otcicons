import { GoogleGenAI } from "@google/genai";
import { getGeminiPrompt } from "../constants";
import { MacroType } from "../types";

const apiKey = import.meta.env.VITE_API_KEY;

// Only initialize if API key is available.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function generateIconScript(input: string, type: MacroType, itemIds: string): Promise<string> {
  if (!ai) {
    throw new Error("A chave da API do Gemini não está configurada. Usando fallback.");
  }
  const prompt = getGeminiPrompt(input, type, itemIds);

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash-latest',
        contents: prompt,
        config: {
          temperature: 0.5,
          topP: 0.95,
          topK: 64,
        }
    });

    const text = response.text;
    if (!text) {
        throw new Error("A resposta da API estava vazia.");
    }
    return text;
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    throw new Error("Falha na comunicação com a IA. Por favor, tente novamente.");
  }
}
