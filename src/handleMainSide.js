const handleMainSide = (setPosts, numberOfPosts, setAlbums) => {
    Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/albums'),
        fetch('https://jsonplaceholder.typicode.com/users')
    ])
        .then((responses) => Promise.all(responses.map((response) => response.json())))
        .then((data) => {
            const [posts, albums, users] = data;

            const randomIndexes = [];
            while (randomIndexes.length < numberOfPosts) {
                const randomIndex = Math.floor(Math.random() * posts.length);
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex);
                }
            }
            const randomPosts = randomIndexes.map((index) => {
                const post = posts[index];
                const user = users.find((u) => u.id === post.userId);
                return { ...post, user };
            });
            setPosts(randomPosts);

            const randomAlbumIndexes = [];
            while (randomAlbumIndexes.length < numberOfPosts) {
                const randomAlbumIndex = Math.floor(Math.random() * albums.length);
                if (!randomAlbumIndexes.includes(randomAlbumIndex)) {
                    randomAlbumIndexes.push(randomAlbumIndex);
                }
            }

            const randomAlbums = randomAlbumIndexes.map((index) => {
                const album = albums[index];
                const user = users.find((u) => u.id === album.userId);
                return { ...album, user };
            });
            setAlbums(randomAlbums);
        });
};

export default handleMainSide;
