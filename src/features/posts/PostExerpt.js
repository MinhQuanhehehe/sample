import React from 'react'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { useDispatch } from 'react-redux';
import { removePost, deletePost } from "./postSlice";

const PostExerpt = ({ post }) => {
    const dispatch = useDispatch();
    const handleDeletePost = (id) => {
        dispatch(removePost({ id }));
    };
    const onDeletePostClicked = () => {
        try {
            dispatch(deletePost({ id: post.id })).unwrap()
        } catch (err) {
            console.error('Failed to delete the post', err)
        }
    }
    return (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p className="postCredit">
                <PostAuthor post={post} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButton post={post} />
            <button className="deleteButton" onClick={onDeletePostClicked}>Delete Post</button>
        </article>
    )
}

export default PostExerpt