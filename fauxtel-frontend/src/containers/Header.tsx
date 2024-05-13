import { Link } from "react-router-dom";
import styled from 'styled-components';
import { UserNav } from './UserNav';


export const Header = () => {
    return (
        <StyledHeader>
            <LogoBookNow>
                <Link to="/"><LogoStyling src='fauxtellogo2.svg' alt="fauxtel hotel logo" /></Link>
                <BookNowOval>
                    <BookNowLink to="/booknow">Book Now</BookNowLink>
                </BookNowOval>
            </LogoBookNow>
            <UserNav />

            <NavContainer>
                    <div><Link to="/room-types">Rooms</Link></div>
                    <div><Link to="/locations">Locations</Link></div>
                    <div><Link to="/venues">Venues</Link></div>
            </NavContainer>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    display: flex;
    flex-direction: column;
`;

const LogoBookNow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media only screen and (min-width: 600px) {
        justify-content: unset;
        column-gap: 175px;
    }
`;

const NavContainer = styled.div`
    align-items: center;
    align-self: flex-start;
    background-color: rgb(32, 28, 34);
    display: flex;
    flex-direction: row;
    font-size: 20px;
    margin-left: -10px;
    padding: 10px;

    @media only screen and (min-width: 600px) {
        min-width: 75%;
    }

`;

const LogoStyling = styled.img`
    align-self: start;
    animation: fadeIn 5s, slideIn 5s;
    display: flex;
    height: 15vh;
    pointer-events: none;
    margin-left: -20px;
    margin-top: -20px;
    width: 15vh;

    @keyframes fadeIn {
        60% {
            opacity: 0;
        }
    
        100% {
            opacity: 1;
        }
    }
    
    @keyframes slideIn {
        50% {
            transform: translateX(50%);
        }
    
        100% {
            transform: translateX(0);
        }
    }

    @media only screen and (min-width: 600px) {
        width: 20vh;
        height: 20vh;
    }
`;

const BookNowOval = styled.div`
    background-color: #edad6d;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 50px;
    justify-content: center;
    margin-top: -10px;
    padding: 5px;
    text-align: center;
    width: 500px;

    & > a {
        color: rgb(6, 57, 53);
    }

    &:hover {
        background-color: #3b7be3;
        color: #f2d2c2;
    }
`;

const BookNowLink = styled(Link)`
    color: rgb(6, 57, 53);    
    font-size: 20px;

    &:hover {
        color: #f2d2c2;
    }
`;