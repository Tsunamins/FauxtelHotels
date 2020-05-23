import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/home.css'

const HomeNavLinks = () => (
    <div className="HomeLinks">
      <span>
        <Link to="/room-types">View Room Types</Link>
      </span>

      <span>
        <Link to="/locations">All Fauxtel Locations</Link>
      </span>

      <span>
        <Link to="/venues">Fauxtel Venues</Link>
      </span>
    </div>
  
  );
  
  export default HomeNavLinks;