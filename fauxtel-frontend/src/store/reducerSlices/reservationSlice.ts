import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser, loginUser, logout } from '../services/currentUserService';
import { UserCreds } from '../../components/Login';
import { createReservation, getReservations } from '../services/reservationsService';

const initialState = { allReservations: [], status: 'idle', error: '' };

export type ResponseData = {
    status: number;
    data: any;
    headers: Headers;
    url: string;
}

// todo, while this will create an appropriate reservation in the DB, should it really be adding to the list of user reservations?
// or both? but reservations based on a user allways come from user -> reservations and reservations from a room come from room -> occupied dates??
export const createNewReservation = createAsyncThunk('ADD_RES', async (resInfo): Promise<ResponseData> => {
    const response = await createReservation(resInfo)
    return response.data
})

export const fetchAllReservations = createAsyncThunk('GET_RESERVATIONS', async () => {
    const response = await getReservations()
    return response.data.user.data
})


// need to add modifying and delete functions

const reservationSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder

        .addCase(fetchAllReservations.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchAllReservations.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.allReservations = state.allReservations.concat(action.payload)
        })
        .addCase(fetchAllReservations.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'undefined error'
        })

                    .addCase(createNewReservation.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(createNewReservation.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.allReservations = state.allReservations.concat(action.payload)
                console.log('current user state: ', state.allReservations)
            })
            .addCase(createNewReservation.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'undefined error'
            })

        // below example only
            // .addCase(loginCurrentUser.pending, (state, action) => {
            //     state.status = 'loading'
            // })
            // .addCase(loginCurrentUser.fulfilled, (state, action) => {
            //     state.status = 'succeeded'
            //     state.currentUser = action.payload
            //     console.log('current user state: ', state.currentUser)
            // })
            // .addCase(loginCurrentUser.rejected, (state, action) => {
            //     state.status = 'failed'
            //     state.error = action.error.message || 'undefined error'
            // })
            // .addCase(fetchCurrentUser.pending, (state, action) => {
            //     state.status = 'loading'
            // })
            // .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            //     state.status = 'succeeded'
            //     state.currentUser = action.payload
            // })
            // .addCase(fetchCurrentUser.rejected, (state, action) => {
            //     state.status = 'failed'
            //     state.error = action.error.message || 'undefined error'
            // })

    }
})

export default reservationSlice.reducer

export const selectCurrentUser = (state: { allReservations: { reservations: any; }; }) => state.allReservations.allReservations;