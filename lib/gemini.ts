import { GoogleGenAI, Type } from "@google/genai";

const getGeminiApiKey = () => {
  const viteEnv = (import.meta as any).env || {};
  const fromVite = viteEnv.VITE_GEMINI_API_KEY || viteEnv.GEMINI_API_KEY || viteEnv.VITE_API_KEY || viteEnv.API_KEY || '';
  const fromProcess = typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY || process.env?.API_KEY || '' : '';
  return fromVite || fromProcess;
};

const getAiClient = () => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("ยังไม่ได้ตั้งค่า Gemini API Key");
  }
  return new GoogleGenAI({ apiKey });
};

export interface ExamQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export async function generateMajorQuestions(major: string, count: number = 10): Promise<ExamQuestion[]> {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `สร้างข้อสอบปรนัย 4 ตัวเลือก สำหรับสอบบรรจุครูผู้ช่วย วิชาเอก${major} จำนวน ${count} ข้อ โดยอ้างอิงจากเนื้อหาที่มักออกสอบจริงย้อนหลัง 10 ปี`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              subject: { type: Type.STRING, description: "ชื่อวิชาเอก" },
              question: { type: Type.STRING, description: "โจทย์คำถาม" },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "ตัวเลือก 4 ข้อ"
              },
              correctAnswer: { type: Type.INTEGER, description: "index ของคำตอบที่ถูกต้อง (0-3)" }
            },
            required: ["subject", "question", "options", "correctAnswer"]
          }
        }
      }
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return parsed.map((q: any, index: number) => ({
        ...q,
        id: index + 1
      }));
    }
    return [];
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("ไม่สามารถสร้างข้อสอบได้ในขณะนี้");
  }
}

export async function generateInterviewQuestions(count: number = 10): Promise<string[]> {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `สร้างคำถามสัมภาษณ์สำหรับการสอบบรรจุครูผู้ช่วย (ภาค ค ความเหมาะสมกับตำแหน่ง) จำนวน ${count} ข้อ ที่ใช้วัดทัศนคติ จิตวิญญาณความเป็นครู การแก้ปัญหาเฉพาะหน้า และวุฒิภาวะทางอารมณ์`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: "คำถามสัมภาษณ์"
          }
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating interview questions:", error);
    throw new Error("ไม่สามารถสร้างคำถามสัมภาษณ์ได้");
  }
}

export interface InterviewEvaluation {
  score: number;
  feedback: string;
  strengths: string;
  weaknesses: string;
}

export async function evaluateInterviewAnswer(question: string, answer: string): Promise<InterviewEvaluation> {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `ประเมินคำตอบสัมภาษณ์ครูผู้ช่วย
คำถาม: ${question}
คำตอบของผู้เข้าสอบ: ${answer}

จงประเมินคำตอบนี้ตามหลักวิชาการ ความถูกต้องเหมาะสม และวุฒิภาวะความเป็นครู ให้คะแนนเต็ม 10 พร้อมอธิบายจุดเด่นและจุดที่ควรพัฒนาอย่างละเอียด`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "คะแนน 0-10" },
            feedback: { type: Type.STRING, description: "คำอธิบายการประเมินภาพรวม" },
            strengths: { type: Type.STRING, description: "จุดเด่นของคำตอบ" },
            weaknesses: { type: Type.STRING, description: "จุดที่ควรพัฒนาหรือข้อควรระวัง" }
          },
          required: ["score", "feedback", "strengths", "weaknesses"]
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error evaluating answer:", error);
    throw new Error("ไม่สามารถประเมินคำตอบได้");
  }
}
