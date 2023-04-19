export const handleSearch = (searchTerm, setPosts, setSearchTerm) => {
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
                            post.commentsShown = false;
                            return post;
                        })
                )
            ).then((postsWithUserData) => {
                setPosts(postsWithUserData);
                setSearchTerm('');
            });
        });
};
