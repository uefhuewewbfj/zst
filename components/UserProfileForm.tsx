import React, { useState } from 'react';
import { UserProfile, Gender, ActivityLevel } from '../types';
import { LoaderIcon } from './Icons';

interface Props {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const UserProfileForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<UserProfile>({
    age: 25,
    height: 170,
    weight: 70,
    gender: Gender.FEMALE,
    activityLevel: ActivityLevel.LIGHT,
    goal: '减脂增肌，变得更健康',
    preferences: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: (name === 'age' || name === 'height' || name === 'weight') ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">定制你的减脂计划</h2>
        <p className="text-gray-500">告诉AI你的身体状况，生成专属一日三餐</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">年龄</label>
            <input
              type="number"
              name="age"
              required
              value={profile.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">性别</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            >
              <option value={Gender.MALE}>男</option>
              <option value={Gender.FEMALE}>女</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">身高 (cm)</label>
            <input
              type="number"
              name="height"
              required
              value={profile.height}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">体重 (kg)</label>
            <input
              type="number"
              name="weight"
              required
              value={profile.weight}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">日常活动量</label>
          <select
            name="activityLevel"
            value={profile.activityLevel}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          >
            {Object.values(ActivityLevel).map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">减脂目标</label>
          <input
            type="text"
            name="goal"
            value={profile.goal}
            onChange={handleChange}
            placeholder="例如：一个月减重2公斤"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">饮食偏好/忌口 (可选)</label>
          <textarea
            name="preferences"
            value={profile.preferences}
            onChange={handleChange}
            placeholder="例如：不吃香菜，海鲜过敏，喜欢吃辣..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <LoaderIcon className="w-5 h-5 mr-2" />
              AI正在生成食谱...
            </>
          ) : (
            '生成减脂食谱'
          )}
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;