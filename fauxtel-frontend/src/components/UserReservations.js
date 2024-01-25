import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/userresv.css';


export const UserReservations = ({ currentUser }) => {
    const userResv = currentUser && currentUser.attributes.reservations.map(r => 
          <li key={r.id} >
            <Link className='reservationLink' to={`/view-reservations/${r.id}`}>From: {r.start_date} To: {r.end_date}</Link>
          </li>
        )

    return(
      <>
        {currentUser && userResv.length > 0 && 
          <div className="UserResv">
            <h1 className='pageTitle'>My Reservations</h1>
              {userResv}
          </div>
        }
      </>
    );
 };
