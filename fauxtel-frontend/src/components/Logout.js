import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { logout } from '../actions/currentUser.js';

export const Logout = () => {
    const dispatch = useDispatch();

    return (
        <div className='Logout'>
            <form onSubmit={dispatch(logout)}>
                <input className='button' type='submit' value='Logout' />
            </form>
        </div>
    );
};
