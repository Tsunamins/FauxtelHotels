import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import usersReducer from './reducers/usersReducer.js'
import loginForm from './reducers/loginForm.js'

const reducer = combineReducers({
    users: usersReducer, 
    loginForm
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store