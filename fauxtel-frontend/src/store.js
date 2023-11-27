import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from './reducers/roomsReducer.js'
import currentUser from './reducers/currentUser.js'
import reservations from './reducers/reservations.js'
import buildReservation from './reducers/buildReservation.js'
import locsReducer from './reducers/locationsReducer.js'


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

  // todo - move all store, reducers, actions, later slices and related into a store or reducer folder, maybe separate out the 
  // fetch functions into a services or similar folder
export default store