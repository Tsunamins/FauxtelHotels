import React from 'react'
import {connect} from 'react-redux'

import {updateLoginForm} from '../actions/loginForm.js'
import { login } from '../actions/currentUser.js'

const Login = ({userLoginInput, updateLoginForm, login}) => {

    const handleInputChange = event => {
        const { name, value } = event.target
        const updatedFormInfo = {
            ...userLoginInput,
            [name]: value
        }
        updateLoginForm(updatedFormInfo)
    }

    const handleSubmit = event => {
        event.preventDefault()
        login(userLoginInput)
    }


    return (
        <form onSubmit={handleSubmit}>
            <input value={userLoginInput.username} onClick={handleInputChange} type="text" name="username"  placeholder="username"></input>
            <input value={userLoginInput.password} onClick={handleInputChange} type="password" name="password"  placeholder="password"></input>
            <input type="submit" value="Log In"></input>

        </form>
    )
}

const mapStateToProps = state => {
    return {
        userLoginInput: state.loginForm //loginForm is reducers/loginForm.js
    }
}

export default connect(mapStateToProps, updateLoginForm, login)(Login)



