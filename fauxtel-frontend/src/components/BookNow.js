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
import { fetchRooms, selectAllRooms } from '../store/reducerSlices/roomsSlice.js';
import { DateSelection } from './baseComponents/DateSelection.js';
import { CalendarSelection } from './baseComponents/CalendarSelection.js';

// todo, flow type can prob be nixed due to data need if modifying existing reservation
export const BookNow = ({ flowType, modifyingReservation }) => {
    const dispatch = useDispatch();
    // const {rooms} = useSelector(state => state.rooms);
    const rooms = useSelector(selectAllRooms);
    const roomsStatus = useSelector((state) => state.rooms.status);
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
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);

    useEffect(() => {
        dispatch(getRooms());
        dispatch(getReservations());
        dispatch(getCurrentUser());
    }, []);

    useEffect(() => {
        if (roomsStatus === 'idle' && rooms < 1) {
            dispatch(fetchRooms());
        }
    }, [roomsStatus, rooms]);

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

    const today = new Date();
    return (
        <div id="BookingInteraction">
            <div className="">
                {range.from && range.to && (
                    <ReservationButton displayText='Reset' onClick={() => setRange(defaultSelected)} />
                )}

                {/* todo work on close/cancel button and calendar buttons styling */}
                {/* check more reservation conditions and make sure finding correct matches */}
                {/* work on styling more overall */}
                {/* disabled dates for end date need to exclude at least the first day selected */}
                {/* also todo, maybe combine these */}
                <div id='DateRangeSelection'>
                    <DateSelection setShowCalendar={setShowStartCalendar} showCalendar={showStartCalendar} dateSelected={range.from} dateRangePoint='Begin' />
                    <DateSelection setShowCalendar={setShowEndCalendar} showCalendar={showEndCalendar} dateSelected={range.to} dateRangePoint='Conclude' />
                </div>
                {showStartCalendar && <CalendarSelection dateRangePoint='Start' setShowCalendar={setShowStartCalendar} setRange={setRange} range={range} />}
                {showEndCalendar && <CalendarSelection dateRangePoint='End' setShowCalendar={setShowEndCalendar} setRange={setRange} range={range} />}
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