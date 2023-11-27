import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/booknow.css'


const BookNavLinks = () => (
    <div className="BookNowLink" onClick={on}>
        <span>
            <Link to="/booknow">Book Now</Link>
        </span>
    </div>

);

const on = () => {
    document.querySelector(".BookNowRoute").style.display = "block";
}

export default BookNavLinks;