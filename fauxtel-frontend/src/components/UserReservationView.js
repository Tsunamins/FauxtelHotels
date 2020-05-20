import React from 'react'
import {connect, useDispatch} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import ModifyReservation from './ModifyReservation.js'
import {cancelReservation} from '../actions/reservations.js'

import { getRoom } from '../actions/buildReservation.js'


//will prob change to class component here to use state.rooms
//const UserResvView = ({ res }) => {
  class UserResvView extends React.Component {  
  //const dispatch = useDispatch();
  componentDidMount(){
   
    this.props.getRoom()
  }

  handleCancel = () => {
    
    this.props.cancelReservation(this.props.res.id)
    this.props.history.push("/")
  }
    
  render(){
    console.log(this.state)
    console.log(this.props)
    
    const res = this.props.res
    console.log(res)
    // const room = this.props.getRoom(res.room_id)
    // console.log(room)
  return (

    
     res ?
      <div>
        <h3>Location: {res.location_id}</h3>
        <p>Room ID, later to be room type: {res.room_id}</p>
        <p>From: {res.start_date}</p>
        <p>To: {res.end_date}</p>
        <Link to={`/modify-reservation/${res.id}/edit`}>Modify Reservation</Link>
        <br></br>
        <br></br>
       <button onClick={this.handleCancel}>Cancel Reservation</button>
      </div> :
      <p>!Res</p>
  )
}
}

const mapStateToProps = state => {
  console.log(state)
  return {
    rooms: state.rooms,
  
  }
}

const mapDispatchToProps = dispatch => {
  return {
      getRoom: () => { dispatch(getRoom()) },
      cancelReservation: () => { dispatch(cancelReservation()) },
      
  }
}

//export default UserResvView
export default connect(mapStateToProps, mapDispatchToProps)(UserResvView)