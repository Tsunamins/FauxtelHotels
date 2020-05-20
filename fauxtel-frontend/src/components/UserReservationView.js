import React from 'react'
import {connect, useDispatch} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import ModifyReservation from './ModifyReservation.js'
import {cancelReservation} from '../actions/reservations.js'
import {modifyReservation} from '../actions/reservations.js'
import BookNow from './BookNow.js'

import { getRoom } from '../actions/buildReservation.js'


//will prob change to class component here to use state.rooms
//const UserResvView = ({ res }) => {
  class UserResvView extends React.Component {  
  //const dispatch = useDispatch();
    state = {
      renderModify: false
    }

  handleCancel = () => {
    
    this.props.cancelReservation(this.props.res.id)
    this.props.history.push("/")
  }

  handleModify = () => {
    console.log(this.state)
    console.log(this.props)
    this.setState({
      renderModify: true



    })
   
  }
    
  render(){
    console.log(this.state)
    console.log(this.props)
    const modify = this.state.renderModify
    const res = this.props.res
    console.log(res)
    // const room = this.props.getRoom(res.room_id)
    // console.log(room)
  return (

   
      res ?

      <div>
         { modify ? <><BookNow/></> : null}
       
        <div>
         
          
          <h3>Location: {res.attributes.location.name}</h3>
          <p>Room Type: {res.attributes.room.room_type}</p>
          <p>From: {res.attributes.start_date}</p>
          <p>To: {res.attributes.end_date}</p>
          <Link to={`/modify-reservation/${res.id}/edit`}>Modify Reservation</Link>
          <button onClick={this.handleModify}>Modify Reservation</button>
          <br></br>
          <br></br>
          <button onClick={this.handleCancel}>Cancel Reservation</button>
        </div>

      </div> 
       :
       <p>!Res</p>
      

  )
}
}

const mapStateToProps = state => {
  console.log(state)
  return {
    rooms: state.rooms,
    reservations: state.reservations
  
  }
}

const mapDispatchToProps = dispatch => {
  return {
      modifyReservation: () => { dispatch(modifyReservation()) },
      cancelReservation: () => { dispatch(cancelReservation()) },
      
  }
}

//export default UserResvView
export default connect(mapStateToProps, mapDispatchToProps)(UserResvView)