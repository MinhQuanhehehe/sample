import React from 'react'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { useDispatch } from 'react-redux';
import { removePost } from "./postSlice";

const PostExerpt = ({ post }) => {
    const dispatch = useDispatch();
    const handleDeletePost = (id) => {
        dispatch(removePost({ id }));
    };
    return (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p className="postCredit">
                <PostAuthor post={post} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButton post={post} />
            <button className="deleteButton" onClick={() => handleDeletePost(post.id)}>Delete Post</button>
        </article>
    )
}

export default PostExerpt