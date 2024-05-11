import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoom } from '../store/actions/buildReservation.js';
import '../styles/Rooms.css';
import '../styles/Common.css';
import '../styles/DayPicker.css'
import { ReservationButton } from './baseComponents/ReservationButton.js';
import { getOneRoom } from '../store/reducerSlices/roomsSlice.ts';


function BookRooms({ availableRooms, setConfirmingDetails, setRoomSelected }) {
    const dispatch = useDispatch();
    const [room, setRoom] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(getOneRoom(room.id));
        setConfirmingDetails(true)
        setRoomSelected(room)
    };

    return (
        <div id='BookableRooms'>
            <form onSubmit={handleSubmit}>
                {availableRooms && availableRooms.length > 0 && availableRooms.map(room =>
                    <div className='radios' key={room.id}>
                        <label className='eachRoom topicTitle'>{room.attributes.room_type}
                            <input id='accent' type='radio' key={room.id} name='room' value={room.id} onClick={() => setRoom(room)} />
                        </label>
                    </div>
                )}
                {room && <ReservationButton displayText='Reserve this Room' type='submit'/>}
            </form>
        </div>
    )
}

export default BookRooms;