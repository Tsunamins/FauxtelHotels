
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogoutProps } from './componentProps';
import { AppDispatch } from '../store/store';
import { logoutUser } from '../store/reducerSlices/currentUserSlice';
import { BaseButton } from './baseComponents/BaseButton';
import styled from 'styled-components';


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
        <div>
            <AuthButton displayText='Logout' onClick={handleLogout} type='submit'/>
        </div>
    );
};

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
