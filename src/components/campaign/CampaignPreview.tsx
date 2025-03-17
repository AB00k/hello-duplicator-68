
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface CampaignPreviewProps {
  selectedPlatforms: string[];
}

const CampaignPreview = ({ selectedPlatforms }: CampaignPreviewProps) => {
  // Mock data for the heatmap
  const generateMockHeatmapData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    const data = [];
    for (const day of days) {
      const dayData = { day };
      for (const hour of hours) {
        const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
        // Simulate peak hours (lunch and dinner time)
        let value;
        if (hour >= 11 && hour <= 14) {
          value = Math.floor(Math.random() * 50) + 50; // Lunch time: 50-100
        } else if (hour >= 18 && hour <= 21) {
          value = Math.floor(Math.random() * 80) + 70; // Dinner time: 70-150
        } else if (hour >= 7 && hour <= 9) {
          value = Math.floor(Math.random() * 30) + 20; // Breakfast: 20-50
        } else if (hour >= 1 && hour <= 5) {
          value = Math.floor(Math.random() * 10); // Late night: 0-10
        } else {
          value = Math.floor(Math.random() * 40) + 10; // Other times: 10-50
        }
        dayData[time] = value;
      }
      data.push(dayData);
    }
    return data;
  };

  // Mock data for area sales
  const generateAreaSalesData = () => {
    const areas = ['Dubai Marina', 'Downtown Dubai', 'JBR', 'Business Bay', 'Jumeirah', 'Palm Jumeirah'];
    return areas.map(area => ({
      name: area,
      sales: Math.floor(Math.random() * 5000) + 1000
    }));
  };

  const heatmapData = generateMockHeatmapData();
  const areaSalesData = generateAreaSalesData();

  // Colors for the heatmap based on value
  const getHeatmapColor = (value) => {
    if (value >= 100) return '#ef4444'; // High traffic (red)
    if (value >= 70) return '#f97316'; // Medium-high traffic (orange)
    if (value >= 40) return '#eab308'; // Medium traffic (yellow)
    if (value >= 20) return '#84cc16'; // Medium-low traffic (light green)
    return '#22c55e'; // Low traffic (green)
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Campaign Performance Preview</h3>
      <p className="text-sm text-muted-foreground">
        This is a simulation of how your campaign might perform based on historical data.
      </p>

      <div className="space-y-4">
        <h4 className="text-base font-medium">Sales By Hour & Day (Heat Map)</h4>
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[100px_repeat(24,minmax(40px,1fr))]">
              <div className="font-medium text-center">Day / Hour</div>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="text-xs text-center text-muted-foreground">
                  {i < 10 ? `0${i}:00` : `${i}:00`}
                </div>
              ))}
              
              {heatmapData.map((dayData) => (
                <React.Fragment key={dayData.day}>
                  <div className="font-medium text-center my-1">{dayData.day}</div>
                  {Array.from({ length: 24 }, (_, i) => {
                    const time = i < 10 ? `0${i}:00` : `${i}:00`;
                    const value = dayData[time];
                    return (
                      <div 
                        key={`${dayData.day}-${time}`}
                        className="mx-0.5 my-1 rounded-sm text-xs flex items-center justify-center text-white font-medium"
                        style={{ 
                          backgroundColor: getHeatmapColor(value),
                          height: '32px',
                          opacity: 0.1 + (value / 150) * 0.9 // Adjust opacity based on value
                        }}
                      >
                        {value}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedPlatforms.includes('Talabat') && (
        <div className="space-y-4 mt-8">
          <h4 className="text-base font-medium">Sales By Area</h4>
          <ChartContainer 
            config={{
              sales: {
                color: "#ef4444"
              }
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={areaSalesData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `AED ${value}`}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" name="Sales" fill="#ef4444" radius={[4, 4, 0, 0]}>
                  {areaSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#ef4444" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      )}
    </div>
  );
};

export default CampaignPreview;
