import React from 'react';

function Header() {
    return (
        <header>
            <h2 className="App-Logo">
                ByteBusters
            </h2>
            <nav className="App-navi">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Options</a>
                <button className="btnlogin">Login</button>
            </nav>
        </header>
    );
}

export default Header;
