import { gapi } from 'gapi-script';

class GmailService {
  private isInitialized = false;
  private listeners: { [key: string]: Function[] } = {};
  private initializationPromise: Promise<boolean> | null = null;

  async initialize() {
    // Return existing initialization if in progress
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    // Return true if already initialized
    if (this.isInitialized) {
      return true;
    }

    this.initializationPromise = new Promise<boolean>(async (resolve) => {
      try {
        // Load the Google API client library
        await new Promise<void>((resolveScript) => {
          if (document.querySelector('script[src="https://apis.google.com/js/api.js"]')) {
            gapi.load('client:auth2', () => resolveScript());
            return;
          }

          const script = document.createElement('script');
          script.src = 'https://apis.google.com/js/api.js';
          script.onload = () => {
            gapi.load('client:auth2', () => resolveScript());
          };
          document.body.appendChild(script);
        });

        // Initialize the client with a timeout
        const initPromise = gapi.client.init({
          apiKey: import.meta.env.VITE_GMAIL_API_KEY,
          clientId: '1044860312964-c3klb8umhp6ian5d39q7trmvardt4lar.apps.googleusercontent.com',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
          scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send'
        });

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Gmail initialization timed out')), 10000);
        });

        await Promise.race([initPromise, timeoutPromise]);

        // Sign in the user with better error handling
        const authInstance = gapi.auth2.getAuthInstance();
        
        if (!authInstance.isSignedIn.get()) {
          try {
            await new Promise<void>((resolveAuth, rejectAuth) => {
              const handleAuthResult = (isSignedIn: boolean) => {
                if (isSignedIn) {
                  resolveAuth();
                } else {
                  rejectAuth(new Error('User declined to sign in'));
                }
              };

              authInstance.isSignedIn.listen(handleAuthResult);
              authInstance.signIn().catch((error) => {
                if (error.error === 'popup_blocked_by_browser') {
                  // If popup is blocked, try immediate mode
                  return authInstance.signIn({ prompt: 'none' });
                }
                throw error;
              });
            });
          } catch (error) {
            console.error('Authentication failed:', error);
            this.initializationPromise = null;
            resolve(false);
            return;
          }
        }

        this.isInitialized = true;
        this.startEmailWatch();
        resolve(true);
      } catch (error) {
        console.error('Failed to initialize Gmail client:', error);
        this.initializationPromise = null;
        resolve(false);
      }
    });

    return this.initializationPromise;
  }

  private async startEmailWatch() {
    if (!this.isInitialized) return;

    try {
      const response = await gapi.client.gmail.users.messages.list({
        userId: 'me',
        q: 'is:unread'
      });

      const messages = response.result.messages || [];
      for (const message of messages) {
        const email = await this.fetchEmail(message.id);
        if (email) {
          this.emit('messageReceived', this.standardizeEmail(email));
        }
      }

      // Set up polling for new messages
      setInterval(async () => {
        const newResponse = await gapi.client.gmail.users.messages.list({
          userId: 'me',
          q: 'is:unread'
        });

        const newMessages = newResponse.result.messages || [];
        for (const message of newMessages) {
          const email = await this.fetchEmail(message.id);
          if (email) {
            this.emit('messageReceived', this.standardizeEmail(email));
          }
        }
      }, 10000); // Poll every 10 seconds
    } catch (error) {
      console.error('Error watching emails:', error);
    }
  }

  private async fetchEmail(messageId: string) {
    try {
      const response = await gapi.client.gmail.users.messages.get({
        userId: 'me',
        id: messageId,
        format: 'full'
      });

      return response.result;
    } catch (error) {
      console.error('Error fetching email:', error);
      return null;
    }
  }

  private standardizeEmail(email: any) {
    const headers = email.payload.headers;
    const subject = headers.find((h: any) => h.name === 'Subject')?.value || '';
    const from = headers.find((h: any) => h.name === 'From')?.value || '';
    const date = headers.find((h: any) => h.name === 'Date')?.value || '';

    return {
      id: email.id,
      platform: 'gmail' as const,
      sender: from,
      subject,
      content: this.decodeEmailBody(email.payload),
      timestamp: new Date(date),
      priority: this.determinePriority(subject, from),
      read: !email.labelIds.includes('UNREAD'),
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    };
  }

  private decodeEmailBody(payload: any): string {
    if (payload.body.data) {
      return atob(payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
    }

    if (payload.parts) {
      for (const part of payload.parts) {
        if (part.mimeType === 'text/plain' || part.mimeType === 'text/html') {
          return this.decodeEmailBody(part);
        }
      }
    }

    return '';
  }

  private determinePriority(subject: string, from: string): 'urgent' | 'follow-up' | 'low' {
    const urgentKeywords = ['urgent', 'asap', 'emergency', 'important'];
    const followUpKeywords = ['follow up', 'followup', 'reminder', 'update'];
    
    const lowerSubject = subject.toLowerCase();
    const lowerFrom = from.toLowerCase();

    if (urgentKeywords.some(keyword => lowerSubject.includes(keyword))) {
      return 'urgent';
    }

    if (followUpKeywords.some(keyword => lowerSubject.includes(keyword))) {
      return 'follow-up';
    }

    return 'low';
  }

  async sendEmail(to: string, subject: string, content: string) {
    if (!this.isInitialized) {
      throw new Error('Gmail client not initialized');
    }

    try {
      const email = [
        'Content-Type: text/plain; charset="UTF-8"\n',
        'MIME-Version: 1.0\n',
        'Content-Transfer-Encoding: 7bit\n',
        `To: ${to}\n`,
        `Subject: ${subject}\n\n`,
        content
      ].join('');

      const encodedEmail = btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      const response = await gapi.client.gmail.users.messages.send({
        userId: 'me',
        resource: {
          raw: encodedEmail
        }
      });

      return response.result.id;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

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

export const gmailService = new GmailService();