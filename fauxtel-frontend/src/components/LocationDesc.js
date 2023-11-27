import React from 'react';


export function LocationDesc({ loc }) {
    return (
        loc ?
            <div className='LocationWrapper'>
                <h1>{loc.attributes.name} </h1>
                <p>{loc.attributes.city}, {loc.attributes.state}   </p>
                <p>{loc.attributes.description}  </p>
                <p>Number of Rooms: {loc.attributes.rooms.length} </p>
            </div> :
            <div>Loc display issue</div>
    )


}
