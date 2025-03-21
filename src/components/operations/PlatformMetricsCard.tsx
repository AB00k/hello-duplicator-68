
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, XCircle, DollarSign, AlertCircle, Power, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MetricItemProps {
  label: string;
  value: string;
  trend: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
}

const MetricItem: React.FC<MetricItemProps> = ({ label, value, trend, icon }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
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

interface MetricSectionProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  metrics: MetricItemProps[];
}

const MetricSection: React.FC<MetricSectionProps> = ({ title, icon, iconColor, metrics }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="space-y-1 border-b pb-2 last:border-b-0">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded transition-colors"
      >
        <h4 className="text-sm font-semibold text-muted-foreground flex items-center">
          <span className={iconColor}>{icon}</span>
          <span className="ml-1">{title}</span>
        </h4>
        {isExpanded ? 
          <ChevronUp className="w-4 h-4 text-muted-foreground" /> : 
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        }
      </button>
      
      {isExpanded && (
        <div className="space-y-1 pl-5">
          {metrics.map((metric, index) => (
            <MetricItem key={`metric-${index}`} {...metric} />
          ))}
        </div>
      )}
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
    itemSwitchedOff: MetricItemProps;
    rejectedOrder: MetricItemProps;
    rejectedAmount: MetricItemProps;
    platformCancelled: MetricItemProps;
    cancelledAmount: MetricItemProps;
    acceptanceTime: MetricItemProps;
    avgPrepTime: MetricItemProps;
    avgDeliveryTime: MetricItemProps;
    orderDelay: MetricItemProps;
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
  let performanceLevel = '';
  let ringColor = '';
  
  if (scorePercentage >= 95) {
    performanceLevel = 'Epic';
    ringColor = 'bg-marketing-green';
  } else if (scorePercentage >= 85) {
    performanceLevel = 'Good';
    ringColor = 'bg-marketing-orange';
  } else if (scorePercentage >= 70) {
    performanceLevel = 'Average';
    ringColor = 'bg-marketing-blue';
  } else {
    performanceLevel = 'Poor';
    ringColor = 'bg-marketing-red';
  }

  // Calculate dimensions for donut chart
  const size = 140; // Outer circle size
  const thickness = 16; // Donut thickness
  
  // Group metrics by category
  const rejectionMetrics = [
    metrics.itemSwitchedOff,
    metrics.rejectedOrder,
    metrics.rejectedAmount
  ];
  
  const cancellationMetrics = [
    metrics.platformCancelled,
    metrics.cancelledAmount
  ];
  
  const timeMetrics = [
    metrics.acceptanceTime,
    metrics.avgPrepTime,
    metrics.avgDeliveryTime,
    metrics.orderDelay
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-hover-lift h-full">
      <div className="flex items-center gap-2 mb-4">
        {logo}
        <h3 className="text-lg font-semibold">Operations on {platform}</h3>
      </div>
      
      <div className="flex items-start justify-between mb-6 mt-4">
        <div className="relative h-36 w-36 flex justify-center items-center">
          {/* SVG for complete donut chart */}
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle */}
            <circle 
              cx={size/2} 
              cy={size/2} 
              r={size/2 - thickness/2} 
              fill="none" 
              stroke="#e5e7eb" 
              strokeWidth={thickness} 
            />
            
            {/* Colored progress circle based on performance level */}
            <circle 
              cx={size/2} 
              cy={size/2} 
              r={size/2 - thickness/2} 
              fill="none" 
              stroke={ringColor.replace('bg-', 'var(--color-')} 
              className={ringColor.replace('bg-', 'stroke-')}
              strokeWidth={thickness} 
              strokeDasharray={`${2 * Math.PI * (size/2 - thickness/2) * scorePercentage / 100} ${2 * Math.PI * (size/2 - thickness/2)}`}
              strokeDashoffset="0"
              transform={`rotate(-90 ${size/2} ${size/2})`}
            />
            
            {/* Center text for score */}
            <text 
              x={size/2} 
              y={size/2 - 10} 
              textAnchor="middle" 
              className="text-xl font-bold fill-current"
            >
              {performanceLevel}
            </text>
            <text 
              x={size/2} 
              y={size/2 + 15} 
              textAnchor="middle" 
              className="text-sm fill-muted-foreground"
            >
              {score.current}/{score.total}
            </text>
          </svg>
        </div>
        
        <div className="flex-1 ml-4 max-h-[300px]">
          <ScrollArea className="h-[300px] pr-3">
            <div className="space-y-2">
              <MetricSection 
                title="Rejection Metrics" 
                icon={<XCircle className="w-4 h-4 mr-1" />} 
                iconColor="text-marketing-red"
                metrics={rejectionMetrics}
              />
              
              <MetricSection 
                title="Cancellation Metrics" 
                icon={<AlertCircle className="w-4 h-4 mr-1" />} 
                iconColor="text-marketing-orange"
                metrics={cancellationMetrics}
              />
              
              <MetricSection 
                title="Time Metrics" 
                icon={<Clock className="w-4 h-4 mr-1" />} 
                iconColor="text-marketing-blue"
                metrics={timeMetrics}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default PlatformMetricsCard;
