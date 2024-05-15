import { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/Rooms.css';
import '../styles/Common.css';
import '../styles/DayPicker.css'
import { BookRoomsProps, Room } from './componentProps';
import { AppDispatch } from '../store/store';
import { BaseButton } from './baseComponents/BaseButton';
import styled from 'styled-components';


function BookRooms({ availableRooms, setConfirmingDetails, setRoomSelected }: BookRoomsProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [room, setRoom] = useState<Room | undefined>(undefined);

    const handleSubmit = event => {
        event.preventDefault();
        setConfirmingDetails(true)
        setRoomSelected(room)
    };

    return (
        <BookableRooms>
            <form onSubmit={handleSubmit}>
                {availableRooms && availableRooms.length > 0 && availableRooms.map(room =>
                    <div key={room.id}>
                        <RoomLabel>{room.attributes.room_type}
                            <RadioRoom type='radio' key={room.id} name='room' value={room.id} onClick={() => setRoom(room)} />
                        </RoomLabel>
                    </div>
                )}
                {room && <ReservationButton displayText='Reserve this Room' type='submit'/>}
            </form>
        </BookableRooms>
    )
}

export default BookRooms;

const BookableRooms = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const RoomLabel = styled.label`
    border-radius: 25px;
    color: #C9E4CA;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    margin-bottom: 12px;
    padding: 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: fit-content;

`;

const RadioRoom = styled.input`
    accent-color: var(--checked-color);
`;

const ReservationButton = styled(BaseButton)`
    background-color: #33455e5b; /* Green */
    border: 1px solid #335e5c;
    box-shadow: 2px 5px 8px #233437;
    border-radius: 10px;
    color: #6aacd3;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 4px;
    cursor: pointer;
    font-size: 20px;
`;

// todo to work with checked color style sheet had the following so not sure how will work with styled comps:
// html {
//     --color: #999;
//     --checked-color: #13759b;

//     --bg-color: #e8e8e8;
//     font-size: 16px;
// }