import { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReservationView } from './componentProps';
import { AppDispatch } from '../store/store';
import { cancelReservation } from '../store/reducerSlices/reservationSlice';
import { locationMap, roomMap } from '../constants';
import { BookNow } from './BookNow';
import { BaseButton } from './baseComponents/BaseButton';
import styled from 'styled-components';
// import '../styles/Modifying.css';


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
            <PageHeader>Reservation</PageHeader>
            {reservation &&
                <ModifyReservationContainer>
                    {isModing ? <ModifyingAlert >You are Modifying </ModifyingAlert> : null}
                    <DetailsHeader>Location: {locationMap[reservation.location_id]}</DetailsHeader>
                    <DetailsLine>Room Type: {roomMap[reservation.room_id]}</DetailsLine>
                    <DetailsLine>From: {reservation.start_date as ReactNode}</DetailsLine>
                    <DetailsLine>To: {reservation.end_date as ReactNode}</DetailsLine>
                    {isModing ? <BookNow modifyingReservation={reservation} modifyingRange={existingRange} />
                        :
                        <div>
                            <ReservationButton displayText='Modify Reservation' onClick={() => setIsModing(true)} type='button' />
                            <br />
                            <ReservationButton displayText='Cancel Reservation' onClick={handleCancel} type='button' />
                        </div>
                    }
                </ModifyReservationContainer>
            }
        </div>
    );
};

const PageHeader = styled.h1`
    font-size: 50px;
    color: teal;
`;

const ModifyReservationContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
`;

const ModifyingAlert = styled.h3`
    color: orange;
`;

const DetailsHeader = styled.h3`
    color: #C9E4CA;
`;

const DetailsLine = styled.p`
    color: #C9E4CA;
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


