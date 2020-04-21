import React from 'react'
import {connect} from 'react-redux'
import { updateLoginForm } from '../actions/loginForm.js'
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
            <input type="text" name="email"  placeholder="email" value={userLoginInput.email} onChange={handleInputChange}></input>
            <input type="password" name="password"  placeholder="password" value={userLoginInput.password} onChange={handleInputChange}></input>
            <input type="submit" value="Log In"></input>

        </form>
    )
}

const mapStateToProps = state => {
    return {
        userLoginInput: state.loginForm //loginForm is reducers/loginForm.js
    }
}

export default connect(mapStateToProps, {updateLoginForm, login})(Login)



