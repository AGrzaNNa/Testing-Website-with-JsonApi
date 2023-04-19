import React from 'react';
import SearchBar from "./SearchBar";

function Header(props) {
    return (
        <header>
            <h2 className="App-Logo">
                ByteBusters
            </h2>

            <SearchBar
                searchTerm={props.searchTerm}
                handleSearchChange={props.handleSearchChange}
                handleSearchClick={props.handleSearchClick}
            />
            <nav className="App-navi">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Options</a>
                <button className="btnlogin">Login</button>
            </nav>
        </header>
    );
}

export default Header;
