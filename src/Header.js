import React, { useState } from 'react';
import searchResults from "./SearchResults";

function Header(props) {
    const { searchTerm, handleSearchChange, handleKeyDown, handleSearchClick, handleNumberOfPostsChange, numberOfPosts, handleMainSideClick, to, from } = props;
    const [numberInput, setNumberInput] = useState(numberOfPosts);
    const [numberToInput, setNumberToInput] = useState(to);
    const [numberFromInput, setNumberFromInput] = useState(from);

    const handleNumberChange = (event) => {
        setNumberInput(event.target.value);
    };

    const handleNumberInputBlur = () => {
        handleNumberOfPostsChange(parseInt(numberInput));
    };


    const handleMainSideClick1 = () =>  {
        handleMainSideClick()
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
                <input type="number" className="number-input" placeholder="Number" value={numberInput}  onBlur={handleNumberInputBlur} />
            </div>
            <div>
                <input type="number" className="number-input" placeholder="From"  value={numberFromInput} onBlur={handleNumberInputBlur} />
            </div>
            <div>
                <input type="number" className="number-input" placeholder="To"  value={numberToInput}  onBlur={handleNumberInputBlur} />
            </div>
            <div>
                <button className="btnmainside" onClick={handleMainSideClick1}>Main Side</button>
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
