import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-day-picker/dist/style.css';
import '../styles/DayPicker.css';
import { BookNowProps, Range, Room } from './componentProps';
import { AppDispatch, RootState } from '../store/store';
import { fetchRooms, selectAllRooms } from '../store/reducerSlices/roomsSlice';
import { selectCurrentUser } from '../store/reducerSlices/currentUserSlice';
import { Matcher } from 'react-day-picker';
import { checkAvailableRooms, generateDateRange } from './utils/BookingUtils';
import { DateSelection } from './baseComponents/DateSelection';
import { CalendarSelection } from './baseComponents/CalendarSelection';
import { BaseButton } from './baseComponents/BaseButton';
import BookRooms from './BookRooms';
import { ReserveDetailsConfirm } from './ReserveDetailsConfirm';


export const BookNow = ({ modifyingReservation, modifyingRange }: BookNowProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const rooms = useSelector(selectAllRooms);
    const roomsStatus = useSelector<RootState>((state) => state.rooms.status);
    const currentUser = useSelector(selectCurrentUser);

    const defaultSelected: Range = {
        from: undefined,
        to: undefined
    };
    const [availableRooms, setAvailableRooms] = useState<Room[] | []>([]);
    const [filledRange, setFilledRange] = useState<Matcher[]| [] | string[]>([]);
    const [range, setRange] = useState(modifyingRange || defaultSelected);
    const [isConfirmingDetails, setConfirmingDetails] = useState<boolean>(false);
    const [roomSelected, setRoomSelected] = useState<Room | undefined>();
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);

    useEffect(() => {
        if (roomsStatus === 'idle' && rooms < 1) {
            dispatch(fetchRooms());
        }
    }, [roomsStatus, rooms]);

    useEffect(() => {
        if(range.from && range.to) {
            setFilledRange(generateDateRange(range.from as Date, range.to as Date));
        } else {
            setFilledRange([])
        }
    }, [range, range.from, range.to]);

    const handleShowRooms = () => {
        setAvailableRooms(checkAvailableRooms(rooms, filledRange));
    }

    return (
        <div id="BookingInteraction">
            <div>
                {/* todo check more reservation conditions and make sure finding correct matches */}
                {/* also todo, maybe combine these */}
                {/* new todo - would be nice whether directly selecting or not in a range fashio to have a full calendar range view that pops up especially for the second date
                also todo - if clear is selected for dates stop showing rooms, if dates are being re-selectee individually stop showing rooms
                also todo improve the list view of rooms - have a whole adobe creative cloud to work with btw!! */}
                <div id='DateRangeSelection'>
                    <DateSelection setShowCalendar={setShowStartCalendar} showCalendar={showStartCalendar} dateSelected={range.from as Date} dateRangePoint='Begin' />
                    <DateSelection setShowCalendar={setShowEndCalendar} showCalendar={showEndCalendar} dateSelected={range.to as Date} dateRangePoint='Conclude' />
                </div>
                {showStartCalendar && <CalendarSelection dateRangePoint='Begin' isModing={!!modifyingReservation} setShowCalendar={setShowStartCalendar} setRange={setRange} range={range} />}
                {showEndCalendar && <CalendarSelection dateRangePoint='Conclude' isModing={!!modifyingReservation} setShowCalendar={setShowEndCalendar} setRange={setRange} range={range} />}
                {range.from && range.to && (
                    <BaseButton className='reservationButtons' displayText='Reset' onClick={() => setRange(defaultSelected)} type='button' />
                )}
                {range.from && range.to && (
                    <BaseButton className='reservationButtons' displayText='Show Rooms' onClick={handleShowRooms} type='button'/>
                )}
            </div>
            <BookRooms availableRooms={availableRooms} setConfirmingDetails={setConfirmingDetails} setRoomSelected={setRoomSelected} />
            {isConfirmingDetails && roomSelected &&
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