import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ReservationPayload, ReservationUpdatePayload, ResponseData } from '../storeProps';
import { createReservation, deleteReservation, getReservations, patchReservation } from '../services/reservationsService';


const initialState = { allReservations: [], status: 'idle', error: '' };

// todo, while this will create an appropriate reservation in the DB, should it really be adding to the list of user reservations?
// or both? but reservations based on a user always come from user -> reservations and reservations from a room come from room -> occupied dates??
export const createNewReservation = createAsyncThunk('ADD_RES', async (resInfo: ReservationPayload): Promise<ResponseData> => {
    const response = await createReservation(resInfo)
    return response.data
})

export const fetchAllReservations = createAsyncThunk('GET_RESERVATIONS', async (): Promise<ResponseData> => {
    const response = await getReservations()
    return response.data.user.data
})

export const updateReservation = createAsyncThunk('UPDATE_RES', async ({resvId, resvData}: ReservationUpdatePayload): Promise<ResponseData> => {
    const response = await patchReservation(resvId, resvData)
    return response.data.user.data
})

export const cancelReservation = createAsyncThunk('DELETE_RES', async (resvId: number): Promise<ResponseData> => {
    const response = await deleteReservation(resvId)
    return response.data.user.data
})

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

        .addCase(updateReservation.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(updateReservation.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // will need to modify the reservation within the state
            // state.allReservations = state.allReservations.concat(action.payload)

        })
        .addCase(updateReservation.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'undefined error'
        })

        .addCase(cancelReservation.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(cancelReservation.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // will need to remove the reservation
            // state.allReservations = state.allReservations.concat(action.payload)

        })
        .addCase(cancelReservation.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message || 'undefined error'
        })
    }
})

export default reservationSlice.reducer

export const selectAllReservations = (state: { allReservations: { allReservations: any; }; }) => state.allReservations.allReservations;