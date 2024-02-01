import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoom } from '../actions/buildReservation.js';
import '../styles/Rooms.css';
import '../styles/Common.css';
import '../styles/DayPicker.css'


function BookRooms({ availableRooms, setConfirmingDetails, setRoomSelected }) {
    const dispatch = useDispatch();
    const [room, setRoom] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();
        // getRoom triggers the dispatch to build the reservation
        dispatch(getRoom(room));
        setConfirmingDetails(true)
        // todo if this is successful this isn't needed
        setRoomSelected(room)
    };

    return (
        <div id='BookableRooms'>
            <form onSubmit={handleSubmit}>
                {availableRooms && availableRooms.length > 0 && availableRooms.map(room =>
                    <div className='radios' key={room.id}>
                        <label className='eachRoom topicTitle'>{room.attributes.room_type}
                            <input id='accent' type='radio' key={room.id} name='room' value={room.id} onClick={() => setRoom(room.id)} />
                        </label>
                    </div>
                )}
                {room && <input className='reservationButtons' type='submit' value='Reserve this Room'/>}
            </form>
        </div>
    )
}

export default BookRooms;