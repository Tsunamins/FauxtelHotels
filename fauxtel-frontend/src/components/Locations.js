import React from 'react';
import { Link, Route } from 'react-router-dom'
import {connect} from 'react-redux'




function Locations(props) {

 console.log(props)
 const locationDetails = props.locations.map(l => 
    <li key={l.id}>
      <Link to={`/locations/${l.id}`}>Hotel: {l.attributes.name} To: {l.attributes.city}</Link>
    </li>

  )

 
      return(
        <div>
         
            {locationDetails}
         
        </div>
      )

 
}

const mapStateToProps = state => {
    return({
        locations: state.locations
    })
}


export default connect(mapStateToProps)(Locations)