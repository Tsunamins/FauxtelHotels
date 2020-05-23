import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Logout from '../components/Logout'
import '../App.css'

const UserNavLinks = ({ currentUser, loggedIn }) => (
  <div className="Wrapper" >
    <div className="UserLoggedIn">
      { loggedIn ? <><li id="loggedin">Logged in as {currentUser.attributes.first_name} </li><li><Logout/></li></> : null}
    </div>
    <div class="UserLinks">
      <li><NavLink to="/view-reservations">View My Reservations</NavLink></li> 
      
        {/* next would also want a view user info link */}
    </div> 
  </div>
);

const mapStateToProps = ({ currentUser }) => {
  return {
    currentUser,
    loggedIn: !!currentUser
  }
}

export default connect(mapStateToProps)(UserNavLinks)