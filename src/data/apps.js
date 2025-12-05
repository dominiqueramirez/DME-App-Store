/**
 * DME App Store - App Data
 * 
 * To add a new app, copy this template and fill in the details:
 * {
 *   id: 'unique-id',
 *   name: 'App Name',
 *   description: 'Short description of what the app does',
 *   icon: 'emoji or icon name',
 *   iconBg: 'gradient classes for icon background',
 *   category: 'Productivity' | 'Media' | 'Data' | 'Communication' | 'Utilities' | 'Documentation',
 *   platform: 'Claude Artifact' | 'VS Code/GitHub' | 'Slack',
 *   designedFor: ['Person1', 'Person2'] or ['Everyone'],
 *   url: 'https://link-to-app',
 *   dateAdded: '2025-12-05',
 *   featured: false,
 * }
 */

export const apps = [
  // ============================================
  // EXAMPLE APPS - Replace with your real apps!
  // ============================================
  {
    id: 'transcript-cleaner',
    name: 'Transcript Cleaner',
    description: 'Clean Adobe Premiere transcript files by applying VA-specific capitalization rules. Preserves timestamps and speaker names while fixing terminology.',
    icon: '📝',
    iconBg: 'from-blue-500 to-blue-600',
    category: 'Media',
    platform: 'VS Code/GitHub',
    designedFor: ['Everyone'],
    url: 'https://dominiqueramirez.github.io/Transcript-Cleaner/',
    dateAdded: '2025-11-19',
    featured: true,
  },
  {
    id: 'example-artifact-1',
    name: 'Quick Calculator',
    description: 'A simple calculator for quick math operations. Perfect for budget calculations and metrics.',
    icon: '🧮',
    iconBg: 'from-green-500 to-emerald-600',
    category: 'Utilities',
    platform: 'Claude Artifact',
    designedFor: ['Everyone'],
    url: '#',
    dateAdded: '2025-12-01',
    featured: false,
  },
  {
    id: 'example-artifact-2',
    name: 'Meeting Notes Formatter',
    description: 'Format and organize meeting notes with automatic headings, action items, and attendee lists.',
    icon: '📋',
    iconBg: 'from-purple-500 to-purple-600',
    category: 'Productivity',
    platform: 'Claude Artifact',
    designedFor: ['Julia', 'Phil'],
    url: '#',
    dateAdded: '2025-12-03',
    featured: false,
  },
  {
    id: 'example-github-1',
    name: 'Data Visualizer',
    description: 'Upload CSV files and generate beautiful charts and graphs for presentations and reports.',
    icon: '📊',
    iconBg: 'from-orange-500 to-red-500',
    category: 'Data',
    platform: 'VS Code/GitHub',
    designedFor: ['Analytics Team'],
    url: '#',
    dateAdded: '2025-11-25',
    featured: true,
  },
  {
    id: 'example-slack-1',
    name: 'Status Bot',
    description: 'Slack workflow for quick status updates and team check-ins.',
    icon: '🤖',
    iconBg: 'from-pink-500 to-rose-500',
    category: 'Communication',
    platform: 'Slack',
    designedFor: ['Everyone'],
    url: '#',
    dateAdded: '2025-11-20',
    featured: false,
  },
];

// Categories with icons and colors
export const categories = [
  { id: 'all', name: 'All Apps', icon: '🏠' },
  { id: 'Productivity', name: 'Productivity', icon: '⚡' },
  { id: 'Media', name: 'Media', icon: '🎬' },
  { id: 'Data', name: 'Data', icon: '📊' },
  { id: 'Communication', name: 'Communication', icon: '💬' },
  { id: 'Utilities', name: 'Utilities', icon: '🔧' },
  { id: 'Documentation', name: 'Documentation', icon: '📚' },
];

// Platforms with badges
export const platforms = [
  { id: 'all', name: 'All Platforms', color: 'bg-gray-100 text-gray-800' },
  { id: 'Claude Artifact', name: 'Claude Artifact', color: 'bg-orange-100 text-orange-800' },
  { id: 'VS Code/GitHub', name: 'VS Code/GitHub', color: 'bg-blue-100 text-blue-800' },
  { id: 'Slack', name: 'Slack', color: 'bg-purple-100 text-purple-800' },
];

// Extract unique team members from apps
export const getTeamMembers = () => {
  const members = new Set();
  apps.forEach(app => {
    app.designedFor.forEach(person => members.add(person));
  });
  return ['Everyone', ...Array.from(members).filter(m => m !== 'Everyone').sort()];
};
