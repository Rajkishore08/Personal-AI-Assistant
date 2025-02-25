import React from 'react';
import { Mail, MessageSquare, Phone, Search, Plus, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onComposeClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onComposeClick }) => {
  const tabs = [
    { id: 'all', icon: MessageSquare, label: 'All Messages' },
    { id: 'gmail', icon: Mail, label: 'Gmail' },
    { id: 'slack', icon: MessageSquare, label: 'Slack' },
    { id: 'whatsapp', icon: Phone, label: 'WhatsApp' }
  ];

  return (
    <div className="w-64 bg-gray-900 h-screen p-4 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-xl font-bold">AI Assistant</h1>
        <button className="text-gray-400 hover:text-white">
          <Settings size={20} />
        </button>
      </div>

      <button
        onClick={onComposeClick}
        className="bg-blue-600 text-white w-full py-3 rounded-lg mb-6 flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
      >
        <Plus size={20} />
        <span>Compose</span>
      </button>

      <nav className="flex-1">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeTab === id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};