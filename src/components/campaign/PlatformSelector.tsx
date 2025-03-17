
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onChange: (platforms: string[]) => void;
}

const PlatformSelector = ({ selectedPlatforms, onChange }: PlatformSelectorProps) => {
  const platforms = [
    {
      id: 'noon',
      name: 'Noon',
      description: 'Standard campaign with bid and budget settings',
      icon: '/noon-logo.svg'
    },
    {
      id: 'talabat',
      name: 'Talabat',
      description: 'Includes target audience and area selections',
      icon: '/talabat-logo.svg'
    },
    {
      id: 'deliveroo',
      name: 'Deliveroo',
      description: 'Includes customer segmentation options',
      icon: '/deliveroo-logo.svg'
    }
  ];

  const handleTogglePlatform = (platformName: string) => {
    if (selectedPlatforms.includes(platformName)) {
      onChange(selectedPlatforms.filter(p => p !== platformName));
    } else {
      onChange([...selectedPlatforms, platformName]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPlatforms.length === platforms.length) {
      onChange([]);
    } else {
      onChange(platforms.map(p => p.name));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Platform(s)</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Choose which food delivery platforms you want to run your campaign on. 
          Each platform has different options and target audiences.
        </p>
        
        <div className="flex items-center space-x-2 mb-6">
          <Checkbox 
            id="select-all" 
            checked={selectedPlatforms.length === platforms.length}
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
            Select All Platforms
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {platforms.map((platform) => (
          <div 
            key={platform.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedPlatforms.includes(platform.name) 
                ? 'border-marketing-red bg-red-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleTogglePlatform(platform.name)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Checkbox 
                  id={platform.id} 
                  checked={selectedPlatforms.includes(platform.name)}
                  className="mt-1"
                  onCheckedChange={() => {}}
                />
              </div>
              <div className="flex-grow">
                <Label htmlFor={platform.id} className="font-medium text-lg cursor-pointer">
                  {platform.name}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {platform.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector;
