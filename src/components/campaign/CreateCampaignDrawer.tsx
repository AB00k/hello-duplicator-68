
import React, { useState } from 'react';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle 
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import PlatformSelector from './PlatformSelector';
import CampaignForm from './CampaignForm';
import CampaignPreview from './CampaignPreview';

interface CreateCampaignDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCampaignDrawer = ({ isOpen, onClose }: CreateCampaignDrawerProps) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    account: '',
    brand: '',
    outlet: '',
    bidPerClick: 3,
    budget: 1000,
    duration: 7,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    targetAudience: {
      allCustomers: false,
      newCustomers: false,
      lapsedCustomers: false,
      deliverooPlus: false
    },
    targetAreas: []
  });

  const handlePlatformSelection = (platforms: string[]) => {
    setSelectedPlatforms(platforms);
  };

  const handleCampaignDataChange = (data: any) => {
    setCampaignData({ ...campaignData, ...data });
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit campaign
      console.log('Campaign data', { platforms: selectedPlatforms, ...campaignData });
      onClose();
    }
  };

  // Reset state when drawer closes
  const handleCloseComplete = () => {
    setSelectedPlatforms([]);
    setCurrentStep(1);
    setCampaignData({
      account: '',
      brand: '',
      outlet: '',
      bidPerClick: 3,
      budget: 1000,
      duration: 7,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      targetAudience: {
        allCustomers: false,
        newCustomers: false,
        lapsedCustomers: false,
        deliverooPlus: false
      },
      targetAreas: []
    });
  };

  const steps = [
    'Select Platform',
    'Campaign Details',
    'Review & Confirm'
  ];

  return (
    <Drawer 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          handleCloseComplete();
        }
      }}
    >
      <DrawerContent className="h-[85vh] overflow-y-auto">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold">Create Campaign ({currentStep}/{steps.length})</DrawerTitle>
            <DrawerClose>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
          <div className="flex justify-between mt-4 mb-2">
            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                    ${index + 1 === currentStep 
                      ? 'bg-marketing-red text-white' 
                      : index + 1 < currentStep 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-600'}`}
                >
                  {index + 1}
                </div>
                <span className="text-sm font-medium text-gray-600">{step}</span>
              </div>
            ))}
          </div>
        </DrawerHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div className="space-y-6 md:border-r pr-4">
            {currentStep === 1 && (
              <PlatformSelector 
                selectedPlatforms={selectedPlatforms} 
                onChange={handlePlatformSelection}
                onNext={handleNext} // Pass the handleNext function to PlatformSelector
              />
            )}

            {currentStep === 2 && (
              <CampaignForm
                selectedPlatforms={selectedPlatforms}
                campaignData={campaignData}
                onChange={handleCampaignDataChange}
                onNext={handleNext} // Pass the handleNext function to CampaignForm
              />
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Campaign Summary</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Platforms:</span> {selectedPlatforms.join(', ')}</p>
                  <p><span className="font-medium">Account:</span> {campaignData.account}</p>
                  <p><span className="font-medium">Brand:</span> {campaignData.brand}</p>
                  <p><span className="font-medium">Outlet:</span> {campaignData.outlet}</p>
                  <p><span className="font-medium">Bid per Click:</span> AED {campaignData.bidPerClick.toFixed(2)}</p>
                  <p><span className="font-medium">Budget:</span> AED {campaignData.budget}</p>
                  
                  {campaignData.duration === 'custom' ? (
                    <div>
                      <p><span className="font-medium">Duration:</span> Custom</p>
                      <p><span className="font-medium">Start Date:</span> {campaignData.startDate.toLocaleDateString()}</p>
                      <p><span className="font-medium">End Date:</span> {campaignData.endDate.toLocaleDateString()}</p>
                      <p><span className="font-medium">Total Days:</span> {
                        Math.ceil((campaignData.endDate.getTime() - campaignData.startDate.getTime()) / (1000 * 60 * 60 * 24))
                      }</p>
                    </div>
                  ) : (
                    <div>
                      <p><span className="font-medium">Duration:</span> {campaignData.duration} days</p>
                      <p><span className="font-medium">Start Date:</span> {campaignData.startDate.toLocaleDateString()}</p>
                      <p><span className="font-medium">End Date:</span> {
                        new Date(new Date(campaignData.startDate).setDate(
                          campaignData.startDate.getDate() + Number(campaignData.duration)
                        )).toLocaleDateString()
                      }</p>
                    </div>
                  )}
                  
                  {(selectedPlatforms.includes('Talabat') || selectedPlatforms.includes('Deliveroo')) && (
                    <div>
                      <p className="font-medium">Target Audience:</p>
                      <ul className="list-disc list-inside ml-2">
                        {campaignData.targetAudience.allCustomers && <li>All Customers</li>}
                        {campaignData.targetAudience.newCustomers && <li>New Customers</li>}
                        {campaignData.targetAudience.lapsedCustomers && <li>Lapsed Customers</li>}
                        {campaignData.targetAudience.deliverooPlus && <li>Deliveroo Plus</li>}
                      </ul>
                    </div>
                  )}
                  
                  {selectedPlatforms.includes('Talabat') && campaignData.targetAreas.length > 0 && (
                    <div>
                      <p className="font-medium">Target Areas:</p>
                      <ul className="list-disc list-inside ml-2">
                        {campaignData.targetAreas.map((area: string) => (
                          <li key={area}>{area}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="mt-8">
                  <h4 className="text-base font-semibold mb-4">Activate Your Campaign</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your campaign is ready to be activated. Click the button below to start it immediately, or schedule it for later.
                  </p>
                  <div className="flex gap-3">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Activate Now
                    </Button>
                    <Button variant="outline">
                      Schedule For Later
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="px-4">
            <CampaignPreview selectedPlatforms={selectedPlatforms} />
          </div>
        </div>

        <DrawerFooter className="border-t">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={(currentStep === 1 && selectedPlatforms.length === 0) || 
                       (currentStep === 2 && (!campaignData.account || !campaignData.brand || !campaignData.outlet))}
              className="bg-marketing-red hover:bg-marketing-red/90"
            >
              {currentStep < 3 ? 'Next' : 'Create Campaign'}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCampaignDrawer;
