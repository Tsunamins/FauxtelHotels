import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cancelReservation } from '../actions/reservations.js';
import { BookNow } from './BookNow.js';
import { getResv } from '../actions/buildReservation.js';
import { locationMap, roomMap } from '../constants.js';
import '../styles/modifying.css';


export const UserReservationView = ({reservation, userReservations}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser)
    console.log('current user in resv view: ', currentUser)
    const navigate = useNavigate();
    const [isModing, setIsModing] = useState(false);
    console.log('reservation id: ', reservation.id)

  const handleCancel = () => {
    dispatch(cancelReservation(reservation.id));
    navigate('/');
  }
 
  // also want to do an 'are you sure you want to cancel' 
  return (
    <div>
        <h1 className='pageTitle'>Reservation</h1>
        {reservation && 
            <div className='ModifyingReservation'>
                { isModing ? <h3>You are Modifying </h3> : null }
                <h3 className='topicTitle'>Location: {locationMap[reservation.location_id]}</h3>
                <p className='topicDetails'>Room Type: {roomMap[reservation.room_id]}</p>
                <p className='topicDetails'>From: {reservation.start_date}</p>
                <p className='topicDetails'>To: {reservation.end_date}</p>
                { isModing ? <BookNow reservations={userReservations} /> 
                    :   
                    <div>  
                        <button className='button' onClick={() => setIsModing(true)}>Modify Reservation</button>
                        <br/>
                        <button className='button' onClick={handleCancel}>Cancel Reservation</button>
                    </div>
                }
          </div>
        }
    </div>
  );
};
