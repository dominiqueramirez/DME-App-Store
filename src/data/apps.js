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
 *   team: 'DME' | 'Other Team Name',
 *   designedFor: ['Person1', 'Person2'] or ['Everyone'],
 *   url: 'https://link-to-app',
 *   dateAdded: '2025-12-05',
 *   featured: false,
 *   // Optional: for apps with updates
 *   updates: [
 *     {
 *       version: '1.1',
 *       date: '2025-12-08',
 *       notes: 'Description of what changed in this update.',
 *     }
 *   ],
 *   // Optional: version history for previous versions
 *   versionHistory: [
 *     {
 *       version: '1.0',
 *       url: 'https://link-to-previous-version',
 *       notes: 'What this version had before it was replaced.',
 *     }
 *   ],
 * }
 */

export const apps = [
  {
    id: 'timecode-to-srt',
    name: 'Timecode to SRT Converter',
    description: 'Convert transcripts with HH;MM;SS;FF timecodes to standard SRT subtitle format.',
    icon: '⏱️',
    iconBg: 'from-blue-500 to-blue-600',
    category: 'Media',
    platform: 'Claude Artifact',
    team: 'DME',
    designedFor: ['Pablo'],
    url: 'https://claude.ai/public/artifacts/5ca5ea71-8f4c-4355-8591-d4bcc596507e',
    dateAdded: '2025-12-05',
    featured: false,
  },
  {
    id: 'secva-response-comment',
    name: 'SECVA Response Comment Generator',
    description: 'Converts Slack _dme_sec_response_picks List Exported CSV to copy/paste email.',
    icon: '📧',
    iconBg: 'from-purple-500 to-purple-600',
    category: 'Communication',
    platform: 'Claude Artifact',
    team: 'DME',
    designedFor: ['Pablo'],
    url: 'https://claude.ai/public/artifacts/dd6dd119-90b5-4f8e-9a4d-12f749777fba',
    dateAdded: '2025-12-05',
    featured: false,
  },
  {
    id: 'secva-twitter-metrics',
    name: 'SECVA Weekly Twitter Metrics Report Generator',
    description: 'Takes exported SECVA Twitter/X account metrics from Hootsuite and converts them to a narrative email report to be sent every Monday morning.',
    icon: '📊',
    iconBg: 'from-sky-500 to-blue-600',
    category: 'Data',
    platform: 'VS Code/GitHub',
    team: 'DME',
    designedFor: ['Gary'],
    url: 'https://dominiqueramirez.github.io/weekly-social-media-report-generator/',
    dateAdded: '2025-12-05',
    featured: true,
    updates: [
      {
        version: '1.2',
        date: '2025-12-08',
        notes: 'Now hosted on GitHub Pages, making it accessible on the VA network. Same great functionality with improved accessibility for all team members.',
      }
    ],
    versionHistory: [
      {
        version: '1.1',
        url: 'https://claude.ai/public/artifacts/ff097a64-c99d-4f3a-8278-f164ba3873b4',
        notes: 'Added zip file upload support - automatically unzips and identifies CSV files.',
      },
      {
        version: '1.0',
        url: 'https://claude.ai/public/artifacts/f814092b-9117-49f3-93c0-6d6a7775d904',
        notes: 'Original release - requires individual CSV file uploads.',
      }
    ],
  },
  {
    id: 'csv-text-extractor-claude',
    name: 'CSV Text Extractor',
    description: 'Takes a CSV with Speaker Name / Start Time / End Time / Text fields, and extracts the contents of the text fields and makes them copyable.',
    icon: '📋',
    iconBg: 'from-green-500 to-emerald-600',
    category: 'Data',
    platform: 'Claude Artifact',
    team: 'DME',
    designedFor: ['Chris'],
    url: 'https://claude.ai/public/artifacts/0d333eba-7a5e-4f1e-98db-644d51924ad0',
    dateAdded: '2025-12-05',
    featured: false,
  },
  {
    id: 'csv-text-extractor-vscode',
    name: 'CSV Text Extractor',
    description: 'Takes a CSV with Speaker Name / Start Time / End Time / Text fields, and extracts the contents of the text fields. Reachable on VA network.',
    icon: '📋',
    iconBg: 'from-green-500 to-emerald-600',
    category: 'Data',
    platform: 'VS Code/GitHub',
    team: 'DME',
    designedFor: ['Chris'],
    url: 'https://dominiqueramirez.github.io/csv-text-extractor/',
    dateAdded: '2025-12-05',
    featured: false,
  },
  {
    id: 'sbv-to-srt',
    name: 'SBV to SRT Converter',
    description: 'Takes an SBV file and turns it into an SRT format.',
    icon: '🔄',
    iconBg: 'from-orange-500 to-red-500',
    category: 'Media',
    platform: 'VS Code/GitHub',
    team: 'DME',
    designedFor: ['Chris'],
    url: 'https://dominiqueramirez.github.io/sbv-to-srt/',
    dateAdded: '2025-12-05',
    featured: false,
  },
  {
    id: 'sm-selector-tool',
    name: 'SM Selector Tool',
    description: 'Takes exported HS Analytics ZIP file report and breaks out list of top engagement tweets for selection. Each tweet is added to an email preview that can be copied to clipboard.',
    icon: '🐦',
    iconBg: 'from-sky-400 to-blue-500',
    category: 'Data',
    platform: 'Claude Artifact',
    team: 'DME',
    designedFor: ['Gary'],
    url: 'https://claude.ai/public/artifacts/49f19f3c-cc01-40df-be8f-e49766b189da',
    dateAdded: '2025-12-05',
    featured: false,
  },
  {
    id: 'subtitle-text-chunker',
    name: 'Subtitle Text Chunker',
    description: 'Takes transcript text without timecodes and converts to SRT. Has controls for voice speed and fine tuning. Breaks text into customizable chunks (default 100 chars). Exports SRT file.',
    icon: '✂️',
    iconBg: 'from-violet-500 to-purple-600',
    category: 'Media',
    platform: 'Claude Artifact',
    team: 'DME',
    designedFor: ['Dom'],
    url: 'https://claude.ai/public/artifacts/70c21ede-2d7d-4146-8a8b-530dfeccc7b1',
    dateAdded: '2025-12-05',
    featured: true,
  },
  {
    id: 'wordpress-safelinks-remover',
    name: 'WordPress Safelinks Remover',
    description: 'Takes HTML content from WordPress Code Editor and scans it for Microsoft Safelinks. Parses and removes Safelinks rendering normal links. Options to copy individual hyperlinks or clean the entire post.',
    icon: '🔗',
    iconBg: 'from-blue-600 to-indigo-600',
    category: 'Utilities',
    platform: 'Claude Artifact',
    team: 'DME',
    designedFor: ['Jason'],
    url: 'https://claude.ai/public/artifacts/022c7bc4-32ce-4c5c-88fe-12ca894d97a9',
    dateAdded: '2025-12-05',
    featured: false,
  },
  {
    id: 'custom-qr-code',
    name: 'Custom QR Code Generator',
    description: 'Allows input of 3 custom colors to create a scannable QR code that can be added to graphics. Download size options range from 400x400 to 2000x2000.',
    icon: '📱',
    iconBg: 'from-pink-500 to-rose-500',
    category: 'Utilities',
    platform: 'Claude Artifact',
    team: 'DME',
    designedFor: ['Everyone'],
    url: 'https://claude.ai/public/artifacts/1b285c3c-ab0d-496b-97fa-997855de6bec',
    dateAdded: '2025-12-05',
    featured: true,
  },
  {
    id: 'transcript-cleaner',
    name: 'Transcript Cleaner',
    description: 'Takes a transcript file exported from Adobe Premiere and applies common fixes (mostly capitalizations) to the transcript files automatically.',
    icon: '📝',
    iconBg: 'from-teal-500 to-cyan-600',
    category: 'Media',
    platform: 'VS Code/GitHub',
    team: 'DME',
    designedFor: ['Chris'],
    url: 'https://dominiqueramirez.github.io/Transcript-Cleaner/',
    dateAdded: '2025-11-19',
    featured: true,
  },
  {
    id: 'instagram-reels-metrics',
    name: 'Instagram Reels Metrics Tracker',
    description: 'Converts screenshots of the Instagram Reels page into data tables with full metrics. Paste screenshots, cross out unwanted reels, and it extracts all view metrics using AI.',
    icon: '📸',
    iconBg: 'from-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
    category: 'Data',
    platform: 'Claude Artifact',
    team: 'DME',
    designedFor: ['Chris'],
    url: 'https://claude.ai/public/artifacts/ba0d32d2-ba04-4e81-b40d-0adb568b6392',
    dateAdded: '2025-12-05',
    featured: true,
  },
];

// Teams
export const teams = [
  { id: 'all', name: 'All Teams' },
  { id: 'DME', name: 'DME' },
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
];

// Extract unique team members from apps
export const getTeamMembers = () => {
  const members = new Set();
  apps.forEach(app => {
    app.designedFor.forEach(person => members.add(person));
  });
  return ['Everyone', ...Array.from(members).filter(m => m !== 'Everyone').sort()];
};
