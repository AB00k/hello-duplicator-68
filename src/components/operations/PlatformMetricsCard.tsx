
import React from 'react';
import { TrendingUp, TrendingDown, Clock, XCircle, DollarSign, AlertCircle } from 'lucide-react';

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
  let fillPercentage = 0;
  
  if (scorePercentage >= 95) {
    performanceLevel = 'Epic';
    ringColor = 'bg-marketing-green';
    fillPercentage = 100;
  } else if (scorePercentage >= 85) {
    performanceLevel = 'Good';
    ringColor = 'bg-marketing-blue';
    fillPercentage = 75;
  } else if (scorePercentage >= 70) {
    performanceLevel = 'Average';
    ringColor = 'bg-marketing-orange';
    fillPercentage = 50;
  } else {
    performanceLevel = 'Poor';
    ringColor = 'bg-marketing-red';
    fillPercentage = 25;
  }

  // Calculate dimensions for half-donut chart
  const size = 140; // Outer circle size
  const thickness = 16; // Donut thickness
  const innerSize = size - (thickness * 2); // Inner circle size
  
  // Calculate SVG parameters
  const radius = size / 2;
  const innerRadius = radius - thickness;
  const circumference = Math.PI * radius; // Semi-circle circumference

  // Calculate stroke dash based on fill percentage
  const strokeDash = (circumference * fillPercentage) / 100;

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
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-hover-lift">
      <div className="flex items-center gap-2 mb-4">
        {logo}
        <h3 className="text-lg font-semibold">Operations on {platform}</h3>
      </div>
      
      <div className="flex items-start justify-between mb-6 mt-4">
        <div className="relative h-36 w-36 flex justify-center">
          {/* SVG for half-donut chart */}
          <svg width={size} height={size/2 + 10} viewBox={`0 0 ${size} ${size/2 + 10}`} className="transform -rotate-90">
            {/* Background semi-circle */}
            <path 
              d={`M ${thickness/2},${size/2} a ${radius - thickness/2},${radius - thickness/2} 0 1,1 ${size - thickness},0`} 
              fill="none" 
              stroke="#e5e7eb" 
              strokeWidth={thickness} 
              strokeLinecap="round"
            />
            
            {/* Colored progress arc */}
            <path 
              d={`M ${thickness/2},${size/2} a ${radius - thickness/2},${radius - thickness/2} 0 1,1 ${size - thickness},0`} 
              fill="none" 
              stroke={ringColor.replace('bg-', 'var(--color-')} 
              className={ringColor.replace('bg-', 'stroke-')}
              strokeWidth={thickness} 
              strokeDasharray={`${strokeDash} ${circumference}`}
              strokeLinecap="round"
            />
            
            {/* Add text in the center */}
            <text 
              x={size/2} 
              y={size/2 + 35} 
              textAnchor="middle" 
              className="text-xl font-bold fill-current"
              style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
            >
              {performanceLevel}
            </text>
            <text 
              x={size/2} 
              y={size/2 + 55} 
              textAnchor="middle" 
              className="text-xs fill-muted-foreground"
              style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
            >
              {score.current}/{score.total}
            </text>
          </svg>
        </div>
        
        <div className="flex-1 ml-4 space-y-6">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-muted-foreground flex items-center">
              <XCircle className="w-4 h-4 mr-1 text-marketing-red" />
              Rejection Metrics
            </h4>
            <div className="space-y-1">
              {rejectionMetrics.map((metric, index) => (
                <MetricItem key={`rejection-${index}`} {...metric} />
              ))}
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-muted-foreground flex items-center">
              <AlertCircle className="w-4 h-4 mr-1 text-marketing-orange" />
              Cancellation Metrics
            </h4>
            <div className="space-y-1">
              {cancellationMetrics.map((metric, index) => (
                <MetricItem key={`cancellation-${index}`} {...metric} />
              ))}
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-muted-foreground flex items-center">
              <Clock className="w-4 h-4 mr-1 text-marketing-blue" />
              Time Metrics
            </h4>
            <div className="space-y-1">
              {timeMetrics.map((metric, index) => (
                <MetricItem key={`time-${index}`} {...metric} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformMetricsCard;
