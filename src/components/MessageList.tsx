import React, { useState } from 'react';
import { format } from 'date-fns';
import { Mail, MessageSquare, Phone, Search, Filter as FilterIcon, Bell } from 'lucide-react';
import { Message, Filter as FilterType, Notification } from '../types';
import { AdvancedFilters } from './AdvancedFilters';
import { NotificationCenter } from './NotificationCenter';

interface MessageListProps {
  messages: Message[];
  onSelectMessage: (message: Message) => void;
  selectedMessage?: Message;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  onSelectMessage,
  selectedMessage,
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  notifications,
  onNotificationClick,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'gmail':
        return <Mail size={20} />;
      case 'whatsapp':
        return <Phone size={20} />;
      default:
        return <MessageSquare size={20} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'follow-up':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <FilterIcon size={20} className="text-gray-500" />
              {(filters.platform.length > 0 ||
                filters.priority.length > 0 ||
                filters.labels.length > 0 ||
                filters.read !== null ||
                filters.dateRange.start !== null ||
                filters.dateRange.end !== null) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </button>
            {showFilters && (
              <AdvancedFilters
                filters={filters}
                onFiltersChange={onFiltersChange}
                onClose={() => setShowFilters(false)}
              />
            )}
          </div>

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Bell size={20} className="text-gray-500" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                {unreadNotifications}
              </span>
            )}
          </button>
          {showNotifications && (
            <NotificationCenter
              notifications={notifications}
              onNotificationClick={onNotificationClick}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => onSelectMessage(message)}
            className={`p-4 border-b cursor-pointer transition-colors ${
              selectedMessage?.id === message.id ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={message.avatar}
                alt={message.sender}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{message.sender}</span>
                  <span className="text-sm text-gray-500">
                    {format(message.timestamp, 'MMM d, h:mm a')}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {getPlatformIcon(message.platform)}
                  <span>{message.platform}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-2 line-clamp-2">{message.content}</p>
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                  message.priority
                )}`}
              >
                {message.priority}
              </span>
              {message.attachments && message.attachments.length > 0 && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  {message.attachments.length} attachment{message.attachments.length !== 1 ? 's' : ''}
                </span>
              )}
              {message.draft && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  Draft
                </span>
              )}
              {!message.read && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  New
                </span>
              )}
              {message.labels && message.labels.length > 0 && (
                <div className="flex items-center space-x-1">
                  {message.labels.map((label) => (
                    <span
                      key={label}
                      className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};