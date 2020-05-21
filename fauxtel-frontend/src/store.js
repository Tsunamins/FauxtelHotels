import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import usersReducer from './reducers/usersReducer.js'
import roomsReducer from './reducers/roomsReducer.js'
import currentUser from './reducers/currentUser.js'
import reservations from './reducers/reservations.js'
import buildReservation from './reducers/buildReservation.js'
import getLocations from './reducers/locationsReducer.js'

const reducer = combineReducers({
    //users: usersReducer, 
   
    currentUser,


    rooms: roomsReducer,

    reservations,

    buildReservation

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store