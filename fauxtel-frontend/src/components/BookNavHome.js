import React from 'react';
import { Link } from 'react-router-dom'


const BookNavHome = () => (
    <div>
      <span>
        <Link to="/booknow">Book Now</Link> or <Link to="/rooms">Rooms</Link>
      </span>
    </div>
  
  );
  
  export default BookNavHome;