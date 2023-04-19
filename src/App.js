import './App.css';
import { useState } from "react";
import Header from './Header';
import SearchResults from "./SearchResults";

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    }

    const handleSearchClick = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                const matchingPosts = data.filter((post) =>
                    post.title.toLowerCase().startsWith(searchTerm.toLowerCase())
                );
                Promise.all(
                    matchingPosts.map((post) =>
                        fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                            .then((response) => response.json())
                            .then((user) => {
                                post.name = user.name;
                                post.puste = "\n";
                                return post;
                            })
                    )
                ).then((postsWithUserData) => {
                    setPosts(postsWithUserData);
                    setSearchTerm('');
                });
            });
    };

    const handleCommentClick = (postId) => {
        const postIndex = posts.findIndex((post) => post.id === postId);
        const post = posts[postIndex];
        if (post.commentsShown) {
            post.commentsShown = false;
            setPosts([...posts]);
        } else {
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
                .then((response) => response.json())
                .then((data) => {
                    post.commentsShown = true;
                    post.comments = data;
                    setPosts([...posts]);
                });
        }
    };
    return (

        <body>
        <div className="App">
            <Header
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleKeyDown={handleKeyDown}
                handleSearchClick={handleSearchClick}
            />
            <SearchResults posts={posts} handleCommentClick={handleCommentClick} />
        </div>
        </body>
    );
}

export default App;
