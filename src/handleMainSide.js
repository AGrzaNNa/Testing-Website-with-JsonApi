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
            var la = parseInt(numberOfPosts / 2);
            if (numberOfPosts % 2 === 0) {
                lp = parseInt(numberOfPosts / 2);
            } else {
                lp = parseInt(numberOfPosts / 2) + 1;
            }

            const combinedResults = [];
            let i = 0;
            let j = 0;
            while (i < lp && j < la) {
                if (Math.random() < 0.5) {
                    combinedResults.push({ type: 'post', ...posts[i++] });
                } else {
                    combinedResults.push({ type: 'album', ...albums[j++] });
                }
            }
            while (i < lp) {
                combinedResults.push({ type: 'post', ...posts[i++] });
            }
            while (j < la) {
                combinedResults.push({ type: 'album', ...albums[j++] });
            }

            setPosts(combinedResults.filter((r) => r.type === 'post'));
            setAlbums(combinedResults.filter((r) => r.type === 'album'));
        });
};


export default handleMainSide;
