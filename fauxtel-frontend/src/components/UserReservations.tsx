import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Reservations.css';
import { Reservation } from './componentProps';
import styled from 'styled-components';


export const UserReservations = ({ currentUser }) => {
    const userReservations: Reservation[] = currentUser && currentUser.attributes.reservations
    return (
        <UserReservationsList>
            <PageHeader>My Reservations</PageHeader>
            {currentUser && userReservations.length > 0 && userReservations.map(r =>
                <li key={r.id} >
                    <Link to={`/view-reservations/${r.id}`}>From: {r.start_date as ReactNode} To: {r.end_date as ReactNode}</Link>
                </li>
            )}
        </UserReservationsList>
    );
};

const UserReservationsList = styled.div`
    align-items: center;
    color: #C9E4CA;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PageHeader = styled.h1`
    font-size: 50px;
    color: teal;
`;
