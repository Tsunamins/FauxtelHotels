import React, { useState } from 'react';

import {connect} from 'react-redux'
import { createReservation } from '../actions/reservations.js'
import currentUser from '../reducers/currentUser.js';
import { getCurrentUser } from '../actions/currentUser.js'


class Reserve extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleDetails = this.handleDetails.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {    
    start_date: "",
    end_date: "",
    date_range: "",
    room_id: "",
    location_id: "",
    }
  }

handleDetails() {
 
  const room = this.props.reserve.room[0]
 console.log(sessionStorage)
  this.setState({
    start_date: sessionStorage.start_date,
    end_date: sessionStorage.end_date,
    date_range: sessionStorage.date_range,
    room_id: room.id,
    location_id: room.location_id
  })
 
}
 
  
handleSubmit = event => {
  event.preventDefault()
  console.log(this.state)
  this.props.createReservation(this.state)
  this.setState({
        start_date: "",
        end_date: "",
        date_range: "",
        room_id: "",
        location_id: "",
        
  })
}
  
  
 
  render () {
  //if(currentUser !== null){
    console.log(this.props)
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
  
