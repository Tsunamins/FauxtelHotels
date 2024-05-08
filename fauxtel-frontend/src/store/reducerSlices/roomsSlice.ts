import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRooms } from '../services/roomsService';

const initialState = { rooms: [], status: 'idle', error: '' };

export const fetchRooms = createAsyncThunk('GET_ROOMS', async () => {
    const response = await getRooms()
    return response.data.data
})

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchRooms.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.rooms = state.rooms.concat(action.payload)
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'undefined error'
            })

    }
})

export default roomsSlice.reducer

export const selectAllRooms = (state: { rooms: { rooms: any; }; }) => state.rooms.rooms