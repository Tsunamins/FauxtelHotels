import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-day-picker/dist/style.css';
import '../styles/DayPicker.css';
import { getRooms } from '../store/actions/getRooms.js';
import { getReservations } from '../store/actions/reservations.js';
import { getCurrentUser } from '../store/actions/currentUser.js';
import { checkAvailableRooms, generateDateRange } from './utils/BookingUtils.js';
import BookRooms from './BookRooms.js';
import { ReserveDetailsConfirm } from './ReserveDetailsConfirm.js';
import { ReservationButton } from './baseComponents/ReservationButton.js';
import { fetchRooms, selectAllRooms } from '../store/reducerSlices/roomsSlice.ts';
import { DateSelection } from './baseComponents/DateSelection.tsx';
import { CalendarSelection } from './baseComponents/CalendarSelection.tsx';
import { selectCurrentUser } from '../store/reducerSlices/currentUserSlice.ts';
import { RootState } from '../store/store.ts';

// interface BookNowProps {
//     modifyingReservation: ;
//     modifyingRange: 
// }

export const BookNow = ({ modifyingReservation, modifyingRange }) => {
    const dispatch = useDispatch();
    const rooms = useSelector(selectAllRooms);
    const roomsStatus = useSelector<RootState>((state) => state.rooms.status);
    const currentUser = useSelector(selectCurrentUser);
    // const reservations = useSelector(state => state.reservations);

    const defaultSelected = {
        from: null,
        to: null
    };
    const [availableRooms, setAvailableRooms] = useState();
    const [filledRange, setFilledRange] = useState([]);
    const [range, setRange] = useState(modifyingRange || defaultSelected);
    const [isConfirmingDetails, setConfirmingDetails] = useState(false);
    const [roomSelected, setRoomSelected] = useState();
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);

    console.log('isConfirmingDetails : ', isConfirmingDetails)
    console.log('room selected result, but not using?? ', roomSelected)
    console.log('current user: ', currentUser)

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

    return (
        <div id="BookingInteraction">
            <div className="">
                {/* todo check more reservation conditions and make sure finding correct matches */}
                {/* also todo, maybe combine these */}
                {/* new todo - would be nice whether directly selecting or not in a range fashio to have a full calendar range view that pops up especially for the second date
                also todo - if clear is selected for dates stop showing rooms, if dates are being re-selectee individually stop showing rooms
                also todo improve the list view of rooms - have a whole adobe creative cloud to work with btw!! */}
                <div id='DateRangeSelection'>
                    <DateSelection setShowCalendar={setShowStartCalendar} showCalendar={showStartCalendar} dateSelected={range.from} dateRangePoint='Begin' />
                    <DateSelection setShowCalendar={setShowEndCalendar} showCalendar={showEndCalendar} dateSelected={range.to} dateRangePoint='Conclude' />
                </div>
                {showStartCalendar && <CalendarSelection dateRangePoint='Begin' isModing={!!modifyingReservation} setShowCalendar={setShowStartCalendar} setRange={setRange} range={range} />}
                {showEndCalendar && <CalendarSelection dateRangePoint='Conclude' isModing={!!modifyingReservation} setShowCalendar={setShowEndCalendar} setRange={setRange} range={range} />}
                {range.from && range.to && (
                    <ReservationButton displayText='Reset' onClick={() => setRange(defaultSelected)} />
                )}
                {range.from && range.to && (
                    <ReservationButton displayText='Show Rooms' onClick={handleShowRooms} />
                )}
            </div>
            <BookRooms availableRooms={availableRooms} setConfirmingDetails={setConfirmingDetails} setRoomSelected={setRoomSelected} />
            {isConfirmingDetails && 
                <ReserveDetailsConfirm 
                    currentUser={currentUser} 
                    range={range}
                    modifyingReservation={modifyingReservation}
                    room={roomSelected} 
                />
            }
        </div>

    );
}