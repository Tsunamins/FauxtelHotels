import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserNavLinks } from '../links/UserNavLinks.js';
import { UserAuthLinks } from '../links/UserAuthLinks.js';
import { getCurrentUser } from '../actions/currentUser.js';
import { getReservations } from '../actions/reservations.js';


export const UserNav = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    const reservations = useSelector(state => state.reservations);
    const [loggedInUser, setLoggedInUser] = useState(currentUser);


    // todo if this only deals with user reservations may not need all reservations until booking
    useEffect(() => {
        dispatch(getReservations())
    }, [])

    useEffect(() => { 
        currentUser && setLoggedInUser(currentUser)
    }, [currentUser])

    const userReservations = loggedInUser ? currentUser?.attributes.reservations : []

    // todo tech no prop for userReservations and this info should really be provided to the component that renders reservations of a user
    // some enhancement like an admin mode would show all so only need users once again
    return (
        <div className="User UserNav">
            {loggedInUser
                ? <UserNavLinks loggedInUser={loggedInUser} currentUser={currentUser || ''} userReservations={userReservations} />
                : <UserAuthLinks />
            }
        </div>
    );

}
