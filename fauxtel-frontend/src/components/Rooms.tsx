import { useSelector } from 'react-redux';
import { selectAllLocations } from '../store/reducerSlices/locationsSlice';
import { LikeButton } from './baseComponents/LikeButton';
import styled from 'styled-components';


export function Rooms() {
    const locations = useSelector(selectAllLocations);
    return (
        <RoomsList>
            <PageHeader>Rooms</PageHeader>
            {locations.map(l =>
                <FeaturedRooms key={l.attributes.name}>
                    <div>Rooms Featured at {l.attributes.name} </div>
                    {l.attributes.rooms.map(room =>
                        <DetailsHeader key={room.room_type}>
                            <DetailsLine>{room.room_type}</DetailsLine>
                            <DetailsLine>{room.description}</DetailsLine>
                            <LikeButton />
                        </DetailsHeader>
                    )}
                </FeaturedRooms>
            )}
        </RoomsList>
    );
};

const RoomsList = styled.div`
    margin-top: 50px;
    margin-bottom: 100px;
`;

const FeaturedRooms = styled.div`
    margin-bottom: 50px;
    color: #C9E4CA;
`;

const PageHeader = styled.h1`
    font-size: 50px;
    color: teal;
`;

const DetailsHeader = styled.h3`
    color: #C9E4CA;
`;

const DetailsLine = styled.p`
    color: #C9E4CA;
`;
