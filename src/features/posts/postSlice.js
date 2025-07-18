import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
import react from "react";

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'
const initialState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POST_URL);
    console.log(response.data)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const response = await axios.post(POST_URL, initialPost)
        return response.data
    } catch (err) {
        return err.message
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POST_URL}/${id}`)
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.put(`${POST_URL}/${id}`, initialPost)
        return response.data
    } catch (err) {
        //return err.message;
        return initialPost; // only for testing Redux!
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, body, userId) {
                return {
                    payload: {
                        id: nanoid(), title, body, date: new Date().toISOString(), userId, reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
                    }
                };
            }
        },
        removePost(state, action) {
            const { id } = action.payload;
            const existingPost = state.posts.find(post => post.id === id);
            if (existingPost) {
                state.posts = state.posts.filter(post => post.id !== id);
            }
        },
        addReaction(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            let min = 1;
            const loadedPosts = action.payload.map(post => ({
                ...post,
                date: sub(new Date(), { minutes: min++ }).toISOString(),
                reactions: {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }
            }));
            state.posts = loadedPosts;
        }).addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }).addCase(addNewPost.fulfilled, (state, action) => {
            action.payload.userId = Number(action.payload.userId);
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            }
            console.log(action.payload)
            state.posts.push(action.payload)
        }).addCase(deletePost.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log('Delete could not complete')
                console.log(action.payload)
                return;
            }
            const { id } = action.payload;
            const posts = state.posts.filter(post => post.id !== id);
            state.posts = posts;
        }).addCase(updatePost.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log('Update could not complete')
                console.log(action.payload)
                return;
            }
            const { id } = action.payload;
            action.payload.date = new Date().toISOString();
            const posts = state.posts.filter(post => post.id !== id);
            state.posts = [...posts, action.payload];
        })
    }
});

export const { addPost, removePost, addReaction } = postSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;
export const getStatus = (state) => state.posts.status;
export const getError = (state) => state.posts.error;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)
export default postSlice.reducer;
