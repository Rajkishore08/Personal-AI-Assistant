import { Client } from '@twilio/conversations';

class WhatsAppService {
  private client: Client | null = null;
  private conversations: Map<string, any> = new Map();

  async initialize(token: string) {
    try {
      this.client = new Client(token);
      await this.client.initialize();
      
      // Handle incoming messages
      this.client.on('messageAdded', (message) => {
        this.handleIncomingMessage(message);
      });

      // Handle conversation updates
      this.client.on('conversationAdded', (conversation) => {
        this.handleNewConversation(conversation);
      });

      return true;
    } catch (error) {
      console.error('Failed to initialize WhatsApp client:', error);
      return false;
    }
  }

  private async handleIncomingMessage(message: any) {
    const conversation = message.conversation;
    const sender = message.author;
    const content = message.body;
    const timestamp = message.dateCreated;

    // Create a standardized message format
    const standardizedMessage = {
      id: message.sid,
      platform: 'whatsapp',
      sender,
      content,
      timestamp,
      priority: 'low',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    };

    // Emit the message to any subscribers
    this.emit('messageReceived', standardizedMessage);
  }

  private async handleNewConversation(conversation: any) {
    this.conversations.set(conversation.sid, conversation);
    
    // Subscribe to conversation updates
    conversation.on('messageAdded', (message: any) => {
      this.handleIncomingMessage(message);
    });
  }

  async sendMessage(to: string, content: string) {
    try {
      if (!this.client) {
        throw new Error('WhatsApp client not initialized');
      }

      // Get or create conversation
      let conversation = Array.from(this.conversations.values()).find(
        (conv) => conv.attributes.to === to
      );

      if (!conversation) {
        conversation = await this.client.createConversation({
          attributes: { to },
        });
        this.conversations.set(conversation.sid, conversation);
      }

      // Send the message
      const message = await conversation.sendMessage(content);
      return message.sid;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      throw error;
    }
  }

  // Event handling
  private listeners: { [key: string]: Function[] } = {};

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  private emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }
}

export const whatsAppService = new WhatsAppService();