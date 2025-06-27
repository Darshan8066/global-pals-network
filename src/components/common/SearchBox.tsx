
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, MapPin, Users, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SearchBoxProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
  className?: string;
}

interface SearchFilters {
  location?: string;
  role?: string;
  interests?: string[];
}

const SearchBox = ({ onSearch, placeholder = "Search for people, locations, or interests...", className = "" }: SearchBoxProps) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    role: '',
    interests: []
  });

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query, filters);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const addInterest = (interest: string) => {
    if (interest.trim() && !filters.interests?.includes(interest.trim())) {
      setFilters(prev => ({
        ...prev,
        interests: [...(prev.interests || []), interest.trim()]
      }));
    }
  };

  const removeInterest = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests?.filter(i => i !== interest) || []
    }));
  };

  const clearAllFilters = () => {
    setFilters({ location: '', role: '', interests: [] });
  };

  const hasActiveFilters = filters.location || filters.role || (filters.interests && filters.interests.length > 0);

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Main Search Bar */}
      <Card className="glass-card border-0 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
              <Input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 rounded-lg text-base"
              />
            </div>
            
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className={`px-4 py-3 btn-outline ${showFilters ? 'bg-white/20' : ''} ${hasActiveFilters ? 'ring-2 ring-blue-400' : ''}`}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge className="ml-2 bg-blue-500 text-white text-xs px-2 py-1">
                  {(filters.location ? 1 : 0) + (filters.role ? 1 : 0) + (filters.interests?.length || 0)}
                </Badge>
              )}
            </Button>
            
            <Button
              onClick={handleSearch}
              className="px-6 py-3 btn-primary"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-white/80 text-sm font-medium">Active filters:</span>
              
              {filters.location && (
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-300/30">
                  <MapPin className="h-3 w-3 mr-1" />
                  {filters.location}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer hover:text-white" 
                    onClick={() => setFilters(prev => ({ ...prev, location: '' }))}
                  />
                </Badge>
              )}
              
              {filters.role && (
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-300/30">
                  <Users className="h-3 w-3 mr-1" />
                  {filters.role}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer hover:text-white" 
                    onClick={() => setFilters(prev => ({ ...prev, role: '' }))}
                  />
                </Badge>
              )}
              
              {filters.interests?.map((interest, index) => (
                <Badge key={index} variant="secondary" className="bg-green-500/20 text-green-200 border-green-300/30">
                  {interest}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer hover:text-white" 
                    onClick={() => removeInterest(interest)}
                  />
                </Badge>
              ))}
              
              <Button
                onClick={clearAllFilters}
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card className="glass-card border-0 shadow-xl mt-4 animate-fade-in">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Location Filter */}
              <div className="form-field">
                <label className="form-label">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </label>
                <Input
                  type="text"
                  placeholder="City, Country"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="form-input"
                />
              </div>

              {/* Role Filter */}
              <div className="form-field">
                <label className="form-label">
                  <Users className="h-4 w-4 mr-2" />
                  Role
                </label>
                <select
                  value={filters.role}
                  onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                  className="form-select"
                >
                  <option value="">All roles</option>
                  <option value="student">🎓 Student</option>
                  <option value="artist">🎨 Artist</option>
                  <option value="businessperson">💼 Businessperson</option>
                </select>
              </div>

              {/* Interests Filter */}
              <div className="form-field">
                <label className="form-label">
                  <Search className="h-4 w-4 mr-2" />
                  Add Interest
                </label>
                <Input
                  type="text"
                  placeholder="Technology, Travel, etc."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const target = e.target as HTMLInputElement;
                      addInterest(target.value);
                      target.value = '';
                    }
                  }}
                  className="form-input"
                />
                <p className="text-white/60 text-xs mt-1">Press Enter to add</p>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
              <div className="text-white/60 text-sm">
                Use filters to find exactly who you're looking for
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={clearAllFilters}
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white"
                >
                  Clear All
                </Button>
                <Button
                  onClick={() => setShowFilters(false)}
                  size="sm"
                  className="btn-outline"
                >
                  Done
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBox;
