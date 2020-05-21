import React from 'react';

import {connect} from 'react-redux'
import { Link, NavLink, Route, Switch, withRouter } from 'react-router-dom'
import { getUserReservations } from '../actions/buildReservation.js'
import UserResvView from './UserReservationView.js'

const UserResv = (props) => {
    const userResv = props.currentUser.attributes.reservations.map(r => 
          <li key={r.id}>
            <Link to={`/view-reservations/${r.id}`}>From: {r.start_date} To: {r.end_date}</Link>
          </li>
   
        )

    return(
        <div className="UserResv">
       
             {userResv}
             
         </div>
    )
 }

 const mapStateToProps = (state) => {
    
    return ({
        currentUser: state.currentUser,
        loggedIn: !!state.currentUser,

    })
  }
 export default connect(mapStateToProps)(UserResv)