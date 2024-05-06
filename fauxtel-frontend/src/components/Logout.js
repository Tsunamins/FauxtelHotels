import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/currentUser.js';
import { useNavigate } from 'react-router-dom';
import { AuthButton } from './baseComponents/AuthButton.js';

export const Logout = ({ setLoggedInUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // todo, expire token after some time, front and back
        setLoggedInUser(false);
        dispatch(logout);
        localStorage.removeItem('token');
    };
    return (
        <div className='Logout'>
            <AuthButton displayText='Logout' onClick={handleLogout} type='submit'/>
        </div>
    );
};
