import { useState } from "react";

function SearchResults({ posts = [], handleCommentClick }) {
    return (
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
                    {post.commentsShown && post.comments && (
                        <ul>
                            {post.comments && post.comments.map((comment) => (
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
    );
}

export default SearchResults;