import { Link } from 'react-router-dom';
import '../styles/Locations.css';
import { useSelector } from 'react-redux';
import { selectAllLocations } from '../store/reducerSlices/locationsSlice';
import styled from 'styled-components';


export function Locations() {

    const locations = useSelector(selectAllLocations);

    return (
        <LocationsList>
            <PageHeader>Locations</PageHeader>
            {locations.length > 0 && locations.map(l =>
                <li key={l.id}>
                    <Link to={`/locations/${l.id}`}>{l.attributes.name} - {l.attributes.city}</Link>
                </li>
            )}
        </LocationsList>
    );
};

const LocationsList = styled.div`
    margin-top: 50px;
`;

const PageHeader = styled.h1`
    font-size: 50px;
    color: teal;
`;