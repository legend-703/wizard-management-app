export type Step = {
  id: string;
  type: string;
  title: string;
  description: string;
  config?: Record<string, unknown>;
};

export type Wizard = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  status: 'active' | 'draft';
  createdAt: string; // ISO
  steps: Step[];
};

export const WIZARDS: Wizard[] = [
  {
    id: '1',
    name: 'Send Welcome Email Sequence',
    description: "Automated workflow to send a series of welcome emails to new users",
    shortDescription: 'Welcome email automation workflow',
    status: 'active',
    createdAt: '2024-10-15T10:30:00Z',
    steps: [
      {
        id: 'step-1',
        type: 'email',
        title: 'Send Welcome Email',
        description: "Send initial welcome email with getting started guide",
        config: { to: 'user@example.com', subject: "Welcome to Our Platform!", body: "Welcome! We're excited to have you on board..." }
      },
      {
        id: 'step-2',
        type: 'email',
        title: 'Send Feature Overview',
        description: 'Highlight key features and tips',
        config: { to: 'user@example.com', subject: 'Discover Our Key Features', body: 'Here are the amazing features you can use...' }
      },
      {
        id: 'step-3',
        type: 'meeting',
        title: 'Schedule Introduction Call',
        description: "Meeting to discuss user's needs and goals",
        config: { duration: '30m', title: 'Welcome Call' }
      }
    ]
  },
  // Add 8-11 more mock wizards with variation in status and step counts
  {
    id: '2',
    name: 'Onboarding SMS & Email',
    description: 'Sends SMS followed by email for onboarding',
    shortDescription: 'SMS + Email Onboarding',
    status: 'draft',
    createdAt: '2024-09-20T09:00:00Z',
    steps: [
      { id: 's2-1', type: 'sms', title: 'Send SMS', description: 'Short welcome SMS', config: { to: '+15551234567', body: 'Welcome!' } },
      { id: 's2-2', type: 'email', title: 'Follow-up Email', description: 'Detailed instructions', config: { to: 'user@example.com', subject: 'Getting started', body: '...' } }
    ]
  },
  {
    id: '3',
    name: 'Feedback Request Sequence',
    description: 'Ask for feedback after first week',
    shortDescription: 'Feedback email + webhook',
    status: 'active',
    createdAt: '2024-07-01T14:25:00Z',
    steps: [
      { id: 's3-1', type: 'email', title: 'Email Feedback', description: 'Ask for feedback', config: { to: 'user@example.com', subject: 'How did we do?', body: 'Please tell us...' } },
      { id: 's3-2', type: 'webhook', title: 'Send Feedback to CRM', description: 'POST feedback', config: { url: 'https://example.com/webhook' } }
    ]
  },
  {
    id: '4',
    name: 'Feature Announcement',
    description: 'Notify users of new feature',
    shortDescription: 'Announce new feature',
    status: 'active',
    createdAt: '2024-08-05T11:00:00Z',
    steps: [
      { id: 's4-1', type: 'notification', title: 'In-app Notification', description: 'Notify in app', config: {} },
      { id: 's4-2', type: 'email', title: 'Announcement Email', description: 'Detailed feature email', config: { to: 'user@example.com', subject: 'New Feature!', body: '...' } }
    ]
  },
  {
    id: '5',
    name: 'Meeting + Follow-up',
    description: 'Schedule intro meeting and send follow-up',
    shortDescription: 'Meeting flow',
    status: 'draft',
    createdAt: '2024-05-10T08:15:00Z',
    steps: [
      { id: 's5-1', type: 'meeting', title: 'Schedule Call', description: 'Invite user', config: { duration: '30m', title: 'Intro Call' } },
      { id: 's5-2', type: 'email', title: 'Follow-up', description: 'Send notes', config: { to: 'user@example.com', subject: 'Thanks!', body: '...' } }
    ]
  },
  {
    id: '6',
    name: 'Daily Digest',
    description: 'Send daily digest email',
    shortDescription: 'Daily email',
    status: 'active',
    createdAt: '2024-11-01T06:00:00Z',
    steps: [
      { id: 's6-1', type: 'email', title: 'Send Digest', description: 'Daily summary', config: { to: 'user@example.com', subject: 'Your Daily Digest', body: '...' } }
    ]
  },
  {
    id: '7',
    name: 'Trial Expiry Flow',
    description: 'Notify user that trial is expiring',
    shortDescription: 'Trial expiry',
    status: 'active',
    createdAt: '2024-06-15T12:00:00Z',
    steps: [
      { id: 's7-1', type: 'email', title: 'Warning Email', description: 'Trial ending soon', config: { to: 'user@example.com', subject: 'Trial ending', body: '...' } },
      { id: 's7-2', type: 'email', title: 'Last Chance', description: 'Final reminder', config: { to: 'user@example.com', subject: 'Last chance', body: '...' } }
    ]
  },
  {
    id: '8',
    name: 'Re-engagement Campaign',
    description: 'Try to bring users back',
    shortDescription: 'Re-engage users',
    status: 'draft',
    createdAt: '2024-04-01T10:00:00Z',
    steps: [
      { id: 's8-1', type: 'email', title: 'We miss you', description: 'Re-engagement email', config: { to: 'user@example.com', subject: "We miss you", body: '...' } },
      { id: 's8-2', type: 'webhook', title: 'Log Attempt', description: 'Send to analytics', config: { url: 'https://analytics.example.com' } }
    ]
  },
  {
    id: '9',
    name: 'Onboarding Flow',
    description: 'A step-by-step onboarding process for new users.',
    shortDescription: 'Re-engage users',
    status: 'active',
    createdAt: '2024-04-01T10:00:00Z',
    steps: [
      { id: 's8-1', type: 'email', title: 'We miss you', description: 'Re-engagement email', config: { to: 'user@example.com', subject: "We miss you", body: '...' } },
      { id: 's8-2', type: 'webhook', title: 'Log Attempt', description: 'Send to analytics', config: { url: 'https://analytics.example.com' } }
    ]
  },
  {
    id: '10',
    name: 'Bug Reporting Wizard',
    description: 'Guides users through structured bug reporting.',
    shortDescription: 'Re-engage users',
    status: 'draft',
    createdAt: '2024-04-01T10:00:00Z',
    steps: [
      { id: 's8-1', type: 'email', title: 'We miss you', description: 'Re-engagement email', config: { to: 'user@example.com', subject: "We miss you", body: '...' } },
      { id: 's8-2', type: 'webhook', title: 'Log Attempt', description: 'Send to analytics', config: { url: 'https://analytics.example.com' } }
    ]
  }
];

export default WIZARDS;