
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CampaignFormProps {
  selectedPlatforms: string[];
  campaignData: any;
  onChange: (data: any) => void;
  onNext?: () => void;
}

const accountOptions = ['Account 1', 'Account 2', 'Account 3'];
const brandOptions = ['Brand 1', 'Brand 2', 'Brand 3'];
const outletOptions = ['Outlet 1', 'Outlet 2', 'Outlet 3'];
const areaOptions = ['Dubai Marina', 'Downtown Dubai', 'JBR', 'Business Bay', 'Jumeirah', 'Palm Jumeirah', 'JLT', 'DIFC'];

const CampaignForm = ({ selectedPlatforms, campaignData, onChange, onNext }: CampaignFormProps) => {
  const hasTalabat = selectedPlatforms.includes('Talabat');
  const hasDeliveroo = selectedPlatforms.includes('Deliveroo');
  const hasNoon = selectedPlatforms.includes('Noon');

  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };

  const handleTargetAudienceChange = (key: string, value: boolean) => {
    onChange({
      targetAudience: {
        ...campaignData.targetAudience,
        [key]: value
      }
    });
  };

  const handleAreaToggle = (area: string) => {
    let newAreas;
    if (campaignData.targetAreas.includes(area)) {
      newAreas = campaignData.targetAreas.filter((a: string) => a !== area);
    } else {
      newAreas = [...campaignData.targetAreas, area];
    }
    onChange({ targetAreas: newAreas });
  };

  const isFormValid = () => {
    return campaignData.account && campaignData.brand && campaignData.outlet;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Campaign Details</h3>
      
      {/* Common Fields */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="account">Select Account</Label>
          <Select
            value={campaignData.account}
            onValueChange={(value) => handleChange('account', value)}
          >
            <SelectTrigger id="account">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white">
              {accountOptions.map(account => (
                <SelectItem key={account} value={account}>{account}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="brand">Select Brand</Label>
          <Select
            value={campaignData.brand}
            onValueChange={(value) => handleChange('brand', value)}
          >
            <SelectTrigger id="brand">
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white">
              {brandOptions.map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="outlet">Select Outlet</Label>
          <Select
            value={campaignData.outlet}
            onValueChange={(value) => handleChange('outlet', value)}
          >
            <SelectTrigger id="outlet">
              <SelectValue placeholder="Select Outlet" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white">
              {outletOptions.map(outlet => (
                <SelectItem key={outlet} value={outlet}>{outlet}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Bid per Click (AED): {campaignData.bidPerClick.toFixed(2)}</Label>
          <div className="px-1 relative">
            <Slider
              value={[campaignData.bidPerClick]}
              min={0}
              max={7}
              step={0.1}
              onValueChange={([value]) => handleChange('bidPerClick', value)}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <div>
                <div className="flex space-x-1 items-center justify-center mb-1">
                  <div className="w-1 h-3 bg-marketing-green"></div>
                  <div className="w-1 h-4 bg-marketing-green"></div>
                  <div className="w-1 h-5 bg-marketing-green"></div>
                  <div className="w-1 h-4 bg-marketing-green"></div>
                  <div className="w-1 h-3 bg-marketing-green"></div>
                </div>
                <span>Commonly Used (2-4 AED)</span>
              </div>
              <span>7</span>
            </div>
            {/* Highlight the commonly used area */}
            <div className="absolute h-4 bg-green-100/50 rounded-md" 
              style={{ 
                left: `${(2/7)*100}%`, 
                right: `${(1-(4/7))*100}%`, 
                top: "2px",
                zIndex: -1
              }}>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="budget">Budget (AED)</Label>
          <Input
            id="budget"
            type="number"
            value={campaignData.budget}
            onChange={(e) => handleChange('budget', Number(e.target.value))}
            min={100}
            step={100}
          />
        </div>

        <div>
          <Label htmlFor="duration">Duration</Label>
          <Select
            value={campaignData.duration === 'custom' ? 'custom' : campaignData.duration.toString()}
            onValueChange={(value) => {
              if (value === 'custom') {
                handleChange('duration', 'custom');
                // Set default end date to 30 days from start date if custom is selected
                const endDate = new Date(campaignData.startDate);
                endDate.setDate(endDate.getDate() + 30);
                handleChange('endDate', endDate);
              } else {
                handleChange('duration', Number(value));
              }
            }}
          >
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white">
              {[1, 3, 7, 14, 30].map(day => (
                <SelectItem key={day} value={day.toString()}>{day} day{day > 1 ? 's' : ''}</SelectItem>
              ))}
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="startDate"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !campaignData.startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {campaignData.startDate ? format(campaignData.startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50 bg-white" align="start">
              <Calendar
                mode="single"
                selected={campaignData.startDate}
                onSelect={(date) => {
                  const newDate = date || new Date();
                  handleChange('startDate', newDate);
                  
                  // If custom duration, update end date to maintain the same duration
                  if (campaignData.duration === 'custom' && campaignData.endDate) {
                    const currentDuration = Math.floor((campaignData.endDate - campaignData.startDate) / (1000 * 60 * 60 * 24));
                    const newEndDate = new Date(newDate);
                    newEndDate.setDate(newEndDate.getDate() + currentDuration);
                    handleChange('endDate', newEndDate);
                  }
                }}
                initialFocus
                disabled={(date) => date < new Date()}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {campaignData.duration === 'custom' && (
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="endDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !campaignData.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {campaignData.endDate ? format(campaignData.endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={campaignData.endDate}
                  onSelect={(date) => handleChange('endDate', date || new Date())}
                  initialFocus
                  disabled={(date) => date <= new Date(campaignData.startDate)}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Talabat-specific */}
      {hasTalabat && (
        <div className="space-y-4 pt-4 border-t">
          <h4 className="text-base font-semibold">Talabat Options</h4>
          
          <div className="space-y-2">
            <Label>Target Audience</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="talabat-all-customers" 
                  checked={campaignData.targetAudience.allCustomers}
                  onCheckedChange={(checked) => 
                    handleTargetAudienceChange('allCustomers', checked === true)
                  }
                />
                <Label htmlFor="talabat-all-customers" className="cursor-pointer">All Customers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="talabat-new-customers" 
                  checked={campaignData.targetAudience.newCustomers}
                  onCheckedChange={(checked) => 
                    handleTargetAudienceChange('newCustomers', checked === true)
                  }
                />
                <Label htmlFor="talabat-new-customers" className="cursor-pointer">New Customers</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Target Areas</Label>
            <div className="grid grid-cols-2 gap-2">
              {areaOptions.map(area => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`area-${area}`} 
                    checked={campaignData.targetAreas.includes(area)}
                    onCheckedChange={() => handleAreaToggle(area)}
                  />
                  <Label htmlFor={`area-${area}`} className="cursor-pointer text-sm">{area}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Deliveroo-specific */}
      {hasDeliveroo && (
        <div className="space-y-4 pt-4 border-t">
          <h4 className="text-base font-semibold">Deliveroo Options</h4>
          
          <div className="space-y-2">
            <Label>Target Audience</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="deliveroo-new-customers" 
                  checked={campaignData.targetAudience.newCustomers}
                  onCheckedChange={(checked) => 
                    handleTargetAudienceChange('newCustomers', checked === true)
                  }
                />
                <Label htmlFor="deliveroo-new-customers" className="cursor-pointer">New Customers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="deliveroo-lapsed-customers" 
                  checked={campaignData.targetAudience.lapsedCustomers}
                  onCheckedChange={(checked) => 
                    handleTargetAudienceChange('lapsedCustomers', checked === true)
                  }
                />
                <Label htmlFor="deliveroo-lapsed-customers" className="cursor-pointer">Lapsed Customers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="deliveroo-plus" 
                  checked={campaignData.targetAudience.deliverooPlus}
                  onCheckedChange={(checked) => 
                    handleTargetAudienceChange('deliverooPlus', checked === true)
                  }
                />
                <Label htmlFor="deliveroo-plus" className="cursor-pointer">Deliveroo Plus Customers</Label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Noon-specific */}
      {hasNoon && (
        <div className="space-y-4 pt-4 border-t">
          <h4 className="text-base font-semibold">Noon Options</h4>
          
          <div className="space-y-2">
            <Label>Target Audience</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="noon-all-customers" 
                  checked={campaignData.targetAudience.allCustomers}
                  onCheckedChange={(checked) => 
                    handleTargetAudienceChange('allCustomers', checked === true)
                  }
                />
                <Label htmlFor="noon-all-customers" className="cursor-pointer">All Customers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="noon-prime-customers" 
                  checked={campaignData.targetAudience.noonPrime}
                  onCheckedChange={(checked) => 
                    handleTargetAudienceChange('noonPrime', checked === true)
                  }
                />
                <Label htmlFor="noon-prime-customers" className="cursor-pointer">Noon Prime Customers</Label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next button */}
      <div className="flex justify-end mt-6">
        <Button 
          onClick={onNext}
          disabled={!isFormValid()}
          className="bg-marketing-red hover:bg-marketing-red/90"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CampaignForm;
