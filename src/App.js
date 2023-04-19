import './App.css';
import {useState} from "react";

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
                                post.puste="\n";
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
        <body
            className="App-body">

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
        <div className="App">
            <div>
                <div>
                    <div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
                <div id="search-results">
                    {posts.map((post) => (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <p>Author: {post.name}</p>
                            <p>{post.body}</p>
                            <button className="showcomments" onClick={() => handleCommentClick(post.id)}>
                                {post.commentsShown ? 'Hide Comments' : 'Show Comments'}
                            </button>
                            <br />
                            {post.commentsShown && (
                                <ul>
                                    {post.comments.map((comment) => (
                                        <li key={comment.id}>
                                            <p>Author: {comment.email}</p>
                                            <p>{comment.body}</p>
                                            <br />
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <br />
                        </div>
                    ))}
                </div>

            </div>
        </div>
        </body>
    );
}

export default App;