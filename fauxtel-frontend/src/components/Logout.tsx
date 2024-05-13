
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogoutProps } from './componentProps';
import { AppDispatch } from '../store/store';
import { logoutUser } from '../store/reducerSlices/currentUserSlice';
import { BaseButton } from './baseComponents/BaseButton';


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
