import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/currentUser.js';
import '../styles/Forms.css';


export const Login = () => {
    const initialState = {
        email: "",
        password: "",
    }
    const dispatch = useDispatch();
    
    const [loginInfo, setLoginInfo] = useState(initialState);
    
    const handleChange = (event) => {
        setLoginInfo(prevState => {
            return {
                ...prevState, [event.target.name]: event.target.value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login(loginInfo))
        // todo use react dom router to go back to index or similar, or turn into modals
        // this.props.history.push("/")
        setLoginInfo(initialState)
    }

    return (
        <form className='formDisplay' onSubmit={handleSubmit}>
            <input className="form" type="text" name="email" placeholder="Email" value={loginInfo.email} onChange={handleChange}></input>
            <input className="form" type="password" name="password" placeholder="Password" value={loginInfo.password} onChange={handleChange}></input>
            <br />
            <input className="button" type="submit" value="Log In"></input>
        </form>
    )
}
