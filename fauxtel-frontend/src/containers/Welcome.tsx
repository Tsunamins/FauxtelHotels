import styled from "styled-components";

export const Welcome = () => {
    return (
        <WelcomeContainer >
            <h1>Welcome</h1>
        </WelcomeContainer>
    )
}

const WelcomeContainer = styled.div`
    font-size: 35px;
    color: teal;

    @media only screen and (min-width: 600px) {
        font-size: 50px;
    }
`;