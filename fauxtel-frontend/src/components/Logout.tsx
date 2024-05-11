import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/currentUser.js';
import { useNavigate } from 'react-router-dom';
import { AuthButton } from './baseComponents/AuthButton.tsx';
import { logoutUser } from '../store/reducerSlices/currentUserSlice.ts';
import { AppDispatch } from '../store/store.ts';

interface LogoutProps {
    setLoggedInUser: Dispatch<Boolean>
}

export const Logout = ({ setLoggedInUser }: LogoutProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        // todo, expire token after some time, front and back
        setLoggedInUser(false);
        dispatch(logoutUser);
        localStorage.removeItem('token');
    };
    return (
        <div className='Logout'>
            <AuthButton displayText='Logout' onClick={handleLogout} type='submit'/>
        </div>
    );
};
