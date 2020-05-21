import React, { useState } from 'react';

import {connect} from 'react-redux'
import { createReservation } from '../actions/reservations.js'
import {modifyReservation} from '../actions/reservations.js'
//import { startOver } from '../actions/buildReservation.js'
import currentUser from '../reducers/currentUser.js';
import { getCurrentUser } from '../actions/currentUser.js'


class Reserve extends React.Component {
 

  state = {
      start_date: "",
    end_date: "",
    date_range: "",
    room_id: "",
    location_id: "",
    user_id: ""
  }

handleDetails = () => {
 console.log(this.props)
  const room = this.props.reserve.room[0]
  console.log(room)
  const user = this.props.currentUser

  this.setState({
    start_date: sessionStorage.start_date,
    end_date: sessionStorage.end_date,
    date_range: sessionStorage.date_range,
    room_id: room.id,
    location_id: room.location_id,
    user_id: user.id
  })
}


 
  
handleSubmit = event => {
  event.preventDefault()

  this.props.createReservation(this.state)
 
  this.setState({
        start_date: "",
        end_date: "",
        date_range: "",
        room_id: "",
        location_id: "",
        user_id: ""
        
  })
}
  
  
 
  render () {
  //if(currentUser !== null){
    console.log(this.props)
    console.log(this.state)
    const currentUser = this.props.currentUser
    const room = this.props.reserve.room[0]
    if(this.props.loggedIn){

      return(
        <div>
          <h3>Reservation Details for: {currentUser.attributes.first_name}</h3>
          <p>Room Type: {room.room_type}</p>
          <p>Location: {room.location_id}</p>
          <p>From: {sessionStorage.getItem('start_date')}  To: {sessionStorage.getItem('end_date')} </p>
          <p>Email Confirmation: {currentUser.attributes.email}</p>
          <button onClick={this.handleDetails}>Confirm Details</button>
          {/* <button onClick={this.resetRes}>Start Over</button> */}
          <form onClick={this.handleSubmit} >
         

             <input type="submit" value="Confirm Reservation"></input>
           
           </form>
        </div>
      )
 } else {
   return(
     <div></div>
   )
 }
}
}

const mapStateToProps = (state) => {
    
  return ({
      currentUser: state.currentUser,
    
      loggedIn: !!currentUser,
      
   
  })
}




export default connect(mapStateToProps, {createReservation})(Reserve)
