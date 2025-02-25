import { Message } from './types';

export const mockMessages: Message[] = [
  {
    id: '1',
    platform: 'gmail',
    sender: 'john.doe@example.com',
    content: 'Hi, could you please review the latest project proposal? We need feedback by EOD.',
    timestamp: new Date('2024-03-10T10:30:00'),
    priority: 'urgent',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    attachments: ['project_proposal.pdf']
  },
  {
    id: '2',
    platform: 'slack',
    sender: 'Sarah Smith',
    content: 'Team meeting notes from yesterday have been uploaded to the shared drive.',
    timestamp: new Date('2024-03-10T09:15:00'),
    priority: 'follow-up',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    thread: [
      'Thanks for sharing!',
      'Could you highlight the key decisions?'
    ]
  },
  {
    id: '3',
    platform: 'whatsapp',
    sender: '+1234567890',
    content: 'Quick question about the client presentation tomorrow.',
    timestamp: new Date('2024-03-10T11:45:00'),
    priority: 'low',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop'
  },
  {
    id: '4',
    platform: 'slack',
    sender: 'Alex Johnson',
    content: 'The latest deployment is complete. All tests are passing. Ready for QA review.',
    timestamp: new Date('2024-03-10T14:20:00'),
    priority: 'follow-up',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    thread: [
      'Great work! Moving to QA now.',
      'Any specific areas we should focus on?'
    ]
  },
  {
    id: '5',
    platform: 'gmail',
    sender: 'marketing@company.com',
    content: 'New marketing campaign materials are ready for review. Please check the brand guidelines compliance.',
    timestamp: new Date('2024-03-10T15:30:00'),
    priority: 'urgent',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    attachments: ['campaign_assets.zip', 'brand_guidelines.pdf']
  }
];