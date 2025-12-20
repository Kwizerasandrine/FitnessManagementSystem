import React, { useState } from 'react';
import './TableSearch.css';

const TableSearch = ({ columns, onSearch, onClear }) => {
    const [searchColumn, setSearchColumn] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        if (searchColumn && searchValue) {
            onSearch(searchColumn, searchValue);
        }
    };

    const handleClear = () => {
        setSearchColumn('');
        setSearchValue('');
        if (onClear) {
            onClear();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="table-search">
            <div className="search-fields">
                <select
                    value={searchColumn}
                    onChange={(e) => setSearchColumn(e.target.value)}
                    className="search-column-select"
                >
                    <option value="">Select column to search...</option>
                    {columns.map(col => (
                        <option key={col.key} value={col.key}>{col.label}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Enter search value..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="search-input"
                    disabled={!searchColumn}
                />

                <button
                    onClick={handleSearch}
                    className="search-btn"
                    disabled={!searchColumn || !searchValue}
                >
                    🔍 Search
                </button>

                <button
                    onClick={handleClear}
                    className="clear-btn"
                >
                    ✖ Clear
                </button>
            </div>
        </div>
    );
};

export default TableSearch;
