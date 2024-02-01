import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../actions/currentUser.js';
import '../styles/Forms.css';


export const Login = () => {
    const initialState = {
        email: "",
        password: "",
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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
        dispatch(login(loginInfo));
        navigate('/');
        setLoginInfo(initialState);
    }

    return (
        <form className='formDisplay' onSubmit={handleSubmit}>
            <input className="form" type="text" name="email" placeholder="Email" value={loginInfo.email} onChange={handleChange}></input>
            <input className="form" type="password" name="password" placeholder="Password" value={loginInfo.password} onChange={handleChange}></input>
            <br />
            <input className="authsButtons" type="submit" value="Log In"></input>
        </form>
    );
};
