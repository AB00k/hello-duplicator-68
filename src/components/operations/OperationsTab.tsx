
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PlatformMetricsCard from './PlatformMetricsCard';
import { 
  BarChart3, 
  ArrowUpRight, 
  ClipboardList, 
  Clock, 
  XCircle, 
  AlertCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

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
      <div className="flex justify-between items-center animate-fade-up" style={{ animationDelay: '100ms' }}>
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
      
      {/* Key Performance Indicators - Simplified */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">93.7%</h3>
              <p className="text-sm text-muted-foreground">Overall Score</p>
              <div className="w-full mt-3">
                <Progress value={93.7} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">99.8%</h3>
              <p className="text-sm text-muted-foreground">On-Time Delivery</p>
              <div className="w-full mt-3">
                <Progress value={99.8} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-3">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold">0.5%</h3>
              <p className="text-sm text-muted-foreground">Cancellation Rate</p>
              <div className="w-full mt-3">
                <Progress value={99.5} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-all">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <ClipboardList className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold">99.9%</h3>
              <p className="text-sm text-muted-foreground">Order Accuracy</p>
              <div className="w-full mt-3">
                <Progress value={99.9} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Platform Performance Overview */}
      <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
        <h2 className="text-xl font-semibold mb-4">Platform Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlatformMetricsCard {...platformsData.talabat} />
          <PlatformMetricsCard {...platformsData.noon} />
          <PlatformMetricsCard {...platformsData.careem} />
          <PlatformMetricsCard {...platformsData.deliveroo} />
        </div>
      </div>
      
      {/* Recent Alerts - Simplified */}
      <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
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
      
      {/* Performance by Location - Simplified */}
      <div className="animate-fade-up" style={{ animationDelay: '500ms' }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locationPerformance.map(location => (
                <div key={location.location} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{location.location}</span>
                    <span className="font-bold">{location.score}/100</span>
                  </div>
                  <Progress 
                    value={location.score} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OperationsTab;
