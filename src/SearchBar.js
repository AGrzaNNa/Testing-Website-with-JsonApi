import React from 'react';

function SearchBar({ searchTerm, handleSearchChange, handleSearchClick }) {
    return (
        <div className={"container"}>
            <input type="text" className={"search-bar"}  placeholder="search anything" value={searchTerm} onChange={handleSearchChange} />
            <button className={"search-bar-input"}  onClick={handleSearchClick}>
                Search
            </button>
        </div>
    );
}

export default SearchBar;
