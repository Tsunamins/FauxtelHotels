import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/currentUser.js';
import '../styles/Forms.css';
import { loginCurrentUser } from '../store/reducerSlices/currentUserSlice.ts';
import { AppDispatch } from '../store/store.ts';
import { BaseButton } from './baseComponents/BaseButton.tsx';
import { UserCreds } from '../store/storeProps.ts';


export const Login = () => {
    const initialState: UserCreds = {
        email: '',
        password: '',
    };
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    
    const [loginInfo, setLoginInfo] = useState<UserCreds>(initialState);
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        setLoginInfo(prevState => {
            return {
                ...prevState, [target.name]: target.value
            }
        })
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(loginCurrentUser(loginInfo))
        navigate('/');
        setLoginInfo(initialState);
    }

    return (
        <form className='formDisplay' onSubmit={handleSubmit}>
            <input className='form' type='text' name='email' placeholder='Email' value={loginInfo.email} onChange={handleChange}/>
            <input className='form' type='password' name='password' placeholder='Password' value={loginInfo.password} onChange={handleChange}/>
            <br />
            <BaseButton className='authButtons' displayText='Log In' type='submit' />
        </form>
    );
};
