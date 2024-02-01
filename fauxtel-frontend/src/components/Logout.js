import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/currentUser.js';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // todo logout isn't changng back to sign up login
        dispatch(logout);
        localStorage.removeItem('token');
        navigate('/');
    };
    // todo maybe take logout, signup, login, create 1 button component/pass in values/same styling
    // auth buttons class or similar name
    return (
        <div className='Logout'>
            <button className='authsButtons' onClick={handleLogout}>Logout</button>
        </div>
    );
};
