import styled from 'styled-components';
import { LocationInfo } from './componentProps';


export function LocationDesc({ location }: LocationInfo) {
    return (
        location &&
        <LocationWrapper>
            <h1>{location.attributes.name} </h1>
            <p>{location.attributes.city}, {location.attributes.state}   </p>
            <p>{location.attributes.description}  </p>
            <p>Number of Rooms: {location.attributes.rooms.length} </p>
        </LocationWrapper>

    );
};

const LocationWrapper = styled.div`
    margin-top: 50px;
    color: #87bba2;
`;
