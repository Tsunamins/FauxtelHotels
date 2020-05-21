import React from 'react';
import { Link } from 'react-router-dom'


const HomeNavLinks = () => (
    <div>
      <span>
        <Link to="/room-types">View Room Types</Link>
      </span>
      <br></br>
      <span>
        <Link to="/locations">All Fauxtel Locations</Link>
      </span>
      <br></br>
      <span>
        <Link to="/venues">Fauxtel Venues</Link>
      </span>
    </div>
  
  );
  
  export default HomeNavLinks;