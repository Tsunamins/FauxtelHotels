import React, { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BookNow } from './BookNow.tsx';
import { locationMap, roomMap } from '../constants.ts';
import '../styles/Modifying.css';
import { BaseButton } from './baseComponents/BaseButton.tsx';
import { cancelReservation } from '../store/reducerSlices/reservationSlice.ts';
import { AppDispatch } from '../store/store.ts';
import { ReservationView } from './componentProps.ts';


export const UserReservationView = ({ reservation }: ReservationView) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isModing, setIsModing] = useState(false);

    const handleCancel = () => {
        dispatch(cancelReservation(reservation.id));
        navigate('/');
    }

    const existingStartDate = new Date(reservation.start_date);
    const existingEndDate = new Date(reservation.end_date);
    const existingRange = {
        from: existingStartDate,
        to: existingEndDate
    }
    
    // todo also want to add an 'are you sure you want to cancel'
    // todo cannot modify or cancel reservations past the dates
    return (
        <div>
            <h1 className='pageTitle'>Reservation</h1>
            {reservation &&
                <div className='ModifyingReservation'>
                    {isModing ? <h3 className="modifyingNote">You are Modifying </h3> : null}
                    <h3 className='topicTitle'>Location: {locationMap[reservation.location_id]}</h3>
                    <p className='topicDetails'>Room Type: {roomMap[reservation.room_id]}</p>
                    <p className='topicDetails'>From: {reservation.start_date as ReactNode}</p>
                    <p className='topicDetails'>To: {reservation.end_date as ReactNode}</p>
                    {isModing ? <BookNow modifyingReservation={reservation} modifyingRange={existingRange} />
                        :
                        <div>
                            <BaseButton className='reservationButtons' displayText='Modify Reservation' onClick={() => setIsModing(true)} type='button' />
                            <br />
                            <BaseButton className='reservationButtons' displayText='Cancel Reservation' onClick={handleCancel} type='button' />
                        </div>
                    }
                </div>
            }
        </div>
    );
};
