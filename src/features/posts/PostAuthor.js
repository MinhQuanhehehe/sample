import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/userSlice';

import React from 'react'

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers);
    const author = users.find((user) => user.id === Number(userId));

    return (
        <span>by {author ? author.name : 'Unknown Author'}</span>
    )
}

export default PostAuthor