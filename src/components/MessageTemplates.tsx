import React from 'react';
import { FileText, Plus, X } from 'lucide-react';
import type { MessageTemplate } from '../types';

interface MessageTemplatesProps {
  templates: MessageTemplate[];
  onSelectTemplate: (template: MessageTemplate) => void;
  onClose: () => void;
}

export const MessageTemplates: React.FC<MessageTemplatesProps> = ({
  templates,
  onSelectTemplate,
  onClose,
}) => {
  return (
    <div className="absolute bottom-full left-0 mb-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Message Templates</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FileText size={20} className="text-gray-400" />
                <div>
                  <div className="font-medium">{template.name}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {template.subject}
                  </div>
                </div>
              </div>
            </button>
          ))}

          <button className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors text-gray-500 hover:text-gray-600">
            <Plus size={20} />
            <span>Create New Template</span>
          </button>
        </div>
      </div>
    </div>
  );
};