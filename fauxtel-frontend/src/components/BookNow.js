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


export const BookNow = () => {
    const dispatch = useDispatch();
    const { rooms } = useSelector(state => state.rooms);
    const currentUser = useSelector(state => state.currentUser);
    const reservations = useSelector(state => state.reservations);

    // new per latest docs
    const defaultSelected = {
        from: null,
        to: null
    };
    const [availableRooms, setAvailableRooms] = useState();
    const [filledRange, setFilledRange] = useState([]);
    const [range, setRange] = useState(defaultSelected);

    useEffect(() => {
        dispatch(getRooms());
        dispatch(getReservations());
        // dispatch(getCurrentUser());
    }, []);

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
    // const disabledDays = { before: datesToRooms.from, before: today  };

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
            <div className="SelectionText Instructions">
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

            <BookRooms availableRooms={availableRooms} />
        </div>
    );
}