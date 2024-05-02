import { useDispatch } from 'react-redux';
import '../styles/Reservations.css';
import { locationMap } from '../constants';
import { createReservation } from '../store/actions/reservations';
import { modifyReservation } from '../store/actions/reservations';
import { useNavigate } from 'react-router-dom';
import { ReservationButton } from './baseComponents/ReservationButton';

// todo right now modifying reservation is the id - so will need to change
export const ReserveDetailsModal = ({ currentUser, flowType, range, room, modifyingReservation }) => {
    console.log('modify reservation data in modal: ', range)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // todo, maybe package object before this component and send as one variable
    const handleSubmit = () => {
        if (flowType === 'new') {
            dispatch(createReservation(
                {
                    start_date: range.from, 
                    end_date: range.to, 
                    room_id: room.id, 
                    location_id: room.location_id, 
                    user_id: currentUser.id
                }
            ))
        } else {

            dispatch(modifyReservation(
                modifyingReservation.id,                 
                {
                    start_date: range.from, 
                    end_date: range.to, 
                    room_id: room.id, 
                    location_id: room.location_id, 
                    user_id: currentUser.id
                }
            ))
        }
        navigate('/view-reservations');

    }

    // todo need to do close button and escape to exit modal
    return (
        <div id='BackgroundBlur'>
            {currentUser && room && range &&
                <div id='ReservationDetails'>
                    <h3>Reservation Details for: {currentUser.attributes.first_name}</h3>
                    <p>Room Type: {room.room_type}</p>
                    <p>Location: {locationMap[room.location_id]}</p>
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