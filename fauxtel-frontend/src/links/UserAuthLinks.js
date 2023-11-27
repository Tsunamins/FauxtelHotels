import React from 'react';
import { Link } from 'react-router-dom';

// todo maybe just move this out to where it's used
export const UserAuthLinks = () => (
    <ul className="SignUpLogin">
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Log In</Link></li>
    </ul>
);
