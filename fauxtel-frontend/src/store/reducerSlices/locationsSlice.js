import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLocations } from '../services/locationsService';

const initialState = { locations: [], status: 'idle', error: null };

export const fetchLocations = createAsyncThunk('GET_LOCS', async () => {
    const response = await getLocations()
    return response.data.data
})

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchLocations.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.locations = state.locations.concat(action.payload)
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

    }
})

export default locationsSlice.reducer

export const selectAllLocations = (state) => state.locations.locations