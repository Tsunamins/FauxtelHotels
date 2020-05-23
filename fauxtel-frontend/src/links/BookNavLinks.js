import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/booknow.css'


const BookNavLinks = () => (
    <div class="BookNowLink">
      <span>
        <Link to="/booknow">Book Now</Link>
      </span>
    </div>
  
  );
  
  export default BookNavLinks;