// going to display a link to Book Now
// or going to change the route of the page to booking interface
//going to have available - data regarding login? maybe not sure
//links are going to be specific to reservation#create in backend
import React from 'react';
import { connect } from 'react-redux'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import BookNavLinks from '../links/BookNavLinks.js'
import BookNow from '../components/BookNow.js'
import Reserve from '../components/Reserve.js'
import { getRooms } from '../actions/getRooms.js'
import { getReservations } from '../actions/reservations.js'
import { getRoom } from '../actions/buildReservation.js'
import { getCurrentUser } from '../actions/currentUser.js'

class BookNav extends React.Component {

    componentDidMount() {
        this.props.getRoom()
        this.props.getCurrentUser()
        this.props.getRooms()
        this.props.getReservations()
    }       

    render(){
     console.log(this.props)
     
    if(this.props.buildReservation.room.length > 0){
        const reserve = this.props.buildReservation
        const currentUser = this.props.currentUser
     return (
         <div>
            
           
             <Reserve reserve={reserve} />
         </div>
     )       
    } else {
    return (
        <div className="BookNav">
                <Route exact path="/booknow" render={(routerProps) => <BookNow {...routerProps} reservations={this.props.reservations}  />} >
                </Route>
                <BookNavLinks />
        </div>
    ) 
    }
}
 }


const mapStateToProps = state => {
    console.log(state)
    return {
      buildReservation: state.buildReservation,
      reservations: state.reservations,
      currentUser: state.currentUser
    }
  }
  const mapDispatchToProps = dispatch => {
      return {
          getRooms: () => { dispatch(getRooms()) },
          getReservations: () => { dispatch(getReservations()) },
          getRoom: () => { dispatch(getRoom())}, 
          getCurrentUser: () => { dispatch(getCurrentUser())}
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(BookNav)
  

