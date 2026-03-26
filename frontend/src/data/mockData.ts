export const mockStats = {
  totalAnalyzed: 12840,
  toxicPercentage: 12.5,
  spamPercentage: 8.2,
  safetyScore: 84
};

export const recentActivity = [
  {
    id: 1,
    platform: 'youtube',
    target: 'Modern Frontend Patterns 2024',
    timestamp: '2 mins ago',
    toxic: 5,
    spam: 12,
    safe: 83
  },
  {
    id: 2,
    platform: 'github',
    target: 'facebook/react/issues/2841',
    timestamp: '15 mins ago',
    toxic: 2,
    spam: 4,
    safe: 94
  },
  {
    id: 3,
    platform: 'youtube',
    target: 'SaaS Launch Strategy',
    timestamp: '1 hour ago',
    toxic: 18,
    spam: 25,
    safe: 57
  }
];

export const mockComments = [
  {
    id: 1,
    user: 'TechEnthusiast',
    content: 'This video is absolute trash, you have no idea what you are talking about. Piece of garbage.',
    score: 92,
    type: 'Toxic',
    action: 'Hide',
    category: 'Hate Speech',
    timestamp: '2026-03-25T14:30:00Z',
    platform: 'youtube'
  },
  {
    id: 2,
    user: 'SpamBot99',
    content: 'CLICK HERE TO WIN A FREE IPHONE!!! DONT MISS OUT ON THIS AMAZING OFFER!!!',
    score: 88,
    type: 'Spam',
    action: 'Hide',
    category: 'Spam',
    timestamp: '2026-03-25T14:35:00Z',
    platform: 'youtube'
  },
  {
    id: 3,
    user: 'DevUser123',
    content: 'Great explanation on the Framer Motion part! Could you also cover complex exit animations?',
    score: 2,
    type: 'Safe',
    action: 'Approve',
    category: 'None',
    timestamp: '2026-03-25T14:40:00Z',
    platform: 'youtube'
  },
  {
    id: 4,
    user: 'AngryDev',
    content: 'This library is useless. Why even bother making this? Go back to school.',
    score: 75,
    type: 'Toxic',
    action: 'Flag',
    category: 'Harassment',
    timestamp: '2026-03-25T14:45:00Z',
    platform: 'github'
  }
];

export const customFilters = [
  { word: 'trash', language: 'English', matches: 142 },
  { word: 'garbage', language: 'English', matches: 84 },
  { word: 'ghatiya', language: 'Hindi', matches: 32 },
  { word: 'bekaar', language: 'Hindi', matches: 56 }
];
