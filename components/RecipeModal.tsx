import React from 'react';
import { Meal } from '../types';
import { CloseIcon, ClockIcon, FireIcon } from './Icons';

interface Props {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal: React.FC<Props> = ({ meal, isOpen, onClose }) => {
  if (!isOpen || !meal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          <CloseIcon className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-2">
              减脂优选
            </span>
            <h2 className="text-3xl font-bold text-gray-800">{meal.name}</h2>
            <p className="text-gray-500 mt-2">{meal.description}</p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-xl">
              <FireIcon className="w-5 h-5" />
              <div>
                <span className="block text-xs uppercase tracking-wide opacity-70">热量</span>
                <span className="font-bold">{meal.calories} kcal</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl">
              <ClockIcon className="w-5 h-5" />
              <div>
                <span className="block text-xs uppercase tracking-wide opacity-70">用时</span>
                <span className="font-bold">{meal.cookingTime}</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-6 px-6 py-2 bg-gray-50 rounded-xl flex-grow">
               <div className="text-center">
                  <span className="block text-lg font-bold text-gray-800">{meal.protein}</span>
                  <span className="text-xs text-gray-500">蛋白质</span>
               </div>
               <div className="w-px h-8 bg-gray-300"></div>
               <div className="text-center">
                  <span className="block text-lg font-bold text-gray-800">{meal.carbs}</span>
                  <span className="text-xs text-gray-500">碳水</span>
               </div>
               <div className="w-px h-8 bg-gray-300"></div>
               <div className="text-center">
                  <span className="block text-lg font-bold text-gray-800">{meal.fats}</span>
                  <span className="text-xs text-gray-500">脂肪</span>
               </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                食材清单
              </h3>
              <ul className="space-y-3">
                {meal.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg text-gray-700">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0"></div>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                烹饪步骤
              </h3>
              <div className="space-y-6">
                {meal.instructions.map((step, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-gray-100 last:border-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary"></div>
                    <span className="block text-xs font-bold text-gray-400 mb-1">步骤 {idx + 1}</span>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;