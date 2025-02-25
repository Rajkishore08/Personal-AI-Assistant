import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Mail,
  MessageSquare,
  Phone,
  Star,
  Share,
  MoreHorizontal,
  Paperclip,
  Send
} from 'lucide-react';
import { Message } from '../types';

interface MessageDetailProps {
  message: Message;
}

export const MessageDetail: React.FC<MessageDetailProps> = ({ message }) => {
  const [replyText, setReplyText] = useState('');

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'gmail':
        return <Mail size={24} />;
      case 'whatsapp':
        return <Phone size={24} />;
      default:
        return <MessageSquare size={24} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={message.avatar}
              alt={message.sender}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{message.sender}</h2>
              <p className="text-gray-500">
                {format(message.timestamp, 'MMMM d, yyyy h:mm a')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Star size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
              <div className="space-y-2">
                {message.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <Paperclip size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{attachment}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {message.thread && message.thread.length > 0 && (
          <div className="space-y-4 mb-6">
            <h4 className="text-sm font-medium text-gray-700">Thread</h4>
            {message.thread.map((reply, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{reply}</p>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">AI Summary</h3>
            <p className="text-gray-700">
              This message requires immediate attention regarding the project proposal review.
              Action needed by end of day.
            </p>
            <div className="mt-2 pt-2 border-t border-blue-100">
              <h4 className="text-sm font-medium mb-1">Action Items:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>Review project proposal</li>
                <li>Provide feedback by EOD</li>
                <li>Schedule follow-up meeting if needed</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Suggested Replies</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 rounded bg-white hover:bg-green-100 transition-colors">
                "Thank you for your message. I'll review the project proposal and provide feedback
                by end of day today. Is there anything specific you'd like me to focus on?"
              </button>
              <button className="w-full text-left p-2 rounded bg-white hover:bg-green-100 transition-colors">
                "I'll start reviewing the proposal right away and get back to you with my thoughts."
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Paperclip size={20} className="text-gray-500" />
            </button>
            <button
              className={`p-2 rounded-full transition-colors ${
                replyText.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};