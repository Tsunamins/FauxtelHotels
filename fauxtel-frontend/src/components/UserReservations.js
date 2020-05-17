import React from 'react';
import {connect} from 'react-redux'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import { getUserReservations } from '../actions/buildReservation.js'

const UserResv = (props) => {
    const userResv = props.currentUser.attributes.reservations.map(r => <p key={r.id}><Link to={`/reservations/${r.id}`}>From: {r.start_date} To: {r.end_date}</Link></p>)
   

    console.log(props)
    function handleShowResv(){
       console.log(props.currentUser.attributes.reservations)
       
    }

    return(
        <div className="UserResv">
             {userResv}
            
         </div>
    )
 }
 

 const mapStateToProps = ({currentUser}) => {
    
    return ({
        currentUser,
      
      loggedIn: !!currentUser
     
    })
  }

 export default connect(mapStateToProps)(UserResv)