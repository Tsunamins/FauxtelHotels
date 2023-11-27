import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import UserNavLinks from '../links/UserNavLinks.js'
import UserAuthLinks from '../links/UserAuthLinks.js'
import Logout from '../components/Logout.js'
import SignUp from '../components/SignUp.js'
import Login from '../components/Login.js'
import { getUserReservations } from '../actions/buildReservation.js'
import { getCurrentUser } from '../actions/currentUser.js'




class UserNav extends React.Component {

    componentDidMount() {
      this.props.getCurrentUser()
    }
  
    render(){
    
      const { loggedIn, currentUser} = this.props

      //current serializer can either get all reservations.rooms passed to next component

       const allReservations = this.props.reservations
      
  

      const userReservations = loggedIn ? currentUser.attributes.reservations : []

    
   
      return (
        <div className="User UserNav">
          { loggedIn 
            ? <UserNavLinks userReservations={this.props.currentUser.attributes.reservations}/> 
            : <UserAuthLinks/> 
          }

        </div>
      );
  
    }
  }
  
  const mapStateToProps = state => {
   
    return ({
        reservations: state.reservations,
        currentUser: state.currentUser,
      loggedIn: !!state.currentUser,
      //userReservations: state.currentUser.attributes.reservations
    })
  }
  
  // export default withRouter(connect(mapStateToProps, { getCurrentUser })(UserNav));
  export default connect(mapStateToProps, { getCurrentUser })(UserNav);
