import { useSelector } from 'react-redux';
import { selectAllLocations } from '../store/reducerSlices/locationsSlice';
import { LikeButton } from './baseComponents/LikeButton';


export function Rooms() {
    const locations = useSelector(selectAllLocations);
    return (
        <div className="LocationsRooms roomsList">
            <h1 className="pageTitle">Rooms</h1>
            {locations.map(l =>
                <div key={l.attributes.name} className="showcaseRooms">
                    <div className="roomTypeList">Rooms Featured at {l.attributes.name} </div>
                    {l.attributes.rooms.map(room =>
                        <div className="topicTitle" id={room.room_type}>
                            <div className='topicDetail'>{room.room_type}</div>
                            <div className='topicDetail'>{room.description}</div>
                            <LikeButton />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
