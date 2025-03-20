import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlatformMetricsCard from './PlatformMetricsCard';
import { 
  BarChart3, 
  Clock, 
  XCircle, 
  ClipboardList, 
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MetricCard from '@/components/MetricCard';

// Platform Logos
const TalabatLogo = () => (
  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">T</div>
);

const NoonLogo = () => (
  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black">N</div>
);

const CareemLogo = () => (
  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">C</div>
);

const DeliverooLogo = () => (
  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">D</div>
);

// Platform metrics data
const platformsData = {
  talabat: {
    platform: 'Talabat',
    logo: <TalabatLogo />,
    score: { current: 16, total: 16 },
    metrics: {
      orderDelay: {
        label: 'Order Delay',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      },
      cancelledOrder: {
        label: 'Cancelled Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      },
      avgPrepTime: {
        label: 'Avg Prep Time',
        value: 'N/A',
        trend: { value: 'N/A', direction: 'neutral' as const }
      },
      rejectedOrder: {
        label: 'Rejected Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      },
      inaccurateOrder: {
        label: 'Inaccurate Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      }
    }
  },
  noon: {
    platform: 'Noon',
    logo: <NoonLogo />,
    score: { current: 16, total: 16 },
    metrics: {
      orderDelay: {
        label: 'Order Delay',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      },
      cancelledOrder: {
        label: 'Cancelled Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      },
      avgPrepTime: {
        label: 'Avg Prep Time',
        value: 'N/A',
        trend: { value: '0.0%', direction: 'neutral' as const }
      },
      rejectedOrder: {
        label: 'Rejected Order',
        value: '0.00%',
        trend: { value: '-0.9%', direction: 'down' as const }
      },
      inaccurateOrder: {
        label: 'Inaccurate Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      }
    }
  },
  careem: {
    platform: 'Careem',
    logo: <CareemLogo />,
    score: { current: 15, total: 16 },
    metrics: {
      orderDelay: {
        label: 'Order Delay',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      },
      cancelledOrder: {
        label: 'Cancelled Order',
        value: '2.00%',
        trend: { value: '2.0%', direction: 'up' as const }
      },
      avgPrepTime: {
        label: 'Avg Prep Time',
        value: '12.34 mins',
        trend: { value: '2.64%', direction: 'up' as const }
      },
      rejectedOrder: {
        label: 'Rejected Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      },
      inaccurateOrder: {
        label: 'Inaccurate Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      }
    }
  },
  deliveroo: {
    platform: 'Deliveroo',
    logo: <DeliverooLogo />,
    score: { current: 16, total: 16 },
    metrics: {
      orderDelay: {
        label: 'Order Delay',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      },
      cancelledOrder: {
        label: 'Cancelled Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      },
      avgPrepTime: {
        label: 'Avg Prep Time',
        value: 'N/A',
        trend: { value: '0.0%', direction: 'neutral' as const }
      },
      rejectedOrder: {
        label: 'Rejected Order',
        value: '0.00%',
        trend: { value: '-0.9%', direction: 'down' as const }
      },
      inaccurateOrder: {
        label: 'Inaccurate Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const }
      }
    }
  }
};

// Recent alerts data
const recentAlerts = [
  { 
    id: 1, 
    platform: 'Careem', 
    issue: 'Cancelled Order', 
    time: '1 hour ago', 
    location: 'Dubai Marina Branch',
    status: 'Active'
  },
  { 
    id: 2, 
    platform: 'Noon', 
    issue: 'Rejected Order', 
    time: '3 hours ago', 
    location: 'Downtown Dubai Branch',
    status: 'Resolved'
  },
  { 
    id: 3, 
    platform: 'Talabat', 
    issue: 'Order Delay', 
    time: '5 hours ago', 
    location: 'JBR Branch',
    status: 'Resolved'
  }
];

// Performance by location data
const locationPerformance = [
  { location: 'Dubai Marina', score: 95 },
  { location: 'Downtown Dubai', score: 92 },
  { location: 'JBR', score: 89 },
  { location: 'Business Bay', score: 87 },
];

const OperationsTab = () => {
  const [timeframe, setTimeframe] = useState('today');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Operations Header */}
      <div className="flex justify-between items-center mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <h1 className="text-3xl font-bold text-marketing-red">Operations Performance</h1>
        
        <Tabs defaultValue="today" className="w-[400px]" onValueChange={setTimeframe} value={timeframe}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="quarter">This Quarter</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Performance Overview - Using same MetricCard component as Marketing tab */}
      <div className="mb-12 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-2xl font-semibold mb-6">Performance Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            icon={<BarChart3 className="w-5 h-5" />}
            iconBgColor="bg-marketing-teal"
            label="Overall Score"
            value="93.7%"
            trend={{ value: "+2.1%", direction: "up" }}
          />
          
          <MetricCard 
            icon={<Clock className="w-5 h-5" />}
            iconBgColor="bg-marketing-blue"
            label="On-Time Delivery"
            value="99.8%"
            trend={{ value: "+0.3%", direction: "up" }}
          />
          
          <MetricCard 
            icon={<XCircle className="w-5 h-5" />}
            iconBgColor="bg-marketing-red"
            label="Cancellation Rate"
            value="0.5%"
            trend={{ value: "-0.2%", direction: "down" }}
          />
          
          <MetricCard 
            icon={<ClipboardList className="w-5 h-5" />}
            iconBgColor="bg-marketing-purple"
            label="Order Accuracy"
            value="99.9%"
            trend={{ value: "+0.1%", direction: "up" }}
          />
        </div>
      </div>
      
      {/* Platform Performance Overview */}
      <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
        <h2 className="text-2xl font-semibold mb-6">Platform Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlatformMetricsCard {...platformsData.talabat} />
          <PlatformMetricsCard {...platformsData.noon} />
          <PlatformMetricsCard {...platformsData.careem} />
          <PlatformMetricsCard {...platformsData.deliveroo} />
        </div>
      </div>
      
      {/* Recent Alerts */}
      <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
        <h2 className="text-2xl font-semibold mb-6">Recent Alerts</h2>
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAlerts.map(alert => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.platform}</TableCell>
                      <TableCell>{alert.issue}</TableCell>
                      <TableCell>{alert.location}</TableCell>
                      <TableCell className="text-muted-foreground">{alert.time}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          alert.status === 'Active' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {alert.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance by Location */}
      <div className="animate-fade-up" style={{ animationDelay: '500ms' }}>
        <h2 className="text-2xl font-semibold mb-6">Performance by Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locationPerformance.map(location => (
            <MetricCard
              key={location.location}
              icon={<BarChart3 className="w-5 h-5" />}
              iconBgColor={`bg-marketing-${location.score >= 90 ? 'green' : location.score >= 85 ? 'blue' : 'orange'}`}
              label={location.location}
              value={`${location.score}/100`}
              trend={{ 
                value: location.score >= 90 ? "Excellent" : location.score >= 85 ? "Good" : "Average", 
                direction: location.score >= 85 ? "up" : "down" 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OperationsTab;
