import { GoogleGenAI, Type, Schema, Chat } from "@google/genai";
import { UserProfile, DailyPlan } from "../types";

const apiKey = process.env.API_KEY;

// Ensure API key is present (handled gracefully in UI if not, but critical for service)
if (!apiKey) {
  console.error("API Key is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-build' });

// Define the schema for the JSON response
const mealSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Name of the dish" },
    calories: { type: Type.NUMBER, description: "Approximate calories" },
    protein: { type: Type.STRING, description: "Protein content (e.g., '25g')" },
    carbs: { type: Type.STRING, description: "Carbohydrate content" },
    fats: { type: Type.STRING, description: "Fat content" },
    ingredients: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of ingredients with quantities"
    },
    cookingTime: { type: Type.STRING, description: "Time to cook" },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Step by step cooking instructions"
    },
    description: { type: Type.STRING, description: "Short appetizing description" }
  },
  required: ["name", "calories", "ingredients", "instructions", "description"]
};

const dailyPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    breakfast: mealSchema,
    lunch: mealSchema,
    dinner: mealSchema,
    tips: { type: Type.STRING, description: "One specific health tip for this user today" }
  },
  required: ["breakfast", "lunch", "dinner", "tips"]
};

export const generateDailyPlan = async (profile: UserProfile): Promise<DailyPlan> => {
  const prompt = `
    作为一名专业的减脂营养师，请根据以下用户资料设计一份完美的一日三餐减脂食谱（早餐、午餐、晚餐）。
    
    用户资料:
    - 年龄: ${profile.age}
    - 性别: ${profile.gender}
    - 身高: ${profile.height}cm
    - 体重: ${profile.weight}kg
    - 活动量: ${profile.activityLevel}
    - 减脂目标: ${profile.goal}
    - 饮食偏好/忌口: ${profile.preferences || "无"}

    要求:
    1. 食谱必须适合中国人的饮食习惯，食材易于购买。
    2. 严格控制热量以达到减脂目的，同时保证营养均衡（高蛋白、适量碳水）。
    3. 包含详细的做法步骤。
    4. 输出必须是严格的JSON格式。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: dailyPlanSchema,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");
    
    return JSON.parse(text) as DailyPlan;
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw error;
  }
};

// Initialize a chat session
export const createChatSession = (profile: UserProfile): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `你是一位友善、专业的减脂顾问。你的用户是一位${profile.age}岁的${profile.gender}性，身高${profile.height}cm，体重${profile.weight}kg。
      他/她的目标是${profile.goal}。
      请以鼓励的口吻回答用户关于减脂、饮食、运动和刚才生成的食谱的问题。
      回答请简洁明了，使用中文。`
    }
  });
};