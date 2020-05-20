import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Logout from '../components/Logout'

const UserNavLinks = ({ currentUser, loggedIn }) => (

  <div>   
       <NavLink to="/view-reservations">View My Reservations</NavLink>
       {/* next would also want a view user info link */}
       { loggedIn ? <><p id="loggedin">Logged in as {currentUser.attributes.first_name}</p><Logout/></> : null}
  </div>
);

const mapStateToProps = ({ currentUser }) => {
  return {
    currentUser,
    loggedIn: !!currentUser
  }
}

export default connect(mapStateToProps)(UserNavLinks)