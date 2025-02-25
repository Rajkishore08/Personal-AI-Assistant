import { useState, useEffect } from 'react';
import { whatsAppService } from '../services/whatsapp';
import type { Message } from '../types';

export function useWhatsApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeWhatsApp = async () => {
      try {
        // In a real application, you would get this token from your backend
        const token = process.env.TWILIO_TOKEN;
        
        if (!token) {
          throw new Error('WhatsApp token not found');
        }

        const connected = await whatsAppService.initialize(token);
        setIsConnected(connected);

        if (connected) {
          // Subscribe to new messages
          whatsAppService.on('messageReceived', (message: Message) => {
            setMessages((prev) => [...prev, message]);
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to WhatsApp');
        setIsConnected(false);
      }
    };

    initializeWhatsApp();

    return () => {
      // Cleanup if needed
    };
  }, []);

  const sendMessage = async (to: string, content: string) => {
    try {
      if (!isConnected) {
        throw new Error('WhatsApp service not connected');
      }

      const messageId = await whatsAppService.sendMessage(to, content);
      return messageId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      throw err;
    }
  };

  return {
    messages,
    isConnected,
    error,
    sendMessage,
  };
}