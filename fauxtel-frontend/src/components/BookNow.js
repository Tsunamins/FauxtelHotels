import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import 'react-day-picker/dist/style.css';
import '../styles/DayPicker.css';
import { getRooms } from '../actions/getRooms.js';
import { getReservations } from '../actions/reservations.js';
import { getCurrentUser } from '../actions/currentUser.js';
import { checkAvailableRooms, generateDateRange } from './utils/BookingUtils.js';
import BookRooms from './BookRooms.js';
import { ReserveDetailsModal } from './ReserveDetailsModal.js';
import { getRoom } from '../actions/buildReservation.js';

// todo, flow type can prob be nixed due to data need if modifying existing reservation
export const BookNow = ({ flowType, modifyingReservation }) => {
    const dispatch = useDispatch();
    const { rooms } = useSelector(state => state.rooms);
    const currentUser = useSelector(state => state.currentUser);
    const reservations = useSelector(state => state.reservations);
    const buildReservationRoom = useSelector(state => state.buildReservation);
    console.log('mod resv id: ', modifyingReservation)

    const defaultSelected = {
        from: null,
        to: null
    };
    const [availableRooms, setAvailableRooms] = useState();
    const [filledRange, setFilledRange] = useState([]);
    const [range, setRange] = useState(defaultSelected);
    const [isConfirmingDetails, setConfirmingDetails] = useState(false);
    const [roomSelected, setRoomSelected] = useState();
    console.log('room selected in book now: ', roomSelected)


    useEffect(() => {
        dispatch(getRooms());
        dispatch(getReservations());
        dispatch(getCurrentUser());
    }, []);

    // useEffect(() => {
    //     dispatch(getRoom(roomSelected));
    // }, [roomSelected]);

    useEffect(() => {
        setFilledRange(generateDateRange(range.from, range.to));
    }, [range]);

    const handleShowRooms = () => {
        setAvailableRooms(checkAvailableRooms(rooms, filledRange));
    }

    const handleResetClick = () => {
        setRange(defaultSelected);
    };

    const today = new Date();
    // todo remember to fix this for any days before
    // const disabledDays = { before: datesToRooms.from, before: today  };j
    // also todo, something is off with selecting a new range after initial selection in the calendar itself

    return (
        <div>
            <DayPicker
                className="Range"
                mode='range'
                numberOfMonths={2}
                // disabled={disabledDays}
                selected={range}
                onSelect={setRange}
            />
            <div className="SelectionText">
                {!range.from && !range.to && 'Please select the first day.'}
                {range.from && !range.to && 'Please select the last day.'}
                {range.from && range.to && `Selected from ${range.from.toLocaleDateString()} to ${range.to.toLocaleDateString()}`}{' '}

                {range.from && range.to && (
                    <button className="reservationButtons" onClick={handleResetClick}>Reset</button>
                )}

                {range.from && range.to && (
                    <button className="reservationButtons" onClick={handleShowRooms}>Show Rooms</button>
                )}
            </div>
            {/* list out the available rooms that have availability on these dates */}
            <BookRooms availableRooms={availableRooms} setConfirmingDetails={setConfirmingDetails} setRoomSelected={setRoomSelected} />
            {isConfirmingDetails && 
                <ReserveDetailsModal 
                    currentUser={currentUser} 
                    range={range} 
                    flowType={flowType}
                    // todo create a creatingReservation object instead to coincide with this, nix flowType
                    // but remember that modifying can have a different room and location
                    modifyingReservation={modifyingReservation}
                    room={buildReservationRoom.room[0]} 
                />
            }
        </div>

    );
}