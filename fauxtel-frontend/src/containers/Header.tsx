import { UserNav } from './UserNav.tsx';
import '../styles/Header.css';
import { Link } from "react-router-dom";
import React from 'react';


export const Header = () => {
    return (
        <header className="HeaderWrapper">
            <div className='FauxtelHeader'>
                <Link to="/"><img className="FauxtelLogo" src='fauxtellogo2.svg' alt="fauxtel hotel logo" /></Link>
                <div className="BookNowOval">
                    <Link id='BookNowOvalLink' to="/booknow">Book Now</Link>
                </div>
                <UserNav />
            </div>

            <div className="NavWrapper">
                <hr className='headerDivider' />
                {/* todo find opportunities like this to not hard code and map over */}
                <ul className="SiteNav">
                    <li><Link to="/room-types">View Room Types</Link></li>
                    <li><Link to="/locations">All Fauxtel Locations</Link></li>
                    <li><Link to="/venues">Fauxtel Venues</Link></li>
                </ul>
            </div>
        </header>
    );
};
