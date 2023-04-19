import React from 'react';

function Header(props) {
    const { searchTerm, handleSearchChange, handleKeyDown } = props;

    return (
        <header>
            <h2 className="App-Logo">
                ByteBusters
            </h2>
            <div className="search-box">
                <div className="search-icon">
                    <i className="fas fa-search"></i>
                </div>
                <input type="text" className="search-bar-input" placeholder="Search" value={searchTerm} onChange={handleSearchChange} onKeyDown={handleKeyDown} />
            </div>
            <div>
                <button className="ten">10</button>
                <button className="ten_more">10-15</button>
                <button className="twenty">20</button>
            </div>
            <nav className="App-navi">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Options</a>
                <button className="btnlogin">Login</button>
            </nav>
        </header>
    );
}

export default Header;
