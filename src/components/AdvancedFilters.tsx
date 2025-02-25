import React from 'react';
import { format } from 'date-fns';
import { Filter, Tag, Calendar, CheckSquare, X } from 'lucide-react';
import type { Filter as FilterType } from '../types';

interface AdvancedFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  onClose: () => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  onClose,
}) => {
  const platforms = ['gmail', 'slack', 'whatsapp'];
  const priorities = ['urgent', 'follow-up', 'low'];
  const labels = ['work', 'personal', 'important', 'follow-up', 'archived'];

  const handlePlatformToggle = (platform: string) => {
    const newPlatforms = filters.platform.includes(platform)
      ? filters.platform.filter(p => p !== platform)
      : [...filters.platform, platform];
    onFiltersChange({ ...filters, platform: newPlatforms });
  };

  const handlePriorityToggle = (priority: string) => {
    const newPriorities = filters.priority.includes(priority)
      ? filters.priority.filter(p => p !== priority)
      : [...filters.priority, priority];
    onFiltersChange({ ...filters, priority: newPriorities });
  };

  const handleLabelToggle = (label: string) => {
    const newLabels = filters.labels.includes(label)
      ? filters.labels.filter(l => l !== label)
      : [...filters.labels, label];
    onFiltersChange({ ...filters, labels: newLabels });
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Advanced Filters</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Filter size={16} className="mr-2" />
              Platforms
            </h4>
            <div className="flex flex-wrap gap-2">
              {platforms.map(platform => (
                <button
                  key={platform}
                  onClick={() => handlePlatformToggle(platform)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.platform.includes(platform)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <CheckSquare size={16} className="mr-2" />
              Priority
            </h4>
            <div className="flex flex-wrap gap-2">
              {priorities.map(priority => (
                <button
                  key={priority}
                  onClick={() => handlePriorityToggle(priority)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.priority.includes(priority)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Tag size={16} className="mr-2" />
              Labels
            </h4>
            <div className="flex flex-wrap gap-2">
              {labels.map(label => (
                <button
                  key={label}
                  onClick={() => handleLabelToggle(label)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.labels.includes(label)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Calendar size={16} className="mr-2" />
              Date Range
            </h4>
            <div className="space-y-2">
              <input
                type="date"
                value={filters.dateRange.start ? format(filters.dateRange.start, 'yyyy-MM-dd') : ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
                      start: e.target.value ? new Date(e.target.value) : null,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
              <input
                type="date"
                value={filters.dateRange.end ? format(filters.dateRange.end, 'yyyy-MM-dd') : ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
                      end: e.target.value ? new Date(e.target.value) : null,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onFiltersChange({
                ...filters,
                read: filters.read === null ? true : filters.read === true ? false : null,
              })}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.read === null
                  ? 'bg-gray-100 text-gray-600'
                  : filters.read
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {filters.read === null ? 'All' : filters.read ? 'Read' : 'Unread'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};