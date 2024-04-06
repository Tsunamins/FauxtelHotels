import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import 'react-day-picker/dist/style.css';
import '../styles/DayPicker.css';
import { getRooms } from '../store/actions/getRooms.js';
import { getReservations } from '../store/actions/reservations.js';
import { getCurrentUser } from '../store/actions/currentUser.js';
import { checkAvailableRooms, generateDateRange } from './utils/BookingUtils.js';
import BookRooms from './BookRooms.js';
import { ReserveDetailsModal } from './ReserveDetailsModal.js';
import { getRoom } from '../store/actions/buildReservation.js';
import { ReservationButton } from './baseComponents/ReservationButton.js';

// todo, flow type can prob be nixed due to data need if modifying existing reservation
export const BookNow = ({ flowType, modifyingReservation }) => {
    const dispatch = useDispatch();
    const { rooms } = useSelector(state => state.rooms);
    const currentUser = useSelector(state => state.currentUser);
    const reservations = useSelector(state => state.reservations);
    const buildReservationRoom = useSelector(state => state.buildReservation);

    const defaultSelected = {
        from: null,
        to: null
    };
    const [availableRooms, setAvailableRooms] = useState();
    const [filledRange, setFilledRange] = useState([]);
    const [range, setRange] = useState(defaultSelected);
    const [isConfirmingDetails, setConfirmingDetails] = useState(false);
    const [roomSelected, setRoomSelected] = useState();


    useEffect(() => {
        dispatch(getRooms());
        dispatch(getReservations());
        dispatch(getCurrentUser());
    }, []);

    // useEffect(() => {
    //     dispatch(getRoom(roomSelected));
    // }, [roomSelected]);

    useEffect(() => {
        if(range.from && range.to) {
            setFilledRange(generateDateRange(range.from, range.to));
        } else {
            setFilledRange([])
        }
    }, [range, range.from, range.to]);

    const handleShowRooms = () => {
        setAvailableRooms(checkAvailableRooms(rooms, filledRange));
    }
    // todo this can get the day and modifiers if applied
    const handleDayClick = (day) => {

        // in range mode this specifies the from day, initially
        // so day.from
        console.log('day???: ', day)
    }

    const today = new Date();
    // todo remember to fix this for any days before
    // const disabledDays = { before: datesToRooms.from, before: today  };j
    // also todo, something is off with selecting a new range after initial selection in the calendar itself
    // when clicking back on the first day of the range says range is undefined
    // make an handleDateSelection function to pass in/debug
    // can only do custom non state function with onDayClick prop
    // should maybe restart if clicking on a same day, or a 3rd click will reset all
    // maybe a few different scenarios that have an intuitive feel like calendar pickers often do (or they try to)
    // maybe a long term todo - re-envision or provide an alternative date selection interface - maybe not a calendar range selection but some type of pop-ups
    

    return (
        <div>
            <DayPicker
                className="Range"
                mode='range'
                numberOfMonths={2}
                // disabled={disabledDays}
                selected={range}
                // onSelect={setRange}
                onSelect={handleDayClick}

            />
            <div className="SelectionText">
                {!range.from && !range.to && 'Please select the first day.'}
                {range.from && !range.to && 'Please select the last day.'}
                {range.from && range.to && `Selected from ${range.from.toLocaleDateString()} to ${range.to.toLocaleDateString()}`}{' '}

                {range.from && range.to && (
                    <ReservationButton displayText='Reset' onClick={() => setRange(defaultSelected)} />
                )}

                {range.from && range.to && (
                    <ReservationButton displayText='Show Rooms' onClick={handleShowRooms} />
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