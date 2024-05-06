import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Reservations.css';


export const UserReservations = ({ currentUser }) => {
    const userReservations = currentUser && currentUser.attributes.reservations
    return (
        <div className="UserResv">
            <h1 className='pageTitle'>My Reservations</h1>
            {currentUser && userReservations.length > 0 && userReservations.map(r =>
                <li key={r.id} >
                    <Link className='reservationLink' to={`/view-reservations/${r.id}`}>From: {r.start_date} To: {r.end_date}</Link>
                </li>
            )}
        </div>
    );
};
