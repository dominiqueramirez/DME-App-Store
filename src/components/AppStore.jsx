import React, { useState, useMemo } from 'react';
import { Search, Filter, ExternalLink, X, ChevronDown, Sparkles, Grid3X3, User, Users } from 'lucide-react';
import { apps, categories, platforms, teams, getTeamMembers } from '../data/apps';

const AppStore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedPerson, setSelectedPerson] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
            <div className="flex-1 max-w-xl mx-8">
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
                <FeaturedAppCard key={app.id} app={app} getPlatformColor={getPlatformColor} />
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
                <AppCard key={app.id} app={app} getPlatformColor={getPlatformColor} />
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
    </div>
  );
};

// Featured App Card Component
const FeaturedAppCard = ({ app, getPlatformColor }) => {
  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 flex gap-5"
    >
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
    </a>
  );
};

// Regular App Card Component
const AppCard = ({ app, getPlatformColor }) => {
  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-3">
        {/* Icon */}
        <div className={`w-14 h-14 bg-gradient-to-br ${app.iconBg} rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform flex-shrink-0`}>
          {app.icon}
        </div>

        {/* Title & Platform */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
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
    </a>
  );
};

export default AppStore;
