import React from 'react';
import { Link, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import RoomDesc from './RoomDescriptions.js'
import '../styles/roomdesc.css'
import LikeButton from './LikeButton.js'




function Rooms(props) {
    console.log(props)
    const locs = props.locations
    let room_types = []
    const location_divs = locs.map(l => 
       
        <div key={l.id} className="showcaseRooms">
          <div className="RoomTypeList">Rooms Featured at {l.attributes.name} </div>
            {room_types = [...new Set(l.attributes.rooms.map(r => r.room_type))]
            .map(rt => <div className="RoomTitle" id={rt}>
                <LikeButton />

                 <RoomDesc roomDetails={l.attributes.rooms.find(r => r.room_type === rt)} /></div>)}
            
        </div>
 
      )

     return(
        <div>
            <div className="LocationsRooms">
                {location_divs}
                
            </div>
        
        </div>

      )

 
}

//onPointerEnter={handleMouseEnter} onPointerLeave={handleMouseLeave}
// const handleMouseEnter = () =>{
//     document.querySelector(".RoomDetailedDisplay").style.display = "block";
//     console.log("Mouse Has Entered")
//   }
  
//   const handleMouseLeave = () =>{
//     document.querySelector(".RoomDetailedDisplay").style.display = "none";
//     console.log("Mouse has Left")
  
//   }

const mapStateToProps = state => {
    return({
        rooms: state.rooms,
        locations: state.locations
    })
}


export default connect(mapStateToProps)(Rooms)