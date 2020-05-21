import React, { useState } from 'react';

import {connect} from 'react-redux'
import { createReservation } from '../actions/reservations.js'
import {modifyReservation} from '../actions/reservations.js'

import {clearBuild} from '../actions/buildReservation.js'
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
 
  const room = this.props.reserve.room[0]

  const user = this.props.currentUser
 

  this.setState({
    start_date: sessionStorage.start_date,
    end_date: sessionStorage.end_date,
    date_range: sessionStorage.date_range,
    room_id: room.id,
    location_id: room.location_id,
    user_id: user.id,
   
  })
}


 
  
handleSubmit = event => {
  event.preventDefault()

  const modifying = this.props.buildReservation.resv.length
  const resv_id = modifying ? this.props.buildReservation.resv[0].id : null
 
  if(modifying === 1){
   
    this.props.modifyReservation(resv_id, this.state)
   
  } else {
     this.props.createReservation(this.state)
  }


  this.props.clearBuild()
  this.props.history.push("/")


 
  this.setState({
        start_date: "",
        end_date: "",
        date_range: "",
        room_id: "",
        location_id: "",
        user_id: "",
        updating_id: null
        
  })
  
}
  
  
 
  render () {
 
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
     <div>Idea was here to incorporate a reservation confirmation code to allow user's to not have to login or have an acct to make a resv</div>
   )
 }
}
}

const mapStateToProps = (state) => {
    
  return ({
      currentUser: state.currentUser,
    
      loggedIn: !!currentUser,

      buildReservation: state.buildReservation
      
   
  })
}

export default connect(mapStateToProps, {createReservation, modifyReservation, clearBuild})(Reserve)
