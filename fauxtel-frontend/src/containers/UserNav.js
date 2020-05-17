import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import UserNavLinks from '../components/UserNavLinks.js'
import Logout from '../components/Logout.js'
import SignUp from '../components/SignUp.js'
import Login from '../components/Login.js'
import UserResv from '../components/UserReservations.js'
import { getUserReservations } from '../actions/buildReservation.js'



const UserNav = ({currentUser, loggedIn}) => {

    return (
        <div className="UserNav">
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
            </Switch>
            {/* this UserNavHome sets up the links for these routes to refer to */}
            {/* other wise the links in this component need to be listed out further here */}
            <UserNavLinks />
            <h2>{ loggedIn ? 
                    <>
                        <p>Logged in as {currentUser.attributes.first_name}</p>
                        <Logout />
                        <Route path="/view-reservations"> <UserResv /></Route>
                    </> 
                : 
                    "Not logged in"}</h2>    
        </div>
    )
}


const mapStateToProps = ({currentUser}) => {
    
    return ({
        currentUser,
      
      loggedIn: !!currentUser
     
    })
  }
  //{getUserReservations}
  export default connect(mapStateToProps)(UserNav);

