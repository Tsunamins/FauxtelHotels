import React from 'react'
import {connect} from 'react-redux'
//import of action for login form

const Login = (props) => {
    return (
        <form>
            <input type="text" name="username" value={props.username} placeholder="username"></input>
            <input type="password" name="password" value={props.password} placeholder="password"></input>
            <input type="submit" value="Log In"></input>

        </form>
    )
}

