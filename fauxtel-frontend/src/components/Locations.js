import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Locations.css';
import { getLocs } from '../store/actions/getLocations';


export function Locations() {
    const dispatch = useDispatch();
    const locations = useSelector(state => state.locations);

    useEffect(() => {
        dispatch(getLocs());
    }, []);

    return (
        <div className='LocationsList'>
            <h1 className='pageTitle'>Locations</h1>
            {locations.map(l =>
                <li key={l.id}>
                    <Link to={`/locations/${l.id}`}>{l.attributes.name} - {l.attributes.city}</Link>
                </li>
            )}
        </div>
    );
};
