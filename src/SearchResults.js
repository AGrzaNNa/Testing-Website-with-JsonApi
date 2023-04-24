import { useState } from "react";

function SearchResults({ posts = [], albums = [], handleCommentClick, handlePhotoClick }) {
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
            {albums.map((album) => (
                <div key={album.id}>
                    <h2>{album.title}</h2>
                    <p>Author: {album.author}</p>
                    <button className="showcomments" onClick={() => handlePhotoClick(album.id)}>
                        {album.photosShown ? 'Hide Photos' : 'Show Photos'}
                    </button>
                    <br />
                    {album.photosShown && album.photos && (
                        <ul>
                            {album.photos && album.photos.map((photo) => (
                                <li key={photo.id}>
                                    <img src={photo.thumbnailUrl} alt={photo.title} />
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
