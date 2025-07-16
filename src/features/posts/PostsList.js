import { useSelector} from "react-redux";
import { selectAllPosts, getStatus, getError, fetchPosts } from "./postSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import PostExerpt from "./PostExerpt";

import React from 'react';

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getStatus);
    const postsError = useSelector(getError);
    console.log(posts);
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    const dispatch = useDispatch();

    useEffect(() =>{
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])

    const renderedPosts = orderedPosts.map((post) => (
        <PostExerpt key={post.id} post={post}/>
    ));


    if (posts.length === 0) {
        return <div>No posts available</div>;
    }
    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
}
export default PostsList;