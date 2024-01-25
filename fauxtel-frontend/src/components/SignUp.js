import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../actions/currentUser.js';


export const SignUp = () => {
    const initialState = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    };
    const dispatch = useDispatch();
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
        // todo use react dom router to go back to index or similar, or turn into modals
        // props.history.push("/")
        setSignUpInfo(initialState);
    }

    return (
        <div className="SignUp">
            <form className='formDisplay' onSubmit={handleSubmit}>
                <input className="form" type="text" name="first_name" placeholder="First Name" value={signUpInfo.first_name} onChange={handleChange}></input>
                <input className="form" type="text" name="last_name" placeholder="Last Name" value={signUpInfo.last_name} onChange={handleChange}></input>
                <br />
                <input className="form" type="text" name="email" placeholder="Email" value={signUpInfo.email} onChange={handleChange}></input>
                <input className="form" type="password" name="password" placeholder="Password" value={signUpInfo.password} onChange={handleChange}></input>
                <br />
                <input className="button" type="submit" value="Sign Up"></input>
            </form>
        </div>
    );
};
