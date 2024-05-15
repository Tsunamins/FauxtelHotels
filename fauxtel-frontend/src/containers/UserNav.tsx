import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Logout } from '../components/Logout.js';
import { AppDispatch } from '../store/store.js';
import { fetchCurrentUser, selectCurrentUser } from '../store/reducerSlices/currentUserSlice.js';


export const UserNav = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector(selectCurrentUser);
    const [loggedInUser, setLoggedInUser] = useState(!!currentUser);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [])

    useEffect(() => { 
        currentUser && currentUser.currentUser !== null ? setLoggedInUser(!!currentUser) : setLoggedInUser(false)
    }, [currentUser])

    return (
        <AuthedToggle>
            {loggedInUser
                ?
                <>
                    <UserGreeting>Welcome {currentUser.attributes.first_name} </UserGreeting>
                    <SignUpLogin>
                            {/* todo this should maybe be /user/view-reservations // or /view-reservations/userid */}
                            <div><NavLink to="/view-reservations">Reservations</NavLink></div>
                            {/* todo would also want a view user info link at some point to view/edit etc */}
                        <Logout setLoggedInUser={setLoggedInUser} />
                    </SignUpLogin>
                </>
                :     
                <SignUpLogin>
                    <div><Link to="/signup">Sign Up</Link></div>
                    <div><Link to="/login">Log In</Link></div>
                </SignUpLogin>
            }
        </AuthedToggle>
    );
}


const SignUpLogin = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    list-style: none;
    padding: 10px;
    border: 1px solid #0f7171;
    border-right: none;
    font-size: 20px;
    margin-left: 25%;
    margin-right: -10px;
    max-width: 80%;
    column-gap: 10px;


    @media only screen and (min-width: 600px) {
        max-width: 50%;
        margin-left: 50%;
        // I think by this I mean use a conditional/prop
        // todo logged out put this back
        // margin-top: -100px;

    }
`;

const AuthedToggle = styled.div`
    margin-top: 25px;
`;

const UserGreeting = styled.div`
    color: #fa6484;
    text-align: right;

`;
