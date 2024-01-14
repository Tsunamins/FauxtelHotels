import React from 'react';

import { connect } from 'react-redux';
import { Link, NavLink, Route, Switch, withRouter } from 'react-router-dom';
import { getUserReservations } from '../actions/buildReservation.js';
import '../styles/userresv.css';


const UserReservations = (props) => {
  //sometimes error, maybe if currentUser === false use above getUserReservations call
    const userResv = props.currentUser && props.currentUser.attributes.reservations.map(r => 
          <li key={r.id} >
            <Link className='reservationLink' to={`/view-reservations/${r.id}`}>From: {r.start_date} To: {r.end_date}</Link>
          </li>
        )

    return(
      <>
        {props.currentUser && userResv.length > 0 ? 
        <div className="UserResv">
          <h1>My Reservations</h1>
             {userResv}
         </div>
         :
         <></>
        }
      </>
    )
 }

 const mapStateToProps = (state) => {
    
    return ({
        currentUser: state.currentUser,
        loggedIn: !!state.currentUser,

    })
  }
 export default connect(mapStateToProps)(UserReservations)