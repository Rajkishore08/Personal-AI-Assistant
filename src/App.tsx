import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MessageList } from './components/MessageList';
import { MessageDetail } from './components/MessageDetail';
import { ComposeModal } from './components/ComposeModal';
import { mockMessages } from './mockData';
import { Message, Filter, Notification } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | undefined>(
    mockMessages[0]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [filters, setFilters] = useState<Filter>({
    search: '',
    platform: [],
    priority: [],
    read: null,
    dateRange: {
      start: null,
      end: null,
    },
    labels: [],
  });

  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'message',
      title: 'New message from John Doe',
      description: 'Project proposal review request',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      type: 'mention',
      title: 'You were mentioned in Slack',
      description: '@you Please review the latest changes',
      timestamp: new Date(),
      read: false,
    },
  ]);

  const filteredMessages = mockMessages
    .filter(msg => 
      activeTab === 'all' ? true : msg.platform === activeTab
    )
    .filter(msg =>
      searchQuery
        ? msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.sender.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter(msg => 
      filters.platform.length === 0 ? true : filters.platform.includes(msg.platform)
    )
    .filter(msg =>
      filters.priority.length === 0 ? true : filters.priority.includes(msg.priority)
    )
    .filter(msg =>
      filters.read === null ? true : msg.read === filters.read
    )
    .filter(msg =>
      filters.dateRange.start && filters.dateRange.end
        ? msg.timestamp >= filters.dateRange.start && msg.timestamp <= filters.dateRange.end
        : true
    )
    .filter(msg =>
      filters.labels.length === 0
        ? true
        : msg.labels?.some(label => filters.labels.includes(label)) ?? false
    );

  useEffect(() => {
    if (filteredMessages.length > 0 && !selectedMessage) {
      setSelectedMessage(filteredMessages[0]);
    }
  }, [activeTab, searchQuery, filters]);

  const handleNotificationClick = (notification: Notification) => {
    setNotifications(notifications.map(n =>
      n.id === notification.id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onComposeClick={() => setShowComposeModal(true)}
      />
      <div className="flex flex-1">
        <div className="w-96 bg-white border-r">
          <MessageList
            messages={filteredMessages}
            onSelectMessage={setSelectedMessage}
            selectedMessage={selectedMessage}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
          />
        </div>
        <div className="flex-1 bg-gray-50">
          {selectedMessage ? (
            <MessageDetail message={selectedMessage} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a message to view details
            </div>
          )}
        </div>
      </div>

      {showComposeModal && (
        <ComposeModal onClose={() => setShowComposeModal(false)} />
      )}
    </div>
  );
}

export default App;