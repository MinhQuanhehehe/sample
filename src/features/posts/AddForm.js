import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";

import React from 'react'

const AddForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const users = useSelector(selectAllUsers);
    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    const dispatch = useDispatch();
    const onTitleChanged = (e) => setTitle(e.target.value);
    const onBodyChanged = (e) => setBody(e.target.value);
    const onUserChanged = (e) => setUserId(e.target.value);

    const canSave = [title, body, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if(canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({title, body, userId})).unwrap()
                setTitle('')
                setBody('')
                setUserId('')
            }
            catch(err) {
                console.log('fail', err)
            }
            finally {
                setAddRequestStatus('idle')
            }
        }
    };

    
    return (
        <form>
            <h2>Add New Post</h2>
            <label htmlFor="postTitle">Post Title:</label>
            <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChanged}
            />
            <label htmlFor="postBody">Post Body:</label>
            <textarea
                id="postBody"
                name="postBody"
                value={body}
                onChange={onBodyChanged}
            />
            <label htmlFor="userId">Author:</label>
            <select id="userId" value={userId} onChange={onUserChanged}>
                <option value="">Select User</option>
                {userOptions}
            </select>
            <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
                Save Post
            </button>
        </form>
    )
}

export default AddForm