import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import usersReducer from './reducers/usersReducer.js'
import roomsReducer from './reducers/roomsReducer.js'
import currentUser from './reducers/currentUser.js'
import reservations from './reducers/reservations.js'

const reducer = combineReducers({
    //users: usersReducer, 
   
    currentUser,


    rooms: roomsReducer,

    reservations

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store