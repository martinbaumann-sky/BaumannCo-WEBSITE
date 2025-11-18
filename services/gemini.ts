import { GoogleGenAI, Type } from "@google/genai";
import { AiAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeBusinessChallenge = async (challenge: string, companyName: string): Promise<AiAnalysisResult> => {
  try {
    const prompt = `
      Actúa como un consultor senior de negocios de Baumann&Co.
      El cliente de la empresa "${companyName}" ha descrito el siguiente desafío o necesidad: "${challenge}".
      
      Analiza brevemente la situación y recomienda uno de nuestros servicios principales (Estrategia Corporativa, Transformación Digital, Optimización de Operaciones, Gestión de Talento, o Consultoría Financiera).
      Proporciona una agenda preliminar de 3 puntos para una primera reunión.
      
      Responde en español profesional.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Eres un experto consultor corporativo. Tu tono es profesional, empático y orientado a resultados.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedService: {
              type: Type.STRING,
              description: "El nombre del servicio recomendado."
            },
            analysis: {
              type: Type.STRING,
              description: "Un breve párrafo analizando el problema del cliente (máximo 30 palabras)."
            },
            agenda: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 puntos clave para discutir en la reunión."
            }
          },
          required: ["recommendedService", "analysis", "agenda"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AiAnalysisResult;
    }
    
    throw new Error("No text returned from Gemini");
  } catch (error) {
    console.error("Error analyzing challenge:", error);
    // Fallback in case of error to ensure UI doesn't break
    return {
      recommendedService: "Consultoría General",
      analysis: "Hemos recibido su solicitud. Un consultor revisará su caso detalladamente.",
      agenda: ["Revisión de objetivos", "Análisis de situación actual", "Próximos pasos"]
    };
  }
};