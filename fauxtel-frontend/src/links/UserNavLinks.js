import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from '../components/Logout';

// todo same here after simplifying some
export const UserNavLinks = ({ currentUser, isLoggedIn }) => (
    <div className="AuthedUserWrapper" >
        <div className="UserLoggedIn">
            {isLoggedIn ? <><li id="loggedin">Logged in as {currentUser.attributes.first_name} </li><li><Logout /></li></> : null}
        </div>
        <div className="UserLinks">
            {/* todo this should maybe be /user/view-reservations // or /view-reservations/userid */}
            <li><NavLink to="/view-reservations">View My Reservations</NavLink></li>

            {/* todo would also want a view user info link at some point to view/edit etc */}
        </div>
    </div>
);
