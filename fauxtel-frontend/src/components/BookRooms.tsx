import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/Rooms.css';
import '../styles/Common.css';
import '../styles/DayPicker.css'
import { BaseButton } from './baseComponents/BaseButton.tsx';
import { AppDispatch } from '../store/store.ts';
import { BookRoomsProps, Room } from './componentProps.ts';


function BookRooms({ availableRooms, setConfirmingDetails, setRoomSelected }: BookRoomsProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [room, setRoom] = useState<Room | undefined>(undefined);

    const handleSubmit = event => {
        event.preventDefault();
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
                {room && <BaseButton className='reservationButtons' displayText='Reserve this Room' type='submit'/>}
            </form>
        </div>
    )
}

export default BookRooms;