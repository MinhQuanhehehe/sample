import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = {
    users: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = 'succeeded';
        })
    }
});
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USER_URL);
    return response.data
})
export const selectAllUsers = (state) => state.users.users;
export default userSlice.reducer;