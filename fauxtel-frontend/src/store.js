// import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit'

// import thunk from 'redux-thunk';
// import usersReducer from './reducers/usersReducer.js'
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
// const reducer = combineReducers({
//     //users: usersReducer, 
//     currentUser,
//     rooms: roomsReducer,
//     reservations,
//     buildReservation,
//     locations: locsReducer,
// });

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
// todo is this needed?
// todo next need to work with new technique from toolkit in all of the actual reducers and actions etc
// also maybe move this file store, actions folder and reducers folder into a store or other named file
export default store