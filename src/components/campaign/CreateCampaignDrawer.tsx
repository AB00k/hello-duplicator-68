
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import PlatformSelector from './PlatformSelector';
import CampaignForm from './CampaignForm';
import { Button } from '@/components/ui/button';
import CampaignPreview from './CampaignPreview';
import TemplateSelector, { Template } from './TemplateSelector';

interface CreateCampaignDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = {
  id: number;
  title: string;
  description: string;
};

type StepStatus = 'completed' | 'current' | 'upcoming';

const CreateCampaignDrawer: React.FC<CreateCampaignDrawerProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    startDate: null,
    endDate: null,
    budget: '',
    objective: '',
    targetAudience: '',
    description: '',
  });
  
  const steps: Step[] = [
    {
      id: 1,
      title: 'Select Platforms',
      description: 'Choose the platforms for your campaign'
    },
    {
      id: 2,
      title: 'Choose Template',
      description: 'Select a template or start from scratch'
    },
    {
      id: 3,
      title: 'Campaign Details',
      description: 'Define your campaign strategy'
    },
    {
      id: 4,
      title: 'Preview',
      description: 'Review your campaign before launch'
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      // If selecting a template and not custom, pre-fill the form data
      if (currentStep === 2 && selectedTemplate && selectedTemplate !== 'custom') {
        // This would be replaced with actual template data in a real application
        const templatePresets = {
          'new-menu': {
            name: 'New Menu Launch',
            budget: '5000',
            objective: 'Increase orders of new menu items',
            targetAudience: 'Existing customers',
            description: 'Campaign to highlight our delicious new menu items and drive repeat orders.',
          },
          'promo-deal': {
            name: 'Special Promotion',
            budget: '3000',
            objective: 'Drive sales through limited-time offers',
            targetAudience: 'Price-sensitive customers',
            description: 'Limited-time promotion with special discounts to increase order volume.',
          }
        };
        
        if (selectedTemplate in templatePresets) {
          setFormData({
            ...formData,
            // @ts-ignore
            ...templatePresets[selectedTemplate]
          });
        }
      }
      
      // Skip campaign details step if using a template (not custom)
      if (currentStep === 2 && selectedTemplate && selectedTemplate !== 'custom') {
        setCurrentStep(currentStep + 2); // Skip to preview
      } else {
        setCurrentStep(currentStep + 1); // Normal progression
      }
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      // If coming back from preview to campaign details, but we used a template and skipped details
      if (currentStep === 4 && selectedTemplate && selectedTemplate !== 'custom') {
        setCurrentStep(2); // Go back to template selection
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };
  
  const handlePlatformChange = (platforms: string[]) => {
    setSelectedPlatforms(platforms);
  };
  
  const handleTemplateChange = (templateId: string | null) => {
    setSelectedTemplate(templateId);
  };
  
  const handleFormChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleCampaignFormChange = (updatedData: any) => {
    if (updatedData && typeof updatedData === 'object') {
      setFormData({
        ...formData,
        ...updatedData
      });
    }
  };

  const getStepStatus = (stepId: number): StepStatus => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };
  
  const isNextDisabled = () => {
    if (currentStep === 1 && selectedPlatforms.length === 0) {
      return true;
    }
    
    if (currentStep === 2 && !selectedTemplate) {
      return true;
    }
    
    if (currentStep === 3) {
      const budgetValue = parseFloat(formData.budget);
      
      if (
        !formData.name ||
        !formData.startDate ||
        !formData.endDate ||
        (formData.budget && (isNaN(budgetValue) || budgetValue <= 0)) ||
        !formData.objective
      ) {
        return true;
      }
    }
    
    return false;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 w-full max-w-3xl bg-background shadow-lg animate-in slide-in-from-right">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-bold">Create a New Campaign</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between px-6 py-4 bg-muted/50">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium 
                    ${getStepStatus(step.id) === 'completed' 
                      ? 'bg-marketing-green text-white' 
                      : getStepStatus(step.id) === 'current'
                        ? 'bg-marketing-red text-white'
                        : 'bg-muted-foreground/30 text-muted-foreground'
                    }`}
                  >
                    {getStepStatus(step.id) === 'completed' ? '✓' : step.id}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="w-12 h-[1px] bg-border mx-2"></div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <ScrollArea className="flex-1 px-6 py-6">
            {currentStep === 1 && (
              <PlatformSelector 
                selectedPlatforms={selectedPlatforms}
                onChange={handlePlatformChange}
              />
            )}
            
            {currentStep === 2 && (
              <TemplateSelector 
                selectedTemplate={selectedTemplate}
                onChange={handleTemplateChange}
              />
            )}
            
            {currentStep === 3 && (
              <CampaignForm 
                formData={formData}
                onChange={handleCampaignFormChange}
              />
            )}
            
            {currentStep === 4 && (
              <CampaignPreview selectedPlatforms={selectedPlatforms} />
            )}
          </ScrollArea>
          
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            <div className="flex items-center gap-2">
              {currentStep === steps.length ? (
                <Button 
                  className="bg-marketing-green hover:bg-marketing-green/90"
                  disabled={formData.budget === '' || parseFloat(formData.budget) <= 0}
                >
                  Launch Campaign
                </Button>
              ) : (
                <Button 
                  className="bg-marketing-red hover:bg-marketing-red/90"
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignDrawer;
