import React, { useState, useEffect } from 'react';
import { Chat } from '@google/genai';
import { UserProfile, DailyPlan, Meal } from './types';
import { generateDailyPlan, createChatSession } from './services/geminiService';
import UserProfileForm from './components/UserProfileForm';
import MealCard from './components/MealCard';
import RecipeModal from './components/RecipeModal';
import AIChat from './components/AIChat';
import { ChefIcon } from './components/Icons';

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [dailyPlan, setDailyPlan] = useState<DailyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Scroll to top when plan loads
  useEffect(() => {
    if (dailyPlan) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [dailyPlan]);

  const handleProfileSubmit = async (userProfile: UserProfile) => {
    setProfile(userProfile);
    setIsLoading(true);
    try {
      // Parallel execution: Get Plan & Init Chat
      const [plan, chat] = await Promise.all([
        generateDailyPlan(userProfile),
        Promise.resolve(createChatSession(userProfile)) 
        // Note: Chat creation is synchronous in API, but keeping structure clean
      ]);
      
      setDailyPlan(plan);
      setChatSession(chat);
    } catch (error) {
      alert("生成食谱失败，请检查网络或稍后再试。");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetApp = () => {
    setDailyPlan(null);
    setProfile(null);
    setChatSession(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 text-gray-800 font-sans pb-20">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetApp}>
            <div className="bg-primary p-2 rounded-lg text-white">
              <ChefIcon className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">FitLife <span className="text-primary">AI</span></h1>
          </div>
          {dailyPlan && (
            <button onClick={resetApp} className="text-sm font-medium text-gray-500 hover:text-primary transition">
              重新定制
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!dailyPlan ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <UserProfileForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
          </div>
        ) : (
          <div className="animate-fade-in space-y-10">
            
            {/* Header Section */}
            <div className="text-center space-y-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold tracking-wide uppercase">
                专属你的今日减脂方案
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900">健康吃，轻松瘦</h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                AI 根据你的身体数据（{profile?.height}cm / {profile?.weight}kg）量身打造。
              </p>
            </div>

            {/* Daily Tip */}
            {dailyPlan.tips && (
              <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-2xl text-white shadow-lg transform hover:scale-[1.01] transition duration-300">
                <h3 className="text-lg font-bold mb-1 opacity-90">💡 营养师小贴士</h3>
                <p className="font-medium text-lg">{dailyPlan.tips}</p>
              </div>
            )}

            {/* Meal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <MealCard 
                title="早餐 Breakfast" 
                meal={dailyPlan.breakfast} 
                imageSrc="https://picsum.photos/seed/breakfast_healthy/600/400"
                onViewRecipe={() => setSelectedMeal(dailyPlan.breakfast)}
              />
              <MealCard 
                title="午餐 Lunch" 
                meal={dailyPlan.lunch} 
                imageSrc="https://picsum.photos/seed/lunch_salad/600/400"
                onViewRecipe={() => setSelectedMeal(dailyPlan.lunch)}
              />
              <MealCard 
                title="晚餐 Dinner" 
                meal={dailyPlan.dinner} 
                imageSrc="https://picsum.photos/seed/dinner_lean/600/400"
                onViewRecipe={() => setSelectedMeal(dailyPlan.dinner)}
              />
            </div>
            
            <div className="text-center text-gray-400 text-sm mt-12">
              * 食谱由 AI 生成，仅供参考。如有特殊健康状况，请咨询专业医生。
            </div>
          </div>
        )}
      </main>

      {/* Interactive Elements */}
      <RecipeModal 
        meal={selectedMeal} 
        isOpen={!!selectedMeal} 
        onClose={() => setSelectedMeal(null)} 
      />

      {dailyPlan && (
        <AIChat 
          chatSession={chatSession} 
          isOpen={isChatOpen} 
          setIsOpen={setIsChatOpen} 
        />
      )}
    </div>
  );
}

export default App;