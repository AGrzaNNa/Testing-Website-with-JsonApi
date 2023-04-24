import './App.css';
import { useState } from "react";
import Header from './Header';
import SearchResults from "./SearchResults";
import handleCommentClick from './handleComment';
import handlePhotoClick from "./handlePhotosClick";
import handleMainSide from "./handleMainSide";

function App() {

    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [numberOfPosts, setNumberOfPosts] = useState(5);

    const [numberFromInput, setNumberFromInput] = useState(10);
    const [numberToInput, setNumberToInput] = useState(50);


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleSearchClick = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                const matchingPosts = data.filter((post) =>
                    post.title.length >= numberFromInput && post.title.length <= numberToInput &&  post.title.toLowerCase().startsWith(searchTerm.toLowerCase())
                ).slice(0, numberOfPosts);

                Promise.all(
                    matchingPosts.map((post) =>
                        fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                            .then((response) => response.json())
                            .then((user) => {
                                post.name = user.name;
                                return post;
                            })
                    )
                ).then((postsWithUserData) => {
                    setPosts(postsWithUserData);
                    setSearchTerm('');
                });
            });
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then((response) => response.json())
            .then((data) => {
                const matchingAlbums = data.filter((album) =>
                    album.title.toLowerCase().startsWith(searchTerm.toLowerCase())
                ).slice(0, numberOfPosts);

                Promise.all(
                    matchingAlbums.map((album) =>
                        fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
                            .then((response) => response.json())
                            .then((user) => {
                                album.author = user.name;
                                return album;
                            })
                    )
                ).then((albumsWithUserData) => {
                    setAlbums(albumsWithUserData);
                    setSearchTerm('');
                });
            });
    };




    const handleNumberOfPostsChange = (number) => {
        setNumberOfPosts(number);
    };

    const handleNumberInputFromChange = (numberFrom) => {
        setNumberFromInput(numberFrom);
    };
    const handleNumberInputToChange = (numberTo) => {
        setNumberToInput(numberTo);
    };



    return (
        <body>
        <div className="App">
            <Header
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleKeyDown={handleKeyDown}
                handleSearchClick={handleSearchClick}
                handleNumberOfPostsChange={handleNumberOfPostsChange}
                handleMainSideClick={() => handleMainSide(setPosts,numberOfPosts, setAlbums)}
                numberOfPosts={numberOfPosts}
                handleFromChange={handleNumberInputFromChange}
                handleToChange={handleNumberInputToChange}
            />
            <br />
            <br />
            <br />
            <br />
            <div className={"App-body"}>
                <SearchResults posts={posts} albums={albums} handleCommentClick={(postId) => handleCommentClick(postId, posts, setPosts)} handlePhotoClick={(albumId) => handlePhotoClick(albumId, albums, setAlbums)}/>
            </div>
        </div>
        </body>
    );
}

export default App;
