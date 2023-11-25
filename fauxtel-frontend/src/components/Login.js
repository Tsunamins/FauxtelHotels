import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/currentUser.js'

const Login = () => {
    const initialState = {
        email: "",
        password: "",
    }

    const [loginInfo, setLoginInfo] = useState(initialState);

    const handleChange = event => {
        setLoginInfo({ [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // this.props.login(this.state)
        // this.props.history.push("/")
        setLoginInfo(initialState)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className="form" type="text" name="email" placeholder="email" value={loginInfo.email} onChange={handleChange}></input>
            <input className="form" type="password" name="password" placeholder="password" value={loginInfo.password} onChange={handleChange}></input>
            <input className="button" type="submit" value="Log In"></input>
        </form>
    )
}

export default connect(null, { login })(Login)




