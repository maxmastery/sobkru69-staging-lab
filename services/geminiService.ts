import { GoogleGenAI, Type } from "@google/genai";

const getGeminiApiKey = () => {
  const viteEnv = (import.meta as any).env || {};
  const fromVite = viteEnv.VITE_GEMINI_API_KEY || viteEnv.GEMINI_API_KEY || '';
  const fromProcess = typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY || '' : '';
  return fromVite || fromProcess;
};

const getAiClient = () => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('ยังไม่ได้ตั้งค่า Gemini API Key');
  }
  return new GoogleGenAI({ apiKey });
};

export const verifyPaymentSlip = async (base64Image: string): Promise<{
  isValid: boolean;
  amount?: number;
  bank?: string;
  recipient?: string;
  message?: string;
}> => {
  try {
    const ai = getAiClient();
    const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: `Perform a strict, production-level forensic analysis of this Thai bank transfer slip (สลิปโอนเงิน). 

CRITICAL RULES FOR VALIDATION (MUST PASS ALL):
1. AUTHENTICITY: The image MUST be a genuine, unedited bank transfer slip. Look closely for signs of forgery:
   - Mismatched fonts or text sizes.
   - Misaligned text or irregular spacing.
   - Blurriness, pixelation, or artifacts around the text (especially name and amount).
   - Missing standard elements (Transaction Reference Number/รหัสอ้างอิง, Date/Time, Bank Logos, Verification QR Code).
   - If it looks like text was pasted over an existing image, REJECT IT.
2. RECIPIENT: The receiver's name MUST be exactly 'นาย ธนิท ธนพัฒนิรัชกุล' or 'MR THANIT THANAPATNIRACHKUL'.

If ALL conditions are met and the slip appears 100% authentic, set isValid to true. 
If ANY condition fails, set isValid to false and explain exactly why in the message (e.g., 'ชื่อบัญชีไม่ถูกต้อง', 'ตรวจพบความผิดปกติของสลิป (ภาพอาจถูกตัดต่อ)', 'ไม่พบรหัสอ้างอิงหรือ QR Code ตรวจสอบ').` },
            {
              inlineData: {
                data: base64Data,
                mimeType: "image/jpeg"
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValid: { type: Type.BOOLEAN, description: "True ONLY if it's a 100% authentic slip AND recipient is correct" },
            amount: { type: Type.NUMBER, description: "The transfer amount in THB" },
            bank: { type: Type.STRING, description: "The bank name" },
            recipient: { type: Type.STRING, description: "The receiver's name" },
            message: { type: Type.STRING, description: "A brief explanation of why it is valid or invalid (e.g. 'ชื่อบัญชีไม่ถูกต้อง', 'ตรวจพบร่องรอยการตัดต่อภาพ')" }
          },
          required: ["isValid"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return { isValid: false, message: "Could not parse response" };
  } catch (error: any) {
    console.error("Slip verification error:", error);
    return { isValid: false, message: error?.message || "Error verifying slip" };
  }
};

export const generateQuizFromContent = async (
  content: string,
  difficulty: 'easy' | 'hard',
  count: number,
  specificTopic?: string
): Promise<any[]> => {
  try {
    const ai = getAiClient();
    const model = 'gemini-2.5-flash';

    let difficultyPrompt = "";
    if (difficulty === 'easy') {
      difficultyPrompt = "เน้นความจำและความเข้าใจพื้นฐาน (Remembering & Understanding) ถามตรงไปตรงมา ไม่ซับซ้อน";
    } else {
      difficultyPrompt = "เน้นการวิเคราะห์ การประยุกต์ใช้ และการสังเคราะห์ (Analysis, Application & Synthesis) โจทย์ควรเป็นสถานการณ์ตัวอย่าง หรือการเปรียบเทียบข้อเท็จจริง ตัวเลือกควรมีความใกล้เคียงกันเพื่อวัดความแม่นยำ";
    }

    let topicPrompt = "";
    if (specificTopic && specificTopic !== 'all') {
      topicPrompt = `เน้นออกข้อสอบเฉพาะในหัวข้อ: "${specificTopic}" และเนื้อหาที่เกี่ยวข้อง`;
    }

    const response = await ai.models.generateContent({
      model,
      contents: `สร้างข้อสอบปรนัย (Multiple Choice) จำนวน ${count} ข้อ จากเนื้อหาต่อไปนี้
      
      บริบท: ข้อสอบสำหรับครูผู้ช่วย สังกัด สพฐ.
      ระดับความยาก: ${difficulty === 'easy' ? 'ง่าย' : 'ยาก'} (${difficultyPrompt})
      จำนวนข้อ: ${count} ข้อ
      ${topicPrompt}
      
      เนื้อหาบทเรียน:
      ${content.substring(0, 100000)} 
      
      คำแนะนำสำคัญ:
      - หากมีสัญลักษณ์ทางคณิตศาสตร์ ให้ใช้ LaTeX โดยครอบด้วยเครื่องหมาย $ เช่น $x^2$, $\\frac{1}{2}$
      - ตรวจสอบความถูกต้องของโจทย์และตัวเลือกให้ดีที่สุด
      - เฉพาะในช่องคำตอบให้ใช้ดัชนีเป็นตัวเลข 0, 1, 2, 3
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              question: { type: Type.STRING, description: "คำถาม" },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "ตัวเลือก 4 ข้อ (ก, ข, ค, ง) ใส่เฉพาะข้อความตัวเลือก ไม่ต้องใส่ ก. ข."
              },
              correctAnswer: { type: Type.INTEGER, description: "ดัชนีข้อที่ถูก (0, 1, 2, หรือ 3)" },
              explanation: { type: Type.STRING, description: "คำอธิบายเฉลยละเอียด" }
            },
            required: ["id", "question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Quiz generation error:", error);
    return [];
  }
};
