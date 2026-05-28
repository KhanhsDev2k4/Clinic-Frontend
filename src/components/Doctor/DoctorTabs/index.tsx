import React from 'react';
import { Info, Star, Stethoscope, GraduationCap } from 'lucide-react';

interface Tab {
  key: string;
  label: string;
  icon: React.ReactNode;
}

interface DoctorTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DoctorTabs: React.FC<DoctorTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: Tab[] = [
    { key: 'about', label: 'Giới thiệu', icon: <Info className="w-5 h-5" /> },
    { key: 'expertise', label: 'Chuyên môn', icon: <Stethoscope className="w-5 h-5" /> },
    { key: 'education', label: 'Học vấn', icon: <GraduationCap className="w-5 h-5" /> },
    { key: 'reviews', label: 'Đánh giá', icon: <Star className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition ${
              activeTab === tab.key
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
export default DoctorTabs;
