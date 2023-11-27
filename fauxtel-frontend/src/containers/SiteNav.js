import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRooms } from '../actions/getRooms.js'
import { getLocs } from '../actions/getLocations.js'
import '../styles/home.css'


const SiteNav = () => {
        return (
            <ul className="SiteNav">
                <li><Link to="/room-types">View Room Types</Link></li>
                <li><Link to="/locations">All Fauxtel Locations</Link></li>
                <li><Link to="/venues">Fauxtel Venues</Link></li>
            </ul>
        );

    }
// }

const mapStateToProps = (state) => {
    return ({
        rooms: state.rooms,
        locations: state.locations
    })
}


export default connect(mapStateToProps, { getRooms, getLocs })(SiteNav);