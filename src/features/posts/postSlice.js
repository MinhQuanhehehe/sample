import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
import react from "react";

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'
const initialState = {
    posts: [
        // {id: 1, title: 'blog 1', body: 'Ronaldo siuu', date: sub(new Date(), { minutes: 10 }).toISOString(), reactions: { 
        //     thumbsUp: 0,
        //     hooray: 0,
        //     heart: 0,
        //     rocket: 0,
        //     eyes: 0
        // } },
        // {id: 2, title: 'blog 2', body: 'Messi siuu', date: sub(new Date(), { minutes: 5 }).toISOString(), reactions: { 
        //     thumbsUp: 0,
        //     hooray: 0,
        //     heart: 0,
        //     rocket: 0,
        //     eyes: 0
        // } },
        // {id: 3, title: 'blog 3', body: 'Neymar siuu', date: sub(new Date(), { minutes: 2 }).toISOString(), reactions: { 
        //     thumbsUp: 0,
        //     hooray: 0,
        //     heart: 0,
        //     rocket: 0,
        //     eyes: 0
        // } },
        // {id: 4, title: 'blog 4', body: 'Mbappe siuu', date: sub(new Date(), { minutes: 1 }).toISOString(), reactions: { 
        //     thumbsUp: 0,
        //     hooray: 0,
        //     heart: 0,
        //     rocket: 0,
        //     eyes: 0
        // } },
        // {id: 5, title: 'blog 5', body: 'Benzema siuu', date: sub(new Date(), { minutes: 0 }).toISOString(), reactions: { 
        //     thumbsUp: 0,
        //     hooray: 0,
        //     heart: 0,
        //     rocket: 0,
        //     eyes: 0
        // } },
    ],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POST_URL);
    console.log(response.data)
    return response.data
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
            state.posts = state.posts.concat(loadedPosts);
        }).addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
});
export const { addPost, removePost, addReaction } = postSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;
export const getStatus = (state) => state.posts.status;
export const getError = (state) => state.posts.error;

export default postSlice.reducer;
