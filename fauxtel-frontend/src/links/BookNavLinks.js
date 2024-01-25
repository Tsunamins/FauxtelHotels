import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BookNow.css';

// todo on all links dir - maybe move out if not too complicated after simplifying
export const BookNavLinks = () => (
    <div className="BookNowOval">
        <span>
            <Link id='BookNowOvalLink' to="/booknow">Book Now</Link>
        </span>
    </div>
);
