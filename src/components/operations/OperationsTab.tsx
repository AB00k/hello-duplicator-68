import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlatformMetricsCard from './PlatformMetricsCard';
import { 
  BarChart3, 
  Clock, 
  XCircle, 
  ClipboardList, 
  AlertCircle,
  DollarSign,
  Power
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MetricCard from '@/components/MetricCard';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      itemSwitchedOff: {
        label: 'Item Switched Off',
        value: '0%',
        trend: { value: '0.0%', direction: 'neutral' as const },
        icon: <Power className="w-3 h-3" />
      },
      rejectedOrder: {
        label: 'Rejected Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const },
        icon: <XCircle className="w-3 h-3" />
      },
      rejectedAmount: {
        label: 'Rejected Amount',
        value: 'AED 0',
        trend: { value: '0.0%', direction: 'neutral' as const },
        icon: <DollarSign className="w-3 h-3" />
      },
      platformCancelled: {
        label: 'Platform Cancelled',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const },
        icon: <AlertCircle className="w-3 h-3" />
      },
      cancelledAmount: {
        label: 'Cancelled Amount',
        value: 'AED 0',
        trend: { value: '0.0%', direction: 'neutral' as const },
        icon: <DollarSign className="w-3 h-3" />
      },
      acceptanceTime: {
        label: 'Acceptance Time',
        value: '1.2 mins',
        trend: { value: '-0.2%', direction: 'down' as const },
        icon: <Clock className="w-3 h-3" />
      },
      avgPrepTime: {
        label: 'Avg Prep Time',
        value: '10.5 mins',
        trend: { value: '-1.2%', direction: 'down' as const },
        icon: <Clock className="w-3 h-3" />
      },
      avgDeliveryTime: {
        label: 'Avg Delivery Time',
        value: '22.3 mins',
        trend: { value: '-0.8%', direction: 'down' as const },
        icon: <Clock className="w-3 h-3" />
      },
      orderDelay: {
        label: 'Order Delay',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' as const },
        icon: <Clock className="w-3 h-3" />
      }
    }
  },
  noon: {
    platform: 'Noon',
    logo: <NoonLogo />,
    score: { current: 15, total: 16 },
    metrics: {
      itemSwitchedOff: {
        label: 'Item Switched Off',
        value: '2%',
        trend: { value: '+0.5%', direction: 'up' as const },
        icon: <Power className="w-3 h-3" />
      },
      rejectedOrder: {
        label: 'Rejected Order',
        value: '0.90%',
        trend: { value: '-0.1%', direction: 'down' as const },
        icon: <XCircle className="w-3 h-3" />
      },
      rejectedAmount: {
        label: 'Rejected Amount',
        value: 'AED 240',
        trend: { value: '-0.3%', direction: 'down' as const },
        icon: <DollarSign className="w-3 h-3" />
      },
      platformCancelled: {
        label: 'Platform Cancelled',
        value: '0.20%',
        trend: { value: '+0.1%', direction: 'up' as const },
        icon: <AlertCircle className="w-3 h-3" />
      },
      cancelledAmount: {
        label: 'Cancelled Amount',
        value: 'AED 75',
        trend: { value: '+0.4%', direction: 'up' as const },
        icon: <DollarSign className="w-3 h-3" />
      },
      acceptanceTime: {
        label: 'Acceptance Time',
        value: '1.5 mins',
        trend: { value: '+0.1%', direction: 'up' as const },
        icon: <Clock className="w-3 h-3" />
      },
      avgPrepTime: {
        label: 'Avg Prep Time',
        value: '11.2 mins',
        trend: { value: '+0.4%', direction: 'up' as const },
        icon: <Clock className="w-3 h-3" />
      },
      avgDeliveryTime: {
        label: 'Avg Delivery Time',
        value: '21.8 mins',
        trend: { value: '-0.5%', direction: 'down' as const },
        icon: <Clock className="w-3 h-3" />
      },
      orderDelay: {
        label: 'Order Delay',
        value: '0.10%',
        trend: { value: '+0.1%', direction: 'up' as const },
        icon: <Clock className="w-3 h-3" />
      }
    }
  },
  careem: {
    platform: 'Careem',
    logo: <CareemLogo />,
    score: { current: 14, total: 16 },
    metrics: {
      itemSwitchedOff: {
        label: 'Item Switched Off',
        value: '1%',
        trend: { value: '-0.2%', direction: 'down' as const },
        icon: <Power className="w-3 h-3" />
      },
      rejectedOrder: {
        label: 'Rejected Order',
        value: '0.50%',
        trend: { value: '+0.2%', direction: 'up' as const },
        icon: <XCircle className="w-3 h-3" />
      },
      rejectedAmount: {
        label: 'Rejected Amount',
        value: 'AED 145',
        trend: { value: '+0.5%', direction: 'up' as const },
        icon: <DollarSign className="w-3 h-3" />
      },
      platformCancelled: {
        label: 'Platform Cancelled',
        value: '2.00%',
        trend: { value: '+0.8%', direction: 'up' as const },
        icon: <AlertCircle className="w-3 h-3" />
      },
      cancelledAmount: {
        label: 'Cancelled Amount',
        value: 'AED 320',
        trend: { value: '+0.9%', direction: 'up' as const },
        icon: <DollarSign className="w-3 h-3" />
      },
      acceptanceTime: {
        label: 'Acceptance Time',
        value: '1.8 mins',
        trend: { value: '+0.3%', direction: 'up' as const },
        icon: <Clock className="w-3 h-3" />
      },
      avgPrepTime: {
        label: 'Avg Prep Time',
        value: '12.34 mins',
        trend: { value: '+2.64%', direction: 'up' as const },
        icon: <Clock className="w-3 h-3" />
      },
      avgDeliveryTime: {
        label: 'Avg Delivery Time',
        value: '25.6 mins',
        trend: { value: '+1.2%', direction: 'up' as const },
        icon: <Clock className="w-3 h-3" />
      },
      orderDelay: {
        label: 'Order Delay',
        value: '0.20%',
        trend: { value: '+0.1%', direction: 'up' as const },
        icon: <Clock className="w-3 h-3" />
      }
    }
  },
  deliveroo: {
    platform: 'Deliveroo',
    logo: <DeliverooLogo />,
    score: { current: 15, total: 16 },
    metrics: {
      itemSwitchedOff: {
        label: 'Item Switched Off',
        value: '0.5%',
        trend: { value: '-0.1%', direction: 'down' as const },
        icon: <Power className="w-3 h-3" />
      },
      rejectedOrder: {
        label: 'Rejected Order',
        value: '0.10%',
        trend: { value: '-0.4%', direction: 'down' as const },
        icon: <XCircle className="w-3 h-3" />
      },
      rejectedAmount: {
        label: 'Rejected Amount',
        value: 'AED 32',
        trend: { value: '-0.6%', direction: 'down' as const },
        icon: <DollarSign className="w-3 h-3" />
      },
      platformCancelled: {
        label: 'Platform Cancelled',
        value: '0.40%',
        trend: { value: '+0.2%', direction: 'up' as const },
        icon: <AlertCircle className="w-3 h-3" />
      },
      cancelledAmount: {
        label: 'Cancelled Amount',
        value: 'AED 85',
        trend: { value: '+0.3%', direction: 'up' as const },
        icon: <DollarSign className="w-3 h-3" />
      },
      acceptanceTime: {
        label: 'Acceptance Time',
        value: '1.6 mins',
        trend: { value: '+0.2%', direction: 'up' as const },
        icon: <Clock className="w-3 h-3" />
      },
      avgPrepTime: {
        label: 'Avg Prep Time',
        value: '10.9 mins',
        trend: { value: '-0.3%', direction: 'down' as const },
        icon: <Clock className="w-3 h-3" />
      },
      avgDeliveryTime: {
        label: 'Avg Delivery Time',
        value: '23.1 mins',
        trend: { value: '+0.4%', direction: 'up' as const },
        icon: <Clock className="w-3 h-3" />
      },
      orderDelay: {
        label: 'Order Delay',
        value: '0.05%',
        trend: { value: '-0.02%', direction: 'down' as const },
        icon: <Clock className="w-3 h-3" />
      }
    }
  }
};

// Recent alerts data - expanded with more items
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
  },
  { 
    id: 4, 
    platform: 'Deliveroo', 
    issue: 'Item Switched Off', 
    time: '6 hours ago', 
    location: 'Business Bay Branch',
    status: 'Active'
  },
  { 
    id: 5, 
    platform: 'Talabat', 
    issue: 'Cancelled Order', 
    time: '8 hours ago', 
    location: 'Dubai Marina Branch',
    status: 'Resolved'
  },
  { 
    id: 6, 
    platform: 'Careem', 
    issue: 'Delivery Delay', 
    time: '10 hours ago', 
    location: 'JBR Branch',
    status: 'Active'
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
            <ScrollArea className="h-[300px]">
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
            </ScrollArea>
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

