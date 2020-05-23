import React from 'react';
import { Link, Route } from 'react-router-dom'

import {connect} from 'react-redux'




function RoomDesc(props) {

 console.log(props)
console.log(props.roomDetails)
const d = props.roomDetails
        
      return(
        <div>
              <div key={d.id} className="roomdets" id={d.room_type}>
                <p>{d.room_type}, but probably use id to set inner content to a better looking name presentation</p>
                <p>{d.description}</p>
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

//export default RoomDesc
export default connect(mapStateToProps)(RoomDesc)