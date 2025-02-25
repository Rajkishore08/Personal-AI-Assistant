import React from 'react';
import { format } from 'date-fns';
import { Bell, X, Circle } from 'lucide-react';
import type { Notification } from '../types';

interface NotificationCenterProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onNotificationClick,
  onClose,
}) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bell size={20} />
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => onNotificationClick(notification)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                notification.read ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                {!notification.read && (
                  <Circle size={8} className="mt-2 text-blue-500 fill-current" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{notification.title}</span>
                    <span className="text-sm text-gray-500">
                      {format(notification.timestamp, 'h:mm a')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{notification.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};