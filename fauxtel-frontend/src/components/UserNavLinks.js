import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const UserNavLinks = ({currentUser, loggedIn}) => (
  <div>
  
     
     { loggedIn ? 
                   
                   <>
                          <Link to="/view-reservations">View My Reservations</Link>
                   
                          </> 
                : 
                <>
                      <Link to="/signup">Sign Up</Link> <br></br>
                      
                      <Link to="/login">Log In</Link>
               </> 
              

                 }
           
               
  </div>




);

const mapStateToProps = ({currentUser}) => {
    
  return ({
      currentUser,
    
    loggedIn: !!currentUser
   
  })
}
//{getUserReservations}
export default connect(mapStateToProps)(UserNavLinks);