'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
    Search,
    Filter,
    X,
    ChevronDown,
    SlidersHorizontal,
    BookOpen,
    Clock,
    DollarSign
} from 'lucide-react';

interface FilterState {
    search: string;
    category: string;
    level: string;
    priceRange: string;
    duration: string;
    isFree: boolean;
    tags: string[];
}

interface CourseSearchFiltersProps {
    onFiltersChange: (filters: FilterState) => void;
    categories: string[];
    popularTags: string[];
    isLoading?: boolean;
    totalResults?: number;
}

export const CourseSearchFilters: React.FC<CourseSearchFiltersProps> = ({
    onFiltersChange,
    categories,
    popularTags,
    isLoading = false,
    totalResults = 0
}) => {
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        category: '',
        level: '',
        priceRange: '',
        duration: '',
        isFree: false,
        tags: []
    });

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const levels = [
        { value: '', label: 'All Levels' },
        { value: 'BEGINNER', label: 'Beginner' },
        { value: 'INTERMEDIATE', label: 'Intermediate' },
        { value: 'ADVANCED', label: 'Advanced' },
        { value: 'EXPERT', label: 'Expert' },
    ];

    const priceRanges = [
        { value: '', label: 'Any Price' },
        { value: 'free', label: 'Free' },
        { value: '0-50', label: '$0 - $50' },
        { value: '50-100', label: '$50 - $100' },
        { value: '100-200', label: '$100 - $200' },
        { value: '200+', label: '$200+' },
    ];

    const durations = [
        { value: '', label: 'Any Duration' },
        { value: '0-5', label: '0-5 hours' },
        { value: '5-10', label: '5-10 hours' },
        { value: '10-20', label: '10-20 hours' },
        { value: '20+', label: '20+ hours' },
    ];

    const handleFilterChange = useCallback((key: keyof FilterState, value: any) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    }, [filters, onFiltersChange]);

    const handleSearch = useCallback(() => {
        handleFilterChange('search', searchValue);
    }, [searchValue, handleFilterChange]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const addTag = (tag: string) => {
        if (!filters.tags.includes(tag)) {
            handleFilterChange('tags', [...filters.tags, tag]);
        }
    };

    const removeTag = (tagToRemove: string) => {
        handleFilterChange('tags', filters.tags.filter(tag => tag !== tagToRemove));
    };

    const clearAllFilters = () => {
        const clearedFilters: FilterState = {
            search: '',
            category: '',
            level: '',
            priceRange: '',
            duration: '',
            isFree: false,
            tags: []
        };
        setFilters(clearedFilters);
        setSearchValue('');
        onFiltersChange(clearedFilters);
    };

    const hasActiveFilters = filters.search || filters.category || filters.level ||
        filters.priceRange || filters.duration || filters.isFree || filters.tags.length > 0;

    return (
        <div className="space-y-6">
            {/* Main Search Bar */}
            <div className="relative">
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Search courses..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="pl-10 pr-4 py-3 text-lg"
                        />
                    </div>
                    <Button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="px-6"
                    >
                        Search
                    </Button>
                </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Quick Filters:</span>
                </div>

                <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.level}
                    onChange={(e) => handleFilterChange('level', e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
                >
                    {levels.map((level) => (
                        <option key={level.value} value={level.value}>
                            {level.label}
                        </option>
                    ))}
                </select>

                <button
                    onClick={() => handleFilterChange('isFree', !filters.isFree)}
                    className={`px-3 py-1 rounded-md text-sm border transition-colors ${filters.isFree
                            ? 'bg-blue-100 border-blue-300 text-blue-800'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Free Only
                </button>

                <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                    <SlidersHorizontal className="w-4 h-4 mr-1" />
                    More Filters
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''
                        }`} />
                </button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price Range
                            </label>
                            <select
                                value={filters.priceRange}
                                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                            >
                                {priceRanges.map((range) => (
                                    <option key={range.value} value={range.value}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration
                            </label>
                            <select
                                value={filters.duration}
                                onChange={(e) => handleFilterChange('duration', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                            >
                                {durations.map((duration) => (
                                    <option key={duration.value} value={duration.value}>
                                        {duration.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Popular Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Popular Topics
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {popularTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => addTag(tag)}
                                    disabled={filters.tags.includes(tag)}
                                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${filters.tags.includes(tag)
                                            ? 'bg-blue-100 border-blue-300 text-blue-800 cursor-not-allowed'
                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Active Filters */}
            {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Active Filters:</span>

                    {filters.search && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Search: "{filters.search}"
                            <button onClick={() => handleFilterChange('search', '')}>
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    )}

                    {filters.category && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            {filters.category}
                            <button onClick={() => handleFilterChange('category', '')}>
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    )}

                    {filters.level && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            {levels.find(l => l.value === filters.level)?.label}
                            <button onClick={() => handleFilterChange('level', '')}>
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    )}

                    {filters.isFree && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            Free Only
                            <button onClick={() => handleFilterChange('isFree', false)}>
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    )}

                    {filters.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <button onClick={() => removeTag(tag)}>
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-xs"
                    >
                        Clear All
                    </Button>
                </div>
            )}

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>
                        {isLoading ? 'Searching...' : `${totalResults} courses found`}
                    </span>
                </div>

                {hasActiveFilters && (
                    <span className="text-blue-600">
                        Filtered results
                    </span>
                )}
            </div>
        </div>
    );
};

export default CourseSearchFilters;
