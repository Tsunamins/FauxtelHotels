import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/currentUser.js';
import { useNavigate } from 'react-router-dom';
import { AuthButton } from './baseComponents/AuthButton.js';

export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // todo logout isn't changng back to sign up login 
        // todo also not logging someone out after a certain time (address front end and back end)
        dispatch(logout);
        localStorage.removeItem('token');
        navigate('/');
    };
    return (
        <div className='Logout'>
            <AuthButton displayText='Logout' onClick={handleLogout} type='submit'/>
        </div>
    );
};
