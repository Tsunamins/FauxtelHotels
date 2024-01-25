import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRoom } from '../actions/buildReservation.js';
import '../styles/rooms.css';
import '../styles/Common.css';
import '../styles/DayPicker.css'


function BookRooms({ availableRooms }) {
    const dispatch = useDispatch();
    const [room, setRoom] = useState(null);

    const handleSelect = event => {
        setRoom(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(getRoom(room));
    };

    return (
        <div id='BookableRooms'>
            <form onSubmit={handleSubmit}>
                {availableRooms && availableRooms.length > 0 && availableRooms.map(room =>
                    <div className='radios' key={room.id}>
                        <label className='eachRoom topicTitle'>{room.attributes.room_type}
                            <input id='accent' type='radio' key={room.id} name='room' value={room.id} onClick={handleSelect} />
                        </label>
                    </div>
                )}
                {room && <input className='reservationButtons' type='submit' value='Reserve this Room'></input>}
            </form>
        </div>
    )
}

export default BookRooms;