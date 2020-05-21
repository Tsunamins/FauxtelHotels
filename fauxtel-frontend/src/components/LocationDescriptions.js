import React from 'react';
import { Link, Route } from 'react-router-dom'
import {connect} from 'react-redux'




function LocationDesc(props) {

 console.log(props)


 
      return(
        <div>
            Some locations will go here
        </div>
      )

 
}

const mapStateToProps = state => {
    return({
        rooms: state.locations
    })
}

//export default RoomDesc
export default connect(mapStateToProps)(LocationDesc)