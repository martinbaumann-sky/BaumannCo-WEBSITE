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
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Eres un experto consultor corporativo de la firma Baumann&Co. Tu tono es profesional, analítico y ejecutivo. Ayudas a empresas medianas a encontrar orden y rentabilidad.",
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
    return {
      recommendedService: "Consultoría Estratégica",
      analysis: "Hemos recibido su información. Un socio de Baumann&Co analizará su caso para proponer una hoja de ruta personalizada.",
      agenda: ["Alineamiento de objetivos", "Revisión de estructura actual", "Identificación de cuellos de botella"]
    };
  }
};