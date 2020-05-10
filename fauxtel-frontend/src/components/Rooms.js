import React from 'react';


const Rooms = (props) => {
  console.log(props.availRooms)
  if(props.availRooms.length > 0){
      return(
        <div>
             {props.availRooms.map(room =>
                 <li key={room.id}>Room#: {room.attributes.room_number} Room-Type: {room.attributes.room_type} Room-Location: {room.attributes.location_id}</li>
             )}
        </div>
      )
  } else {
    return(
      <div></div>
    )
  }
}

  export default Rooms;