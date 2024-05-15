import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import { UserCreateCreds, UserCreateWrapper } from '../store/storeProps';
import { signUpUser } from '../store/reducerSlices/currentUserSlice';
import { BaseButton } from './baseComponents/BaseButton';
import styled from 'styled-components';


export const SignUp = () => {
    const initialState = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    };
    
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [signUpInfo, setSignUpInfo] = useState<UserCreateCreds>(initialState);

    const handleChange = (event) => {
        setSignUpInfo(prevState => {
            return {
                ...prevState, [event.target.name]: event.target.value
            };
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        const credentials: UserCreateWrapper = {user: { ...signUpInfo }}
        dispatch(signUpUser(credentials))
        navigate('/');
        setSignUpInfo(initialState);
    }

    return (
        <SignUpContainer>
            <SignUpForm onSubmit={handleSubmit}>
                {/* todo work on changing to an input component */}
                <Input type="text" name="first_name" placeholder="First Name" value={signUpInfo.first_name} onChange={handleChange}/>
                <Input type="text" name="last_name" placeholder="Last Name" value={signUpInfo.last_name} onChange={handleChange}/>
                <br />
                <Input type="text" name="email" placeholder="Email" value={signUpInfo.email} onChange={handleChange}/>
                <Input type="password" name="password" placeholder="Password" value={signUpInfo.password} onChange={handleChange}/>
                <br />
                <AuthButton displayText='Sign Up' type='submit' />
            </SignUpForm>
        </SignUpContainer>
    );
};

const SignUpContainer = styled.div`
    padding-bottom: 25px;
    padding-right: 10px;
`;

const SignUpForm = styled.form`
    margin-top: 75px;
`;

const AuthButton = styled(BaseButton)`
    background-color: #335e5c5b;
    border: none;
    border-radius: 10px;
    color: #f2d2c2;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
`;

// todo update input style
const Input = styled.input`
    background-color: #5aa29e;
    padding: 12px 20px;
    margin: 8px 10px;
    display: inline-block;
    border: 1px solid #335e5c;
    box-shadow: 2px 5px 8px #6aeee9;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 25px;
`;
