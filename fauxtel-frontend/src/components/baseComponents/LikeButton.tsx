import { useState } from 'react';
import styled from 'styled-components';


export const LikeButton = () => {
    const [hasLikedRoom, setHasLikedRoom] = useState(false);

    return (
        <LikeStyling onClick={() => setHasLikedRoom(!hasLikedRoom)}>
            {hasLikedRoom ? "I like this Room" : "Like Room"}
        </LikeStyling>
    );
};


const LikeStyling = styled.button`
    background-color: transparent;
    border: 1px solid #c9dcb3;
    margin-top: 10px;
    padding: 10px;
    color: #c9dcb3;
`;
