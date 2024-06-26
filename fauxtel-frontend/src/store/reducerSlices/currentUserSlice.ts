import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUser, getCurrentUser, loginUser } from '../services/currentUserService';
import { ResponseData, UserCreateWrapper, UserCreds } from '../storeProps';

const initialState = { currentUser: null, status: 'idle', error: '' };



export const loginCurrentUser = createAsyncThunk('LOGIN_USER', async (credentials: UserCreds): Promise<ResponseData | null> => {
    const response = await loginUser(credentials)
    localStorage.setItem('token', response.data.jwt)
    return response.data.user.data
})

export const fetchCurrentUser = createAsyncThunk('GET_USER', async () => {
    const response = await getCurrentUser()
    return response.data.user.data
})

export const logoutUser = createAsyncThunk('LOGOUT_USER', async () => {
    const response = initialState
    return response
})

export const signUpUser = createAsyncThunk('CREATE_AND_LOGIN_USER', async (credentials: UserCreateWrapper): Promise<ResponseData | null> => {
    console.log('creds?? ', credentials)
    const response = await createUser(credentials)
    // localStorage.setItem('token', response.data.jw
    localStorage.setItem('token', response.jwt)

    console.log('new user?? ', response.data)
    return response.data.user.data
})

// todo need to finish create user, also need to look at backend logout - does it log out?

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loginCurrentUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(loginCurrentUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currentUser = action.payload || null
                console.log('current user state: ', state.currentUser)
            })
            .addCase(loginCurrentUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'undefined error'
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
                state.error = action.error.message || 'undefined error'
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currentUser = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'undefined error'
            })
            .addCase(signUpUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currentUser = action.payload || null
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'undefined error'
            })

    }
})

export default currentUserSlice.reducer

export const selectCurrentUser = (state: { currentUser: { currentUser: any; }; }) => state.currentUser.currentUser