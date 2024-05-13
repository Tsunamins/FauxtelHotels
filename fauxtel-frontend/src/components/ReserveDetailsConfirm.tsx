import { useDispatch } from 'react-redux';
import '../styles/Reservations.css';
import { AppDispatch } from '../store/store';
import { ReserveDetailsConfirmProps } from './componentProps';
import { useNavigate } from 'react-router-dom';
import { createNewReservation, updateReservation } from '../store/reducerSlices/reservationSlice';
import { locationMap } from '../constants';
import { BaseButton } from './baseComponents/BaseButton';
// import { locationMap } from '../constants.ts';
// import { useNavigate } from 'react-router-dom';
// import { BaseButton } from './baseComponents/BaseButton.tsx';
// import { AppDispatch } from '../store/store.ts';
// import { ReserveDetailsConfirmProps } from './componentProps.ts';
// import { createNewReservation, updateReservation } from '../store/reducerSlices/reservationSlice.ts';


export const ReserveDetailsConfirm = ({ currentUser, range, room, modifyingReservation }: ReserveDetailsConfirmProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const toDate = range.to as Date;
    const fromDate = range.from as Date;


    let resvData;
    let resvId = modifyingReservation ? modifyingReservation.id : undefined;
    if (currentUser) {
        resvData = {
            start_date: new Date(range.from as Date).toISOString("default", { year: "numeric", month: "2-digit", day: "2-digit" }).split(/[T ]/i, 1)[0], 
            end_date: new Date(range.to as Date).toISOString("default", { year: "numeric", month: "2-digit", day: "2-digit" }).split(/[T ]/i, 1)[0], 
            room_id: room.id, 
            location_id: room.attributes.location_id, 
            user_id: currentUser.id
        }
    }   

    const handleSubmit = () => {
        if (!modifyingReservation) {
            dispatch(createNewReservation(resvData))
        } else {
            dispatch(updateReservation({resvId, resvData}))
        }
        navigate('/view-reservations');

    }

    // todo need to do close button and escape to exit modal
    return (
        <div id='BackgroundBlur'>
            {currentUser && room && range &&
                <div id='ReservationDetails'>
                    <h3>Reservation Details for: {currentUser.attributes.first_name}</h3>
                    <p>Room Type: {room.attributes.room_type}</p>
                    <p>Location: {locationMap[room.attributes.location_id]}</p>
                    <p>From: {fromDate.toLocaleDateString()}  To: {toDate.toLocaleDateString()} </p>
                    <p>Email Confirmation: {currentUser.attributes.email}</p>
                    {/* todo incorporate this, this way or a different way */}
                    {/* <button onClick={this.resetRes}>Start Over</button> */}
                    <BaseButton className='reservationButtons' displayText='Confirm Reservation' onClick={handleSubmit} type='submit'/>
                </div>
            }
        </div>
    )
}