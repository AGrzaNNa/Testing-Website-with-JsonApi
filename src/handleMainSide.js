const handleMainSide = (setPosts, numberOfPosts) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            const randomIndexes = [];
            while (randomIndexes.length < numberOfPosts) {
                const randomIndex = Math.floor(Math.random() * data.length);
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex);
                }
            }

            const randomPosts = randomIndexes.map((index) => data[index]);
            setPosts(randomPosts);
        });
};

export default handleMainSide;
