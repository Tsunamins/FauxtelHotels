import React, { useState } from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';

import {cancelReservation} from '../actions/reservations.js'
import { BookNow } from './BookNow.js'
import { getResv } from '../actions/buildReservation.js'
import '../styles/modifying.css'




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


  // todo need to match user reservation id with reservations ids from all reservations to get name and room type
  // instead of using ids, can match with an object things like location name, but types would be more numerous so may as well 
  // also want to do an 'are you sure you want to cancel' 
  return (
    <div>
        <div>Reservation ---</div>
        {reservation && 
            <div className="ModifyingReservation">
                { isModing ? <h3>You are Modifying </h3> : null }
                <h3>Location: {reservation.location_id}</h3>
                <p>Room Type: {reservation.room_id}</p>
                <p>From: {reservation.start_date}</p>
                <p>To: {reservation.end_date}</p>
                { isModing ? <BookNow reservations={userReservations} /> 
                    :   
                    <div>  
                        <button className="button" onClick={() => setIsModing(true)}>Modify Reservation</button>
                        <br/>
                        <button className="button" onClick={handleCancel}>Cancel Reservation</button>
                    </div>
                }
          </div>
        }
    </div>
  )
}   
