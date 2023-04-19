export const handleComment = (postId, posts, setPosts) => {
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
}
