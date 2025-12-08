import React, { useState, useMemo } from 'react';
import { Search, Filter, ExternalLink, X, ChevronDown, Sparkles, Grid3X3, User, Users, Calendar, RefreshCw, History } from 'lucide-react';
import { apps, categories, platforms, teams, getTeamMembers } from '../data/apps';

const AppStore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedPerson, setSelectedPerson] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const teamMembers = useMemo(() => getTeamMembers(), []);

  // Filter apps based on search and filters
  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        app.name.toLowerCase().includes(searchLower) ||
        app.description.toLowerCase().includes(searchLower);

      // Category filter
      const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;

      // Platform filter
      const matchesPlatform = selectedPlatform === 'all' || app.platform === selectedPlatform;

      // Team filter
      const matchesTeam = selectedTeam === 'all' || app.team === selectedTeam;

      // Person filter
      const matchesPerson = selectedPerson === 'all' || 
        app.designedFor.includes(selectedPerson) ||
        app.designedFor.includes('Everyone');

      return matchesSearch && matchesCategory && matchesPlatform && matchesTeam && matchesPerson;
    });
  }, [searchQuery, selectedCategory, selectedPlatform, selectedPerson]);

  // Featured apps
  const featuredApps = useMemo(() => apps.filter(app => app.featured), []);

  // Get platform badge color
  const getPlatformColor = (platformName) => {
    const platform = platforms.find(p => p.id === platformName);
    return platform ? platform.color : 'bg-gray-100 text-gray-800';
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedTeam('all');
    setSelectedPerson('all');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedTeam !== 'all' || selectedPerson !== 'all';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Grid3X3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DME App Store</h1>
                <p className="text-xs text-gray-500">Digital Media Tools</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-full sm:flex-1 sm:max-w-xl sm:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-white rounded-full"></span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="pb-4 pt-2 border-t border-gray-100 mt-2">
              <div className="flex flex-wrap items-center gap-4">
                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Category:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-100 border-0 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Platform Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Platform:</span>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="bg-gray-100 border-0 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {platforms.map(plat => (
                      <option key={plat.id} value={plat.id}>{plat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Team Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Team:</span>
                  <select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="bg-gray-100 border-0 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>

                {/* Person Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Designed for:</span>
                  <select
                    value={selectedPerson}
                    onChange={(e) => setSelectedPerson(e.target.value)}
                    className="bg-gray-100 border-0 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Team Members</option>
                    {teamMembers.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Section - only show when no filters active */}
        {!hasActiveFilters && featuredApps.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Featured</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredApps.map(app => (
                <FeaturedAppCard 
                  key={app.id} 
                  app={app} 
                  getPlatformColor={getPlatformColor}
                  onClick={() => setSelectedApp(app)}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Apps Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {hasActiveFilters ? 'Results' : 'All Apps'}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredApps.length} {filteredApps.length === 1 ? 'app' : 'apps'}
            </span>
          </div>

          {filteredApps.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No apps found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApps.map(app => (
                <AppCard 
                  key={app.id} 
                  app={app} 
                  getPlatformColor={getPlatformColor}
                  onClick={() => setSelectedApp(app)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>DME App Store • Digital Media Tools Collection</p>
            <p className="mt-2 text-xs">App Store Developed by Dominique Ramirez</p>
          </div>
        </div>
      </footer>

      {/* App Detail Modal */}
      {selectedApp && (
        <AppDetailModal 
          app={selectedApp} 
          onClose={() => setSelectedApp(null)} 
          getPlatformColor={getPlatformColor}
        />
      )}
    </div>
  );
};

// Helper to check if an update is recent (within 90 days)
const isRecentUpdate = (updateDate) => {
  const update = new Date(updateDate);
  const now = new Date();
  const diffTime = now - update;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 90;
};

// Featured App Card Component
const FeaturedAppCard = ({ app, getPlatformColor, onClick }) => {
  const hasRecentUpdate = app.updates && app.updates.length > 0 && isRecentUpdate(app.updates[0].date);
  
  return (
    <div
      onClick={onClick}
      className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 flex gap-5 cursor-pointer relative"
    >
      {/* Update Badge */}
      {hasRecentUpdate && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
          <RefreshCw className="w-3 h-3" />
          Updated
        </div>
      )}
      
      {/* Icon */}
      <div className={`w-20 h-20 bg-gradient-to-br ${app.iconBg} rounded-2xl flex items-center justify-center text-4xl shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform`}>
        {app.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
              {app.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{app.description}</p>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 mt-1" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlatformColor(app.platform)}`}>
            {app.platform}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {app.category}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
            <Users className="w-3 h-3" />
            {app.team}
          </span>
          {app.designedFor[0] !== 'Everyone' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <User className="w-3 h-3" />
              {app.designedFor.join(', ')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Regular App Card Component
const AppCard = ({ app, getPlatformColor, onClick }) => {
  const hasRecentUpdate = app.updates && app.updates.length > 0 && isRecentUpdate(app.updates[0].date);
  
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 flex flex-col cursor-pointer relative"
    >
      {/* Update Badge */}
      {hasRecentUpdate && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
          <RefreshCw className="w-3 h-3" />
          Updated
        </div>
      )}
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-3">
        {/* Icon */}
        <div className={`w-14 h-14 bg-gradient-to-br ${app.iconBg} rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform flex-shrink-0`}>
          {app.icon}
        </div>

        {/* Title & Platform */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
            {app.name}
          </h3>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getPlatformColor(app.platform)}`}>
            {app.platform}
          </span>
        </div>

        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-3">
        {app.description}
      </p>

      {/* Footer Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          {app.category}
        </span>
        {app.designedFor[0] !== 'Everyone' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
            <User className="w-3 h-3" />
            {app.designedFor.length > 2 
              ? `${app.designedFor.slice(0, 2).join(', ')}...`
              : app.designedFor.join(', ')}
          </span>
        )}
      </div>
    </div>
  );
};

// App Detail Modal Component
const AppDetailModal = ({ app, onClose, getPlatformColor }) => {
  const hasUpdates = app.updates && app.updates.length > 0;
  const latestUpdate = hasUpdates ? app.updates[0] : null;
  const hasRecentUpdate = hasUpdates && isRecentUpdate(latestUpdate.date);
  
  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <div className="flex gap-5">
          {/* Icon */}
          <div className={`w-24 h-24 bg-gradient-to-br ${app.iconBg} rounded-2xl flex items-center justify-center text-5xl shadow-lg flex-shrink-0 relative`}>
            {app.icon}
            {hasRecentUpdate && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <RefreshCw className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Title & Basic Info */}
          <div className="flex-1 min-w-0 pt-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {app.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPlatformColor(app.platform)}`}>
                {app.platform}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                {app.category}
              </span>
              {hasUpdates && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  <RefreshCw className="w-3 h-3" />
                  v{latestUpdate.version}
                </span>
              )}
            </div>
          </div>
          </div>
        </div>

        {/* Open App Button */}
        <div className="px-6 pb-4">
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/25"
          >
            <ExternalLink className="w-5 h-5" />
            Open App
          </a>
        </div>

        {/* What's New Section */}
        {hasUpdates && (
          <div className="px-6 pb-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw className="w-5 h-5 text-green-600" />
                <h3 className="text-sm font-semibold text-green-800 uppercase tracking-wide">What's New</h3>
                <span className="text-xs text-green-600 ml-auto">
                  {new Date(latestUpdate.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-green-800 text-sm leading-relaxed mb-3">
                {latestUpdate.notes}
              </p>
              {latestUpdate.previousUrl && (
                <a
                  href={latestUpdate.previousUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:text-green-900 font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  <History className="w-4 h-4" />
                  Use Previous Version
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="px-6 pb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">Description</h3>
          <p className="text-gray-600 leading-relaxed">
            {app.description}
          </p>
        </div>

        {/* Details */}
        <div className="px-6 pb-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Team */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Team</span>
              </div>
              <p className="text-gray-900 font-medium">{app.team}</p>
            </div>

            {/* Designed For */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <User className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Designed For</span>
              </div>
              <p className="text-gray-900 font-medium">{app.designedFor.join(', ')}</p>
            </div>

            {/* Date Added */}
            <div className="bg-gray-50 rounded-xl p-4 col-span-2">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Added</span>
              </div>
              <p className="text-gray-900 font-medium">
                {new Date(app.dateAdded).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppStore;
