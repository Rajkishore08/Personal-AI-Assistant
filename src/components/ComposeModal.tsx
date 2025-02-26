import React, { useState } from 'react';
import { X, Send, Paperclip } from 'lucide-react';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { useGmail } from '../hooks/useGmail';

interface ComposeModalProps {
  onClose: () => void;
}

export const ComposeModal: React.FC<ComposeModalProps> = ({ onClose }) => {
  const [platform, setPlatform] = useState<'gmail' | 'whatsapp'>('gmail');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { sendMessage: sendWhatsApp, isConnected: isWhatsAppConnected } = useWhatsApp();
  const { sendEmail, isConnected: isGmailConnected } = useGmail();

  const handleSend = async () => {
    if (platform === 'whatsapp' && !isWhatsAppConnected) {
      setError('WhatsApp service not connected');
      return;
    }

    if (platform === 'gmail' && !isGmailConnected) {
      setError('Gmail service not connected');
      return;
    }

    if (!recipient || !message || (platform === 'gmail' && !subject)) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSending(true);
      if (platform === 'whatsapp') {
        await sendWhatsApp(recipient, message);
      } else {
        await sendEmail(recipient, subject, message);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">New Message</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setPlatform('gmail')}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  platform === 'gmail'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Gmail
              </button>
              <button
                onClick={() => setPlatform('whatsapp')}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  platform === 'whatsapp'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                WhatsApp
              </button>
            </div>

            <div>
              <input
                type="text"
                placeholder={platform === 'gmail' ? 'To (email)' : 'To (WhatsApp number)'}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {platform === 'gmail' && (
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={12}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Paperclip size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              disabled={sending}
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={sending || (platform === 'whatsapp' ? !isWhatsAppConnected : !isGmailConnected)}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 ${
                (sending || (platform === 'whatsapp' ? !isWhatsAppConnected : !isGmailConnected)) &&
                'opacity-50 cursor-not-allowed'
              }`}
            >
              <Send size={16} />
              <span>{sending ? 'Sending...' : 'Send'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};