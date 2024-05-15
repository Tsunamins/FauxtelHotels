import { useDispatch } from 'react-redux';
import '../styles/Reservations.css';
import { AppDispatch } from '../store/store';
import { ReserveDetailsConfirmProps } from './componentProps';
import { useNavigate } from 'react-router-dom';
import { createNewReservation, updateReservation } from '../store/reducerSlices/reservationSlice';
import { locationMap } from '../constants';
import { BaseButton } from './baseComponents/BaseButton';
import styled from 'styled-components';
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
        <ConfirmModal>
            {currentUser && room && range &&
                <ReservationDetails>
                    <h3>Reservation Details for: {currentUser.attributes.first_name}</h3>
                    <p>Room Type: {room.attributes.room_type}</p>
                    <p>Location: {locationMap[room.attributes.location_id]}</p>
                    <p>From: {fromDate.toLocaleDateString()}  To: {toDate.toLocaleDateString()} </p>
                    <p>Email Confirmation: {currentUser.attributes.email}</p>
                    {/* todo incorporate this, this way or a different way */}
                    {/* <button onClick={this.resetRes}>Start Over</button> */}
                    <ReservationButton displayText='Confirm Reservation' onClick={handleSubmit} type='submit'/>
                </ReservationDetails>
            }
        </ConfirmModal>
    )
}

const ConfirmModal = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(15px);
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1;
`;

const ReservationDetails = styled.div`
    background-color: rgb(14, 125, 129);
    height: 50vh;
    left: 50%;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    z-index: 1;
`;

const ReservationButton = styled(BaseButton)`
    background-color: #33455e5b; /* Green */
    border: 1px solid #335e5c;
    box-shadow: 2px 5px 8px #233437;
    border-radius: 10px;
    color: #6aacd3;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 4px;
    cursor: pointer;
    font-size: 20px;
`;