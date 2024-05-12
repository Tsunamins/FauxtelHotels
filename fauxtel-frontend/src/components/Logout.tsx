import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/reducerSlices/currentUserSlice.ts';
import { AppDispatch } from '../store/store.ts';
import { BaseButton } from './baseComponents/BaseButton.tsx';
import { LogoutProps } from './componentProps.ts';



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
            <BaseButton className='authButtons' displayText='Logout' onClick={handleLogout} type='submit'/>
        </div>
    );
};
