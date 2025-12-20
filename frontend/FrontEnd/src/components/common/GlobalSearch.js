import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './GlobalSearch.css';

const GlobalSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef(null);
    const history = useHistory();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Perform search when query changes
    useEffect(() => {
        if (query.length > 2) {
            performSearch(query);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query]);

    const performSearch = async (searchQuery) => {
        setLoading(true);
        try {
            // TODO: Implement actual global search API call
            // For now, using mock data
            const mockResults = [
                { id: 1, type: 'Member', name: `User matching "${searchQuery}"`, path: '/members/1' },
                { id: 2, type: 'Plan', name: `Plan matching "${searchQuery}"`, path: '/plans/2' },
                { id: 3, type: 'Trainer', name: `Trainer matching "${searchQuery}"`, path: '/trainers/3' }
            ];

            setResults(mockResults);
            setIsOpen(true);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const navigateToResult = (result) => {
        history.push(result.path);
        setIsOpen(false);
        setQuery('');
    };

    const getTypeIcon = (type) => {
        const icons = {
            'Member': '👤',
            'Plan': '📋',
            'Trainer': '🏋️',
            'Inventory': '📦',
            'Feedback': '💬',
            'Diet': '🥗',
            'Location': '📍'
        };
        return icons[type] || '📄';
    };

    return (
        <div className="global-search" ref={searchRef}>
            <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search members, plans, trainers..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 2 && setIsOpen(true)}
                    className="global-search-input"
                />
                {loading && <span className="search-loading">⏳</span>}
            </div>

            {isOpen && results.length > 0 && (
                <div className="search-results">
                    <div className="results-header">
                        Found {results.length} result{results.length !== 1 ? 's' : ''}
                    </div>
                    {results.map(result => (
                        <div
                            key={`${result.type}-${result.id}`}
                            className="search-result-item"
                            onClick={() => navigateToResult(result)}
                        >
                            <span className="result-icon">{getTypeIcon(result.type)}</span>
                            <div className="result-content">
                                <span className="result-type">{result.type}</span>
                                <span className="result-name">{result.name}</span>
                            </div>
                            <span className="result-arrow">→</span>
                        </div>
                    ))}
                </div>
            )}

            {isOpen && query.length > 2 && results.length === 0 && !loading && (
                <div className="search-results">
                    <div className="no-results">No results found for "{query}"</div>
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;
