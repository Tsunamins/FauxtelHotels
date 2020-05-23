import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom'
import Reserve from './Reserve.js'
import {connect} from 'react-redux'
import { getRoom } from '../actions/buildReservation.js'
import '../styles/rooms.css' 


function BookRooms(props) {
  const [room, setRoom] = useState(null)
 

  const handleSelect = event => {
 
    setRoom(event.target.value)
 

  }

  const handleStyle = event => {
    // event.target.style.backgroundColor = '#466eb8';
    // event.target.style.color = 'white';
  }
  
  const handleSubmit = event => {
    event.preventDefault()
    props.getRoom(room)
    
  }

  if(props.availRooms.length > 0){
      return(
        <div>
          <form onSubmit={handleSubmit}>
            
             {props.availRooms.map(room =>
                <div class="radios" key={room.id}>
                   <label className="each-room"  onClick={handleStyle}>{room.attributes.room_type}
                        <input type="radio" key={room.id} id={room.id} name="room" value={room.id} onClick={handleSelect}>
                   
                        </input> 
                    </label>
                </div>
                
             )}
             <input className="button" type="submit" value="Reserve this Room"></input>
           
           </form>
        </div>
      )
  } else {
    return(
      <div></div>
    )
  }
}


export default connect(null, {getRoom})(BookRooms)