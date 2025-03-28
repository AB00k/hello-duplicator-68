
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, FileCheck, FileCode, FilePlus } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string | null;
  onChange: (templateId: string | null) => void;
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  presets: {
    name: string;
    startDate?: Date;
    endDate?: Date;
    budget: string;
    objective: string;
    targetAudience: string;
    description: string;
  };
}

const TemplateSelector = ({ selectedTemplate, onChange }: TemplateSelectorProps) => {
  const templates: Template[] = [
    {
      id: 'custom',
      name: 'Start from scratch',
      description: 'Create your own custom campaign with full control',
      icon: <FilePlus className="h-8 w-8 text-marketing-red" />,
      presets: {
        name: '',
        budget: '',
        objective: '',
        targetAudience: '',
        description: '',
      }
    },
    {
      id: 'new-menu',
      name: 'New Menu Launch',
      description: 'Promote your new menu items to existing customers',
      icon: <FileCheck className="h-8 w-8 text-marketing-green" />,
      presets: {
        name: 'New Menu Launch',
        budget: '5000',
        objective: 'Increase orders of new menu items',
        targetAudience: 'Existing customers',
        description: 'Campaign to highlight our delicious new menu items and drive repeat orders.',
      }
    },
    {
      id: 'promo-deal',
      name: 'Promotional Deal',
      description: 'Limited time offer with special discounts',
      icon: <FileCode className="h-8 w-8 text-marketing-blue" />,
      presets: {
        name: 'Special Promotion',
        budget: '3000',
        objective: 'Drive sales through limited-time offers',
        targetAudience: 'Price-sensitive customers',
        description: 'Limited-time promotion with special discounts to increase order volume.',
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose a Campaign Template</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Select a predefined template or start from scratch to design your campaign.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:border-gray-300 ${
              selectedTemplate === template.id 
                ? 'border-2 border-marketing-red' 
                : 'border'
            }`}
            onClick={() => onChange(template.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-muted p-2">
                    {template.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`h-5 w-5 transition-all ${
                  selectedTemplate === template.id 
                    ? 'text-marketing-red' 
                    : 'text-muted-foreground'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
export type { Template };
