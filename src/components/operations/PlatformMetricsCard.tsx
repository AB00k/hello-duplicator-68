
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricItemProps {
  label: string;
  value: string;
  trend: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
}

const MetricItem: React.FC<MetricItemProps> = ({ label, value, trend }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold">{value}</span>
        <div className={`flex items-center text-xs px-2 py-0.5 rounded-full ${
          trend.direction === 'up' 
            ? 'bg-green-100 text-green-700' 
            : trend.direction === 'down' 
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-700'
        }`}>
          {trend.direction === 'up' ? (
            <TrendingUp className="w-3 h-3 mr-1" />
          ) : trend.direction === 'down' ? (
            <TrendingDown className="w-3 h-3 mr-1" />
          ) : null}
          {trend.value}
        </div>
      </div>
    </div>
  );
};

interface PlatformMetricsCardProps {
  platform: string;
  logo: React.ReactNode;
  score: {
    current: number;
    total: number;
  };
  metrics: {
    orderDelay: MetricItemProps;
    cancelledOrder: MetricItemProps;
    avgPrepTime: MetricItemProps;
    rejectedOrder: MetricItemProps;
    inaccurateOrder: MetricItemProps;
  };
}

const PlatformMetricsCard: React.FC<PlatformMetricsCardProps> = ({
  platform,
  logo,
  score,
  metrics
}) => {
  const scorePercentage = (score.current / score.total) * 100;
  
  // Determine performance level based on score
  let performanceLevel = 'Epic';
  let ringColor = 'bg-marketing-green';
  
  if (scorePercentage < 70) {
    performanceLevel = 'Poor';
    ringColor = 'bg-marketing-red';
  } else if (scorePercentage < 90) {
    performanceLevel = 'Good';
    ringColor = 'bg-marketing-orange';
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-hover-lift">
      <div className="flex items-center gap-2 mb-4">
        {logo}
        <h3 className="text-lg font-semibold">Operations on {platform}</h3>
      </div>
      
      <div className="flex items-center justify-between mb-6 mt-4">
        <div className="relative h-28 w-28">
          {/* Outer ring */}
          <div className={`h-28 w-28 rounded-full ${ringColor} flex items-center justify-center`}>
            <div className="h-22 w-22 rounded-full bg-white flex flex-col items-center justify-center">
              <span className="text-xl font-bold">{performanceLevel}</span>
              <span className="text-xs text-muted-foreground mt-1">
                {score.current}/{score.total}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 ml-6 space-y-2">
          <MetricItem {...metrics.orderDelay} />
          <MetricItem {...metrics.cancelledOrder} />
          <MetricItem {...metrics.avgPrepTime} />
          <MetricItem {...metrics.rejectedOrder} />
          <MetricItem {...metrics.inaccurateOrder} />
        </div>
      </div>
    </div>
  );
};

export default PlatformMetricsCard;
