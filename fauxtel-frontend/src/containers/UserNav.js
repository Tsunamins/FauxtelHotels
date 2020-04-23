import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import UserNavHome from '../components/UserNavHome.js'
import Logout from '../components/Logout.js'
import SignUp from '../components/SignUp.js'
import Login from '../components/Login.js'
import { getCurrentUser,  } from '../actions/currentUser.js'


const UserNav = ({currentUser, loggedIn}) => {
// class UserNav extends React.Component {
//     componentDidMount =() => {
//         this.props.getCurrentUser()

//       }

// render(){
//     const { loggedIn } = this.props
//     let currentUser = this.state

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
            <UserNavHome />
            <h2>{ loggedIn ? <><p>Logged in as {currentUser.attributes.first_name}</p><Logout/></> : "Not logged in"}</h2>
            
        </div>
      
    )
//}
}


const mapStateToProps = ({currentUser}) => {
    
    return ({
        currentUser,
      
      loggedIn: !!currentUser
     
    })
  }
  
  export default connect(mapStateToProps)(UserNav);

// export default UserNav