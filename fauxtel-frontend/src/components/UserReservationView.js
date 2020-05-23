import React from 'react'
import {connect} from 'react-redux'
import {cancelReservation} from '../actions/reservations.js'
import BookNow from './BookNow.js'
import { getResv } from '../actions/buildReservation.js'
import '../styles/modifying.css'





  class UserResvView extends React.Component {  
    // componentDidMount(){
    //   this.props.getReservations()
    // }

    state = {
      renderModify: false
    }

  handleCancel = () => {
    console.log(this.props.res.id)
    this.props.cancelReservation(this.props.res.id)
    this.props.history.push("/")
  }

  handleModify = () => {
    console.log(this.state)
    console.log(this.props.res)
    this.props.getResv(this.props.res.id)
    this.setState({
      renderModify: true
    })
   
  }
    
  render(){
   
    const modify = this.state.renderModify
    const res = this.props.res
    const roomChosen = this.props.buildReservation.room.length
    const resvChosen = this.props.buildReservation.resv.length
   
    
     if(roomChosen === 1){
       //Could maybe add a modifying statement here, or a resv changes statement
      return(<div></div>)
      } else {
          return (

            res ?
              <>
                <div className="ModifyingReservation">
                  { modify ? <h3>You are Modifying </h3> : null}
                  <h3>Location: {res.attributes.location.name}</h3>
                  <p>Room Type: {res.attributes.room.room_type}</p>
                  <p>From: {res.attributes.start_date}</p>
                  <p>To: {res.attributes.end_date}</p>
                  { modify ? <BookNow reservations={this.props.reservations} /> :   
                      <div>
               
                      <button className="button" onClick={this.handleModify}>Modify Reservation</button>
                      <br></br>
                      <button className="button" onClick={this.handleCancel}>Cancel Reservation</button>
                  </div>
                  }
                </div>
              </>
              :
              <div>!Resv Display Issue</div>
          )
        }
      }
    }   

const mapStateToProps = state => {
 
  return {
    rooms: state.rooms,
    reservations: state.reservations,
    buildReservation: state.buildReservation
  
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//       modifyReservation: () => { dispatch(modifyReservation()) },
//       cancelReservation: () => { dispatch(cancelReservation()) },
//       //getReservations: () => { dispatch(getReservations()) },
//       getResv: () => { dispatch(getResv()) }
      
//   }
// }

export default connect(mapStateToProps, {cancelReservation, getResv})(UserResvView)