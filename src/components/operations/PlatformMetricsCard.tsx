
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold">{value}</span>
        <div className={`flex items-center text-xs px-2 py-0.5 rounded ${
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
  let ringColor = 'bg-green-600';
  
  if (scorePercentage < 70) {
    performanceLevel = 'Poor';
    ringColor = 'bg-red-500';
  } else if (scorePercentage < 90) {
    performanceLevel = 'Good';
    ringColor = 'bg-yellow-500';
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          {logo}
          <h3 className="text-lg font-semibold">Operations on {platform}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6 mt-4">
          <div className="relative h-36 w-36">
            {/* Outer ring */}
            <div className={`h-36 w-36 rounded-full ${ringColor} flex items-center justify-center`}>
              <div className="h-28 w-28 rounded-full bg-white flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{performanceLevel}</span>
                <span className="text-sm text-muted-foreground">Operation</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {score.current}/{score.total}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 ml-6 space-y-3">
            <MetricItem {...metrics.orderDelay} />
            <MetricItem {...metrics.cancelledOrder} />
            <MetricItem {...metrics.avgPrepTime} />
            <MetricItem {...metrics.rejectedOrder} />
            <MetricItem {...metrics.inaccurateOrder} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformMetricsCard;
