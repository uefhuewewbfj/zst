import React from 'react';
import { Meal } from '../types';
import { ClockIcon, FireIcon } from './Icons';

interface Props {
  title: string;
  meal: Meal;
  imageSrc: string;
  onViewRecipe: () => void;
}

const MealCard: React.FC<Props> = ({ title, meal, imageSrc, onViewRecipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full border border-gray-100 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={meal.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" 
        />
        <div className="absolute top-0 left-0 bg-black/50 text-white px-3 py-1 rounded-br-lg font-bold">
          {title}
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1" title={meal.name}>{meal.name}</h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{meal.description}</p>
          
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md text-orange-600">
              <FireIcon className="w-4 h-4" />
              <span>{meal.calories} kcal</span>
            </div>
            <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md text-blue-600">
              <ClockIcon className="w-4 h-4" />
              <span>{meal.cookingTime}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-center text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg">
             <div>
                <span className="block font-bold text-gray-700">{meal.protein}</span>
                蛋白质
             </div>
             <div>
                <span className="block font-bold text-gray-700">{meal.carbs}</span>
                碳水
             </div>
             <div>
                <span className="block font-bold text-gray-700">{meal.fats}</span>
                脂肪
             </div>
          </div>
        </div>

        <button 
          onClick={onViewRecipe}
          className="w-full py-2 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition duration-200"
        >
          查看做法详情
        </button>
      </div>
    </div>
  );
};

export default MealCard;