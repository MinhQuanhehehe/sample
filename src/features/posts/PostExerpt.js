import React from 'react'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removePost, deletePost } from "./postSlice";

let PostExerpt = ({ post }) => {
    console.log(post);
    const dispatch = useDispatch();
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
            <p>{post.body.substring(0, 75)}...</p>
            <p className="postCredit">
                <Link to={`post/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButton post={post} />
            <button className="deleteButton" onClick={onDeletePostClicked}>Delete Post</button>
        </article>
    )
}
PostExerpt = React.memo(PostExerpt);

export default PostExerpt