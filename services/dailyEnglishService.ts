import { GoogleGenAI, Type } from '@google/genai';

declare const __GEMINI_API_KEY__: string | undefined;

const getGeminiApiKey = () => {
  const viteEnv = (import.meta as any).env || {};
  const fromVite = viteEnv.VITE_GEMINI_API_KEY || viteEnv.GEMINI_API_KEY || viteEnv.VITE_API_KEY || viteEnv.API_KEY || '';
  const fromInjected = typeof __GEMINI_API_KEY__ !== 'undefined' ? __GEMINI_API_KEY__ : '';
  const fromProcess = typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY || process.env?.API_KEY || '' : '';
  return fromVite || fromInjected || fromProcess;
};

const getAiClient = () => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('ยังไม่ได้ตั้งค่า Gemini API Key');
  }
  return new GoogleGenAI({ apiKey });
};

export interface DailyEnglishVocabulary {
  word: string;
  partOfSpeech: string;
  meaningTh: string;
  example: string;
}

export interface DailyEnglishLesson {
  dateKey: string;
  title: string;
  level: string;
  englishParagraphs: string[];
  thaiParagraphs: string[];
  vocabulary: DailyEnglishVocabulary[];
  cartoonScene: {
    setting: string;
    mainCharacter: string;
    keyObjects: string[];
    mood: string;
    colorA: string;
    colorB: string;
  };
  generatedAt: string;
}

export const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const generateDailyEnglishLesson = async (dateKey = getLocalDateKey()): Promise<DailyEnglishLesson> => {
  const ai = getAiClient();

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Create one daily English practice lesson for Thai learners preparing for teacher exams.

Date key: ${dateKey}

Requirements:
- The article must be natural English, about everyday life, school, learning, work, technology, health, or society.
- Write exactly 3 English paragraphs. Each paragraph should be 55-80 words.
- Translate each paragraph into Thai naturally, exactly 3 Thai paragraphs aligned by paragraph.
- Extract 10-20 useful vocabulary items from the article.
- Include a simple cartoon scene description that can be rendered as a friendly illustration.
- Keep the level around A2-B1, clear but not childish.
- Avoid copyrighted characters, real public figures, brands, or sensitive political content.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          level: { type: Type.STRING },
          englishParagraphs: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          thaiParagraphs: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          vocabulary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                word: { type: Type.STRING },
                partOfSpeech: { type: Type.STRING },
                meaningTh: { type: Type.STRING },
                example: { type: Type.STRING },
              },
              required: ['word', 'partOfSpeech', 'meaningTh', 'example'],
            },
          },
          cartoonScene: {
            type: Type.OBJECT,
            properties: {
              setting: { type: Type.STRING },
              mainCharacter: { type: Type.STRING },
              keyObjects: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              mood: { type: Type.STRING },
              colorA: { type: Type.STRING },
              colorB: { type: Type.STRING },
            },
            required: ['setting', 'mainCharacter', 'keyObjects', 'mood', 'colorA', 'colorB'],
          },
        },
        required: ['title', 'level', 'englishParagraphs', 'thaiParagraphs', 'vocabulary', 'cartoonScene'],
      },
    },
  });

  if (!response.text) {
    throw new Error('Gemini ไม่ได้ส่งข้อมูลบทเรียนกลับมา');
  }

  const parsed = JSON.parse(response.text) as Omit<DailyEnglishLesson, 'dateKey' | 'generatedAt'>;

  return {
    ...parsed,
    englishParagraphs: parsed.englishParagraphs.slice(0, 3),
    thaiParagraphs: parsed.thaiParagraphs.slice(0, 3),
    vocabulary: parsed.vocabulary.slice(0, 20),
    dateKey,
    generatedAt: new Date().toISOString(),
  };
};
