import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../store/actions/currentUser.js';
import { useNavigate } from 'react-router-dom';
import { AuthButton } from './baseComponents/AuthButton.tsx';


export const SignUp = () => {
    const initialState = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signUpInfo, setSignUpInfo] = useState(initialState);

    const handleChange = (event) => {
        setSignUpInfo(prevState => {
            return {
                ...prevState, [event.target.name]: event.target.value
            };
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(signup(signUpInfo));
        navigate('/');
        setSignUpInfo(initialState);
    }

    return (
        <div className="SignUp">
            <form className='formDisplay' onSubmit={handleSubmit}>
                {/* todo work on changing to an input component */}
                <input className="form" type="text" name="first_name" placeholder="First Name" value={signUpInfo.first_name} onChange={handleChange}></input>
                <input className="form" type="text" name="last_name" placeholder="Last Name" value={signUpInfo.last_name} onChange={handleChange}></input>
                <br />
                <input className="form" type="text" name="email" placeholder="Email" value={signUpInfo.email} onChange={handleChange}></input>
                <input className="form" type="password" name="password" placeholder="Password" value={signUpInfo.password} onChange={handleChange}></input>
                <br />
                <AuthButton displayText='Sign Up' type='submit' />
            </form>
        </div>
    );
};
