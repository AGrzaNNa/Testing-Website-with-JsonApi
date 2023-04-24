import React, { useState } from 'react';
import searchResults from "./SearchResults";

function Header(props) {
    const { searchTerm, handleSearchChange, handleKeyDown, handleSearchClick, handleNumberOfPostsChange, numberOfPosts, handleMainSideClick, handleFromChange, handleToChange, to, from } = props;

    const [numberInput, setNumberInput] = useState(numberOfPosts);

    const [numberToInput, setNumberToInput] = useState(to);
    const [numberFromInput, setNumberFromInput] = useState(from);

    const handleNumberToChange = (event) => {
        setNumberToInput(event.target.value);
    };

    const handleNumberInputToBlur = () => {
        handleToChange(parseInt(numberToInput));
    };

    const handleNumberChange = (event) => {
        setNumberInput(event.target.value);
    };

    const handleNumberInputBlur = () => {
        handleNumberOfPostsChange(parseInt(numberInput));
    };

    const handleNumberFromChange = (event) => {
        setNumberFromInput(event.target.value);
    };

    const handleNumberInputFromBlur = () => {
        handleFromChange(parseInt(numberFromInput));
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
                <input type="number" className="number-input" placeholder="Number" onChange={handleNumberChange} value={numberInput}  onBlur={handleNumberInputBlur} />
            </div>
            <div>
                <input type="number" className="number-input" placeholder="From" onChange={handleNumberFromChange}  value={numberFromInput} onBlur={handleNumberInputFromBlur} />
            </div>
            <div>
                <input type="number" className="number-input" placeholder="To" onChange={handleNumberToChange} value={numberToInput}  onBlur={handleNumberInputToBlur} />
            </div>
            <div>
                <button className="showcomments" onClick={handleMainSideClick1}>Main Side</button>
            </div>
            <nav className="App-navi">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Options</a>
            </nav>

        </header>
    );
}
export default Header;
