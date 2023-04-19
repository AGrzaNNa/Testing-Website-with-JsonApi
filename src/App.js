import './App.css';
import { useState } from 'react';
import Header from './Header';
import SearchResults from './SearchResults';
import { handleSearch } from './handleSearch';
import {handleComment} from "./handleComment";

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        handleSearch(searchTerm, setPosts, setSearchTerm);
    };

    const handleCommentClick = (postId) => {
        handleComment(postId, posts, setPosts);
    };

    return (
        <body className={"App-body"}>
        <div className="App">
            <Header searchTerm={searchTerm} handleSearchChange={handleSearchChange} handleSearchClick={handleSearchClick}/>
            <div className={"resaults"}>
                <SearchResults className={"container"} posts={posts} handleCommentClick={handleCommentClick} />
            </div>
        </div>
        </body>
    );
}
export default App;
