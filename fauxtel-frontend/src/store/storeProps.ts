export interface ReservationPayload {
    start_date: string | Date;
    end_date: string | Date;
    room_id: number;
    location_id: number;
    user_id: number | string;
}

export interface ReservationUpdatePayload {
    resvId?: number;
    resvData: ReservationPayload;
}

export interface UserCreateCreds {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface UserCreateWrapper {
    user: UserCreateCreds
}
export interface UserCreds {
    email: string;
    password: string;
}

export type ResponseData = {
    status: number;
    data: any;
    headers: Headers;
    url: string;
}