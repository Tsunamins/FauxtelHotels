import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const UserAuthLinks = () => (




    <div className="SignUpLogin">
       

        <li><Link to="/signup">Sign Up</Link></li> 
                            
        <li><Link to="/login">Log In</Link></li>

     </div>

);

export default UserAuthLinks