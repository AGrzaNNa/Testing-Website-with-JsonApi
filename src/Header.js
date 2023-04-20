import React, { useState } from 'react';

function Header(props) {
    const { searchTerm, handleSearchChange, handleKeyDown, handleSearchClick, handleNumberOfPostsChange, numberOfPosts } = props;
    const [numberInput, setNumberInput] = useState(numberOfPosts);

    const handleNumberChange = (event) => {
        setNumberInput(event.target.value);
    };

    const handleNumberInputBlur = () => {
        handleNumberOfPostsChange(parseInt(numberInput));
    };

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
                <input type="number" className="number-input" placeholder="Number" onKeyDown={handleKeyDown} value={numberInput} onChange={handleNumberChange} onBlur={handleNumberInputBlur} />
            </div>
            <nav className="App-navi">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Options</a>
                <button className="btnlogin" onClick={handleSearchClick}>Login</button>
            </nav>
        </header>
    );
}

export default Header;
