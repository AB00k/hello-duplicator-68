
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
        trend: { value: '0.0%', direction: 'neutral' }
      },
      cancelledOrder: {
        label: 'Cancelled Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' }
      },
      avgPrepTime: {
        label: 'Avg Prep Time',
        value: 'N/A',
        trend: { value: 'N/A', direction: 'neutral' }
      },
      rejectedOrder: {
        label: 'Rejected Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' }
      },
      inaccurateOrder: {
        label: 'Inaccurate Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' }
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
        trend: { value: '0.0%', direction: 'neutral' }
      },
      cancelledOrder: {
        label: 'Cancelled Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' }
      },
      avgPrepTime: {
        label: 'Avg Prep Time',
        value: 'N/A',
        trend: { value: '0.0%', direction: 'neutral' }
      },
      rejectedOrder: {
        label: 'Rejected Order',
        value: '0.00%',
        trend: { value: '-0.9%', direction: 'down' }
      },
      inaccurateOrder: {
        label: 'Inaccurate Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' }
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
        trend: { value: '0.0%', direction: 'neutral' }
      },
      cancelledOrder: {
        label: 'Cancelled Order',
        value: '2.00%',
        trend: { value: '2.0%', direction: 'up' }
      },
      avgPrepTime: {
        label: 'Avg Prep Time',
        value: '12.34 mins',
        trend: { value: '2.64%', direction: 'up' }
      },
      rejectedOrder: {
        label: 'Rejected Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' }
      },
      inaccurateOrder: {
        label: 'Inaccurate Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' }
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
        trend: { value: '0.0%', direction: 'neutral' }
      },
      cancelledOrder: {
        label: 'Cancelled Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' }
      },
      avgPrepTime: {
        label: 'Avg Prep Time',
        value: 'N/A',
        trend: { value: '0.0%', direction: 'neutral' }
      },
      rejectedOrder: {
        label: 'Rejected Order',
        value: '0.00%',
        trend: { value: '-0.9%', direction: 'down' }
      },
      inaccurateOrder: {
        label: 'Inaccurate Order',
        value: '0.00%',
        trend: { value: '0.0%', direction: 'neutral' }
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
  },
  { 
    id: 4, 
    platform: 'Deliveroo', 
    issue: 'Rejected Order', 
    time: '8 hours ago', 
    location: 'Business Bay Branch',
    status: 'Resolved'
  },
];

// Performance by location data
const locationPerformance = [
  { location: 'Dubai Marina', score: 95 },
  { location: 'Downtown Dubai', score: 92 },
  { location: 'JBR', score: 89 },
  { location: 'Business Bay', score: 87 },
  { location: 'Jumeirah', score: 84 },
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
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93.7%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +1.2%
              </span>{" "}
              vs. last period
            </p>
            <div className="mt-4">
              <Progress value={93.7} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.3%
              </span>{" "}
              vs. last period
            </p>
            <div className="mt-4">
              <Progress value={99.8} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancellation Rate</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.2%
              </span>{" "}
              vs. last period
            </p>
            <div className="mt-4">
              <Progress value={99.5} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Order Accuracy</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.1%
              </span>{" "}
              vs. last period
            </p>
            <div className="mt-4">
              <Progress value={99.9} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Platform Metrics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: '300ms' }}>
        <PlatformMetricsCard {...platformsData.talabat} />
        <PlatformMetricsCard {...platformsData.noon} />
        <PlatformMetricsCard {...platformsData.careem} />
        <PlatformMetricsCard {...platformsData.deliveroo} />
      </div>
      
      {/* Recent Alerts & Performance by Location */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationPerformance.map(location => (
                <div key={location.location} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{location.location}</span>
                    <span className="text-sm font-medium">{location.score}/100</span>
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
