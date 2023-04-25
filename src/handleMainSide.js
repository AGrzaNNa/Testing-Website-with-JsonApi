const handleMainSide = (setPosts, numberOfPosts, setAlbums) => {
    Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/albums'),
        fetch('https://jsonplaceholder.typicode.com/users')
    ])
        .then((responses) => Promise.all(responses.map((response) => response.json())))
        .then((data) => {
            const [posts, albums, users] = data;

            var lp;
            var la=parseInt(numberOfPosts/2);
            if(numberOfPosts%2===0){
                lp=parseInt(numberOfPosts/2);
            }
            else{
                lp=parseInt(numberOfPosts/2+1);
            }
            const randomIndexes = [];
            while (randomIndexes.length < lp) {
                const randomIndex = Math.floor(Math.random() * posts.length);
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex);
                }
            }
            const randomPosts = randomIndexes.map((index) => {
                const post = posts[index];
                const user = users.find((u) => u.id === post.userId);
                post.name=user.name;
                return { ...post, user };
            });
            setPosts(randomPosts);

            const randomAlbumIndexes = [];
            while (randomAlbumIndexes.length < la) {
                const randomAlbumIndex = Math.floor(Math.random() * albums.length);
                if (!randomAlbumIndexes.includes(randomAlbumIndex)) {
                    randomAlbumIndexes.push(randomAlbumIndex);
                }
            }

            const randomAlbums = randomAlbumIndexes.map((index) => {
                const album = albums[index];
                const user = users.find((u) => u.id === album.userId);
                album.author=user.name;
                return { ...album, user };
            });
            setAlbums(randomAlbums);
        });
};

export default handleMainSide;
