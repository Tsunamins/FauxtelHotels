import { configureStore } from '@reduxjs/toolkit';
// import roomsReducer from './reducers/roomsReducer.js';
// import currentUser from './reducers/currentUser.js';
import buildReservation from './reducers/buildReservation.js';
import reservations from './reducers/reservations.js';
import roomsReducer from './reducerSlices/roomsSlice.js';
import locationsReducer from './reducerSlices/locationsSlice.js';
import currentUserReducer from './reducerSlices/currentUserSlice.js';


const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        rooms: roomsReducer,
        reservations,
        buildReservation,
        locations: locationsReducer,
    }
  })

export default store