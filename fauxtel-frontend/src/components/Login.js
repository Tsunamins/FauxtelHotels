import React from 'react'
import {connect} from 'react-redux'
//import of action for login form
import {updateLoginForm} from '../actions/loginForm.js'

const Login = (props, {updateLoginForm}) => {
    return (
        <form>
            <input value={props.username} onClick={updateLoginForm} type="text" name="username"  placeholder="username"></input>
            <input value={props.password} onClick={updateLoginForm} type="password" name="password"  placeholder="password"></input>
            <input type="submit" value="Log In"></input>

        </form>
    )
}

const mapStateToProps = state => {
    return {
        username: state.loginForm.username,
        password: state.loginForm.password
    }
}

export default connect(mapStateToProps, {updateLoginForm: updateLoginForm})(Login)



