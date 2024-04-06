import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './reducers/roomsReducer.js';
import currentUser from './reducers/currentUser.js';
import reservations from './reducers/reservations.js';
import buildReservation from './reducers/buildReservation.js';
import locsReducer from './reducers/locationsReducer.js';


// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        currentUser,
        rooms: roomsReducer,
        reservations,
        buildReservation,
        locations: locsReducer,
    }
  })

export default store