import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getCurrentUser } from '../store/actions/currentUser.js';

import { getReservations } from '../store/actions/reservations.js';
import { Link, NavLink } from 'react-router-dom';
import { Logout } from '../components/Logout.js';
import { fetchCurrentUser, selectCurrentUser } from '../store/reducerSlices/currentUserSlice.js';


export const UserNav = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const [loggedInUser, setLoggedInUser] = useState(!!currentUser);


    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [])

    useEffect(() => { 
        currentUser && currentUser.currentUser !== null ? setLoggedInUser(!!currentUser) : setLoggedInUser(false)
    }, [currentUser])

    return (
        <div className="User UserNav">
            {loggedInUser
                ?
                <div className="AuthedUserWrapper">
                    <div className="UserDisplay">
                        <div id="UserName">Logged in as {currentUser.attributes.first_name} </div>
                        <Logout setLoggedInUser={setLoggedInUser} />
                    </div>
                    <div className="UserLinks">
                        {/* todo this should maybe be /user/view-reservations // or /view-reservations/userid */}
                        <li><NavLink to="/view-reservations">View My Reservations</NavLink></li>
                        {/* todo would also want a view user info link at some point to view/edit etc */}
                    </div>
                </div>
                :     
                <ul className="SignUpLogin">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                </ul>
            }
        </div>
    );

}
