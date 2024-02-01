import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cancelReservation } from '../actions/reservations.js';
import { BookNow } from './BookNow.js';
import { locationMap, roomMap } from '../constants.js';
import '../styles/Modifying.css';


export const UserReservationView = ({ reservation }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser)
    const navigate = useNavigate();
    const [isModing, setIsModing] = useState(false);

  const handleCancel = () => {
    dispatch(cancelReservation(reservation.id));
    navigate('/');
  }
 
  // todo also want to add an 'are you sure you want to cancel' 
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
                {/* todo actually might just need reservation id below, bc, would like to offer option of changing location and room */}
                { isModing ? <BookNow flowType='modify' modifyingReservation={reservation.id} /> 
                    :   
                    <div>  
                        <button className='reservationButtons' onClick={() => setIsModing(true)}>Modify Reservation</button>
                        <br/>
                        <button className='reservationButtons' onClick={handleCancel}>Cancel Reservation</button>
                    </div>
                }
          </div>
        }
    </div>
  );
};
