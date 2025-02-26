import { useState, useEffect } from 'react';
import { gmailService } from '../services/gmail';
import type { Message } from '../types';

export function useGmail() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeGmail = async () => {
      try {
        const connected = await gmailService.initialize();
        setIsConnected(connected);

        if (connected) {
          gmailService.on('messageReceived', (message: Message) => {
            setMessages((prev) => [...prev, message]);
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to Gmail');
        setIsConnected(false);
      }
    };

    initializeGmail();
  }, []);

  const sendEmail = async (to: string, subject: string, content: string) => {
    try {
      if (!isConnected) {
        throw new Error('Gmail service not connected');
      }

      const messageId = await gmailService.sendEmail(to, subject, content);
      return messageId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send email');
      throw err;
    }
  };

  return {
    messages,
    isConnected,
    error,
    sendEmail,
  };
}