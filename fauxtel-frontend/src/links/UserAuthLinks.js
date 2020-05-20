import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const UserAuthLinks = () => (




    <div>
        <span>

        <Link to="/signup">Sign Up</Link> <br></br>
                            
        <Link to="/login">Log In</Link>

        </span>
     </div>

);

export default UserAuthLinks