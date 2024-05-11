import { useDispatch } from 'react-redux';
import '../styles/Reservations.css';
import { locationMap } from '../constants';
// import { createReservation } from '../store/actions/reservations';
import { modifyReservation } from '../store/actions/reservations';
import { useNavigate } from 'react-router-dom';
import { ReservationButton } from './baseComponents/ReservationButton';
import { createNewReservation } from '../store/reducerSlices/reservationSlice.ts';

// todo right now modifying reservation is the id - so will need to change
export const ReserveDetailsConfirm = ({ currentUser, range, room, modifyingReservation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('modifying reservation value??? ', modifyingReservation)
    // todo, maybe package object before this component and send as one variable
    const handleSubmit = () => {
        // todo is location_id needed?
        const reservationData = {
            start_date: range.from, 
            end_date: range.to, 
            room_id: room.id, 
            location_id: room.attributes.location_id, 
            user_id: currentUser.id
        }

        console.log('reservation DAta??f ', reservationData)


        if (!modifyingReservation) {
            console.log('this one being called???')
            dispatch(createNewReservation(reservationData))
        } else {
            console.log('or this one??? ')
            dispatch(modifyReservation(
                modifyingReservation.id, reservationData))
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
                    <p>From: {range.from.toLocaleDateString()}  To: {range.to.toLocaleDateString()} </p>
                    <p>Email Confirmation: {currentUser.attributes.email}</p>
                    {/* todo incorporate this, this way or a different way */}
                    {/* <button onClick={this.resetRes}>Start Over</button> */}
                    <ReservationButton displayText='Confirm Reservation' onClick={handleSubmit} type='submit'/>
                </div>
            }
        </div>
    )
}