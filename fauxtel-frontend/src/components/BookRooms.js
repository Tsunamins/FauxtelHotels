import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { getRoom } from '../actions/buildReservation.js'
import '../styles/rooms.css'


function BookRooms(props) {
    const dispatch = useDispatch();
    const [room, setRoom] = useState(null);

    const handleSelect = event => {
        console.log('event target value: ', event.target.value)
        setRoom(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(getRoom(room));
    }

    return (
        <div id='BookableRooms'>
            <form onSubmit={handleSubmit}>
                {props.availRooms.length > 0 && props.availRooms.map(room =>
                    <div className="radios" key={room.id}>
                        <label className="each-room">{room.attributes.room_type}
                            <input type="radio" key={room.id} id={room.id} name="room" value={room.id} onClick={handleSelect} />
                        </label>
                    </div>
                )}
                <input className="button" type="submit" value="Reserve this Room"></input>
            </form>
        </div>
    )
}

export default BookRooms;