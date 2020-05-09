// going to display a link to Book Now
// or going to change the route of the page to booking interface
//going to have available - data regarding login? maybe not sure
//links are going to be specific to reservation#create in backend
import React from 'react';
import { connect } from 'react-redux'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import BookNavHome from '../components/BookNavHome.js'
import BookNow from '../components/BookNow.js'
import BookRoomsData from '../components/BookRoomsData.js'
//import Rooms from '../components/Rooms.js'
import Reservations from '../components/Reservations.js'
//import { getRooms } from '../actions/getRooms.js'
import { getReservations } from '../actions/reservations.js'
import { bindActionCreators } from 'redux';

class BookNav extends React.Component {

    componentDidMount() {
        //this.props.getRooms()
        this.props.getReservations()
    }       

    render(){

    return (
        <div className="BookNav">
           {/* will need some kind of logic to hide this once using it */}
           {/* some of this is temporary for viewing functions of these things */}
           <Switch>
                <Route path="/booknow" render={(routerProps) => <BookNow {...routerProps} rooms={this.props.reservations}/>} >
                </Route>

                {/* <Route path="/rooms" render={(routerProps) => <Rooms {...routerProps} rooms={this.props.rooms}/>} >
                </Route> */}

                <Route path="/reservations" render={(routerProps) => <Reservations {...routerProps} rooms={this.props.reservations}/>} >
                </Route>

            </Switch>
      
           
            <BookNavHome />
              
        </div>
    ) 
}
}


const mapStateToProps = state => {
    console.log(state)
    return {
      //rooms: state.rooms,
      reservations: state.reservations
    }
  }
//   const mapDispatchToProps = dispatch => {
//       return {
//           getRooms,
//           getReservations
//       }
//   }
  
  export default connect(mapStateToProps, {getReservations})(BookNav)
  

