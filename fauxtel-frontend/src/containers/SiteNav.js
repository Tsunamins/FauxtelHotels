import React from 'react';
import { Link } from 'react-router-dom';


export const SiteNav = () => {
    return (
        <ul className="SiteNav">
            <li><Link to="/room-types">View Room Types</Link></li>
            <li><Link to="/locations">All Fauxtel Locations</Link></li>
            <li><Link to="/venues">Fauxtel Venues</Link></li>
        </ul>
    );

}
