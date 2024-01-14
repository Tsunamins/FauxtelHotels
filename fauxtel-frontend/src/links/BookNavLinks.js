import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/booknow.css'


const BookNavLinks = () => (
    <div className="BookNowOval">
        <span>
            <Link id='BookNowOvalLink' to="/booknow">Book Now</Link>
        </span>
    </div>

);

export default BookNavLinks;