import React from 'react';
import { Link, Route } from 'react-router-dom'

import {connect} from 'react-redux'
import '../styles/roomdesc.css'



function RoomDesc(props) {


const d = props.roomDetails
        
      return(
        <div className="RoomDetailedDisplay" >
              <div key={d.id} >
             
                <p className="description">{d.description}</p>
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