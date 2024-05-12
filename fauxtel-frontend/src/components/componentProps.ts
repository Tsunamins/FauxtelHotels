import { Dispatch } from "react";
import { Matcher } from "react-day-picker";


export interface LogoutProps {
    setLoggedInUser: Dispatch<boolean>;
}

export interface Reservation {
    id: number;
    start_date: string | Date;
    end_date: string | Date;
    date_range: string[] | Date[];
    user_id: number;
    room_id: number;
    location_id: number;
    created_at: string | Date;
    updated_at: string | Date;
}

export interface ReservationView {
    reservation: Reservation;
}

export interface LocationDetails {
    id: number;
    name: string;
    city: string;
    state: string;
    address: string;
    phone: string;
    description: string;
    created_at: string | Date;
    updated_at: string | Date;
}

export interface LocationAttributes {
    name: string;
    city: string;
    state: string;
    description: string;
    rooms: Room[];
}

export interface LocationInfo {
    location: {
        id: number;
        type: string;
        attributes: LocationAttributes;
    }

}

export interface RoomAttributes {
    room_number: number;
    room_type: string;
    location_id: number;
    occupied_dates: string[] | Date[];
    status: string;
    description: string;
    reservations: Reservation[];
    location: LocationDetails;
}

export interface Room {
    id: number;
    room_number: number;
    room_type: string;
    location_id: number;
    occupied_dates: Date[];
    status: string;
    description: string;
    created_at: string | Date;
    updated_at: string | Date;
    attributes: RoomAttributes;
}


export interface UserAttributes {
    email: string;
    first_name: string;
    last_name: string;
    reservations: Reservation[];
    rooms: Room[];
}

export interface User {
    id: string | number;
    type: string;
    attributes: UserAttributes
}

export interface BookNowProps {
    modifyingReservation?: Reservation;
    modifyingRange?: Range;
}

export interface Range {
    from: Matcher | Matcher[] | undefined;
    to: Matcher | Matcher[] | undefined;
}

export interface ReserveDetailsConfirmProps {
    currentUser: User | null;
    range: Range;
    modifyingReservation?: Reservation;
    room: Room;
}

export interface BookRoomsProps {
    availableRooms: Room[];
    setConfirmingDetails: Dispatch<boolean>;
    setRoomSelected: Dispatch<Room | undefined>;
}



