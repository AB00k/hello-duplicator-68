
import React, { useState } from 'react';
import { PlusCircle, Tag, DollarSign, ShoppingCart, Percent, Users, BarChart } from 'lucide-react';
import TabNavigation from '@/components/TabNavigation';
import MetricCard from '@/components/MetricCard';
import { Button } from '@/components/ui/button';
import CreateCampaignDrawer from '@/components/campaign/CreateCampaignDrawer';
import OperationsTab from '@/components/operations/OperationsTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  
  const tabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'marketing', label: 'Marketing Ads' },
    { id: 'operations', label: 'Operations' },
    { id: 'delivery', label: 'Delivery Discounts' },
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Dashboard Header with Tabs */}
        <div className="flex justify-between items-center mb-12 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <TabNavigation 
            tabs={tabs} 
            activeTab={activeTab} 
            onChange={setActiveTab} 
          />
          
          <Button 
            className="bg-marketing-red hover:bg-marketing-red/90 flex items-center gap-2 rounded-full text-white shadow-lg hover:shadow-xl transition-all"
            onClick={() => setIsCreateCampaignOpen(true)}
          >
            <PlusCircle className="w-5 h-5" />
            Create a new campaign
          </Button>
        </div>
        
        {/* Content based on active tab */}
        {activeTab === 'operations' ? (
          <OperationsTab />
        ) : (
          <>
            {/* Performance Header */}
            <div className="flex justify-between items-center mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <h1 className="text-3xl font-bold text-marketing-red">Ads Performance</h1>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 rounded-full border-2 shadow-sm hover:shadow-md transition-all"
                >
                  <BarChart className="w-4 h-4" />
                  View All Running Campaigns
                </Button>
              </div>
            </div>
            
            {/* Performance Overview */}
            <div className="mb-12 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <h2 className="text-2xl font-semibold mb-6">Performance Overview</h2>
              
              {/* Top Row of Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <MetricCard 
                  icon={<Tag className="w-5 h-5" />}
                  iconBgColor="bg-marketing-blue"
                  label="Currently Live Ads"
                  value="12"
                  trend={{ value: "+3", direction: "up" }}
                />
                <MetricCard 
                  icon={<DollarSign className="w-5 h-5" />}
                  iconBgColor="bg-marketing-orange"
                  label="Ads Spend"
                  value="AED 54250"
                  trend={{ value: "+12%", direction: "up" }}
                />
                <MetricCard 
                  icon={<DollarSign className="w-5 h-5" />}
                  iconBgColor="bg-marketing-green"
                  label="Marketing Revenue"
                  value="AED 233750"
                  trend={{ value: "+18%", direction: "up" }}
                />
                <MetricCard 
                  icon={<ShoppingCart className="w-5 h-5" />}
                  iconBgColor="bg-marketing-purple"
                  label="Marketing Orders"
                  value="892"
                  trend={{ value: "+24", direction: "up" }}
                />
              </div>
              
              {/* Bottom Row of Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up" style={{ animationDelay: '400ms' }}>
                <MetricCard 
                  icon={<BarChart className="w-5 h-5" />}
                  iconBgColor="bg-marketing-teal"
                  label="ROAS"
                  value="4.3x"
                  trend={{ value: "+0.5", direction: "up" }}
                />
                <MetricCard 
                  icon={<Percent className="w-5 h-5" />}
                  iconBgColor="bg-marketing-red"
                  label="Conversion Rate"
                  value="2.7%"
                  trend={{ value: "-0.3%", direction: "down" }}
                />
                <MetricCard 
                  icon={<Users className="w-5 h-5" />}
                  iconBgColor="bg-gray-500"
                  label="New Customers"
                  value="304"
                  trend={{ value: "+15%", direction: "up" }}
                />
                <MetricCard 
                  icon={<DollarSign className="w-5 h-5" />}
                  iconBgColor="bg-marketing-orange"
                  label="Avg CAC"
                  value="AED 178.45"
                  trend={{ value: "-8%", direction: "down" }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Campaign Creation Drawer */}
      <CreateCampaignDrawer 
        isOpen={isCreateCampaignOpen} 
        onClose={() => setIsCreateCampaignOpen(false)} 
      />
    </div>
  );
};

export default Index;
