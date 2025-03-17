
import React from 'react';
import { cn } from '@/lib/utils';

interface TabNavigationProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

const TabNavigation = ({ 
  tabs, 
  activeTab, 
  onChange, 
  className 
}: TabNavigationProps) => {
  return (
    <div className={cn(
      "flex bg-secondary rounded-full p-1 w-fit",
      className
    )}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
            activeTab === tab.id 
              ? "bg-white text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
