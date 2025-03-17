
import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  className?: string;
}

const MetricCard = ({
  icon,
  iconBgColor,
  label,
  value,
  trend,
  className,
}: MetricCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-hover-lift",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div 
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-white",
            iconBgColor
          )}
        >
          {icon}
        </div>
        
        {trend && (
          <div className={cn(
            "flex items-center text-sm font-medium",
            trend.direction === 'up' ? 'text-metric-positive' : 'text-metric-negative'
          )}>
            {trend.direction === 'up' ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {trend.value}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;
