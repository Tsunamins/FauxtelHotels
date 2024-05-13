import { LocationInfo } from './componentProps';


export function LocationDesc({ location }: LocationInfo) {
    console.log('loc details: ', location)
    return (
        location &&
        <div className='LocationWrapper'>
            <h1>{location.attributes.name} </h1>
            <p>{location.attributes.city}, {location.attributes.state}   </p>
            <p>{location.attributes.description}  </p>
            <p>Number of Rooms: {location.attributes.rooms.length} </p>
        </div>

    );
};
