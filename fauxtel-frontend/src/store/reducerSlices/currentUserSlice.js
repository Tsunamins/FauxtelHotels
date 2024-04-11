import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser, loginUser } from '../services/currentUserService';

const initialState = { currentUser: null, status: 'idle', error: null };

export const loginCurrentUser = createAsyncThunk('LOGIN_USER', async (credentials) => {
    const response = await loginUser(credentials)
    localStorage.setItem('token', response.data.jwt)
    return response.data.user.data
})

export const fetchCurrentUser = createAsyncThunk('GET_USER', async () => {
    const response = await getCurrentUser()
    return response.data.user.data
})

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(loginCurrentUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(loginCurrentUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currentUser = action.payload
                console.log('current user state: ', state.currentUser)
            })
            .addCase(loginCurrentUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchCurrentUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currentUser = action.payload
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

    }
})

export default currentUserSlice.reducer

export const selectCurrentUser = (state) => state.currentUser.currentUser