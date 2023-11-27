import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import LikeButton from './LikeButton.js'
import { getLocs } from '../actions/getLocations.js';


export function Rooms({ locations }) {
    const dispatch = useDispatch();
    const locationsOfRooms = useSelector(state => state.locations);


    // todo can prob move each of these general get reqs to an App use effect and then get through props again
    useEffect(() => {
        dispatch(getLocs());
    }, []);



    return (
        <div className="LocationsRooms roomsList">
            <h1 className="PageTitle">Rooms</h1>
            {locationsOfRooms.map(l =>
                <div key={l.attributes.name} className="showcaseRooms">
                    <div className="roomTypeList">Rooms Featured at {l.attributes.name} </div>
                    {l.attributes.rooms.map(room =>
                            <div className="RoomTitle" id={room.room_type}>
                                <div className='roomDetails'>{room.room_type}</div>
                                <div className='roomDetails'>{room.description}</div>
                                <LikeButton />
                            </div>
                    )}
                </div>
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return ({
        rooms: state.rooms,
        locations: state.locations
    })
}


// export default connect(mapStateToProps)(Rooms)