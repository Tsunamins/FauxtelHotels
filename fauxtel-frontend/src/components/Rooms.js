import React from 'react';
import { Link, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import RoomDesc from './RoomDescriptions.js'
import '../styles/roomdesc.css'




function Rooms(props) {
    console.log(props)
    const locs = props.locations
    let room_types = []
    const location_divs = locs.map(l => 
       
        <div key={l.id} className="showcaseRooms">
          <div className="RoomTypeList">Rooms Featured at {l.attributes.name} </div>
            {room_types = [...new Set(l.attributes.rooms.map(r => r.room_type))].map(rt => <p id={rt}>{rt} <RoomDesc roomDetails={l.attributes.rooms.find(r => r.room_type === rt)} /></p>)}
            
        </div>
 
      )

     return(
        <div>
            <div>
                {location_divs}
                
            </div>
        
        </div>

      )

 
}

const mapStateToProps = state => {
    return({
        rooms: state.rooms,
        locations: state.locations
    })
}


export default connect(mapStateToProps)(Rooms)