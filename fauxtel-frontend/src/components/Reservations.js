import React from 'react'
import {Route, Link} from 'react-router-dom' //enables link tags
import { connect } from 'react-redux'
import { getReservations } from '../actions/reservations.js'

class Reservations extends React.Component {

  render() {
      console.log(this.props)
   
 
    return (
      
        <div>
          {/* {this.props.reservations.map(res =>
            
          <li key={res.attributes.id}>Room number: {res.attributes.room_id} Reservations: {res.attributes.map(r => r.date_range)}</li>
              
          )} */}
        </div>
      )
    }
  }
  
  export default connect(null, {getReservations})(Reservations)