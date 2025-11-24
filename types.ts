export enum Gender {
  MALE = '男',
  FEMALE = '女'
}

export enum ActivityLevel {
  SEDENTARY = '久坐不动',
  LIGHT = '轻度活动 (每周1-3次运动)',
  MODERATE = '中度活动 (每周3-5次运动)',
  ACTIVE = '高度活动 (每周6-7次运动)',
}

export interface UserProfile {
  age: number;
  height: number; // cm
  weight: number; // kg
  gender: Gender;
  activityLevel: ActivityLevel;
  goal: string; // e.g., "Lose 5kg"
  preferences: string; // e.g., "No spicy food", "Vegetarian"
}

export interface RecipeStep {
  step: number;
  instruction: string;
}

export interface Meal {
  name: string;
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
  ingredients: string[];
  cookingTime: string;
  instructions: string[]; // Simple array of strings for steps
  description: string;
}

export interface DailyPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  tips: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}