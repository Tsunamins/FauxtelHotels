import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Locations.css';



export function Locations({locations}) {

    return (
        <div className='LocationsList'>
            <h1 className='pageTitle'>Locations</h1>
            {locations.length > 0 && locations.map(l =>
                <li key={l.id}>
                    <Link to={`/locations/${l.id}`}>{l.attributes.name} - {l.attributes.city}</Link>
                </li>
            )}
        </div>
    );
};
