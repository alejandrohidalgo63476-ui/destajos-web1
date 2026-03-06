import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY no está configurada");
}

const ai = new GoogleGenAI({ apiKey });

export async function generateWeeklySummary(capturas: any[], semana: string) {
  const model = "gemini-2.0-flash";

  const prompt = `
    Analiza los siguientes datos de capturas de destajos para la Semana ${semana} y genera un resumen ejecutivo breve (máximo 150 palabras).
    Incluye:
    1. Total de actividades realizadas.
    2. Destajista con mayor productividad.
    3. Actividad más frecuente.
    4. Una recomendación u observación rápida.

    Datos:
    ${JSON.stringify(
      capturas.map(c => ({
        destajista: c.destajista_nombre,
        actividad: c.actividad_nombre,
        cantidad: c.cantidad,
        importe: c.cantidad * c.precio
      }))
    )}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
  });

  return response.text;
}