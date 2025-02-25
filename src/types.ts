export interface Message {
  id: string;
  platform: 'gmail' | 'slack' | 'whatsapp';
  sender: string;
  content: string;
  timestamp: Date;
  priority: 'urgent' | 'follow-up' | 'low';
  read: boolean;
  avatar?: string;
  attachments?: string[];
  thread?: string[];
  labels?: string[];
  draft?: boolean;
}

export interface Summary {
  original: string;
  summary: string;
  actionItems: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  context?: {
    previousInteractions: string[];
    relatedTopics: string[];
    suggestedNextSteps: string[];
  };
}

export interface Filter {
  search: string;
  platform: string[];
  priority: string[];
  read: boolean | null;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  labels: string[];
}

export interface Notification {
  id: string;
  type: 'message' | 'mention' | 'reminder' | 'update';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
}