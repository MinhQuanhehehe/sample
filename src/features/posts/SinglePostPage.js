import { useSelector } from 'react-redux'
import { selectPostById } from './postSlice'

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButton";

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost } from "./postSlice";

const SinglePostPage = () => {
    const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    const dispatch = useDispatch();
    const onDeletePostClicked = () => {
        try {
            dispatch(deletePost({ id: post.id })).unwrap()
        } catch (err) {
            console.error('Failed to delete the post', err)
        }
    }
    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
            <button className="deleteButton" onClick={onDeletePostClicked}>Delete Post</button>
        </article>
    )
}

export default SinglePostPage
