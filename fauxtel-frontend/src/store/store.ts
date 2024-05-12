import { configureStore } from '@reduxjs/toolkit';
// import roomsReducer from './reducers/roomsReducer.js';
// import currentUser from './reducers/currentUser.js';
import buildReservation from './reducers/buildReservation.js';
// import reservations from './reducers/reservations.js';
import roomsReducer from './reducerSlices/roomsSlice.ts';
import locationsReducer from './reducerSlices/locationsSlice.ts';
import currentUserReducer from './reducerSlices/currentUserSlice.ts';
import reservationsReducer from './reducerSlices/reservationSlice.ts';



const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        rooms: roomsReducer,
        reservations: reservationsReducer,
        // buildReservation,
        locations: locationsReducer,
    }
  })

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store