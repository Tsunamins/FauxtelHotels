import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserCreds } from '../store/storeProps';
import { AppDispatch } from '../store/store';
import { loginCurrentUser } from '../store/reducerSlices/currentUserSlice';
import { BaseButton } from './baseComponents/BaseButton';
import styled from 'styled-components';


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
        <LoginForm onSubmit={handleSubmit}>
            <Input type='text' name='email' placeholder='Email' value={loginInfo.email} onChange={handleChange}/>
            <Input type='password' name='password' placeholder='Password' value={loginInfo.password} onChange={handleChange}/>
            <br />
            <AuthButton displayText='Log In' type='submit' />
        </LoginForm>
    );
};


const LoginForm = styled.form`
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

