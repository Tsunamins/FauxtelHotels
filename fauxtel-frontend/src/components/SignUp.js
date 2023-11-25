import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signup } from '../actions/currentUser.js'

// class SignUp extends React.Component {
const SignUp = () => {
    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",

    }

    const [signUpInfo, setSignUpInfo] = useState(initialState);

    const handleChange = (event) => {
        setSignUpInfo({ [event.target.name]: event.target.value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        // todo this is prob to update state as in store? and exit out of the sign up component
        // maybe make a modal instead
        // props.signup(this.state)
        // props.history.push("/")
        setSignUpInfo(initialState);
    }

    return (
        <div className="SignUp">
            <form onSubmit={handleSubmit}>
                <input className="form" type="text" name="first_name" placeholder="first_name" value={signUpInfo.firstName} onChange={handleChange}></input>
                <input className="form" type="text" name="last_name" placeholder="last_name" value={signUpInfo.lastName} onChange={handleChange}></input>
                <br></br>
                <input className="form" type="text" name="email" placeholder="email" value={signUpInfo.email} onChange={handleChange}></input>
                <input className="form" type="password" name="password" placeholder="password" value={signUpInfo.password} onChange={handleChange}></input>
                <br></br>
                <input className="button" type="submit" value="Sign Up"></input>

            </form>
        </div>
    )
}

// todo find newer react/redux/thunk docs on not using export default
// or similar
export default connect(null, { signup })(SignUp)




