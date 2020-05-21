import React from 'react';
import { Link, Route } from 'react-router-dom'

import {connect} from 'react-redux'




function RoomDesc(props) {

 console.log(props)


 
      return(
        <div>
            Some Rooms will go here, per locatin and (coming soon) location?
            Goal to render into diff divs type of room per location and render one more component within each of those that will show the formated display of a room
        </div>
      )

 
}

const mapStateToProps = state => {
    return({
        rooms: state.rooms
    })
}

//export default RoomDesc
export default connect(mapStateToProps)(RoomDesc)