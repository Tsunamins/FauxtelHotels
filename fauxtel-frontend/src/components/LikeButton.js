import React, { useState } from 'react';


export const LikeButton = () => {
    const [hasLikedRoom, setHasLikedRoom] = useState(false);
    const handleOnClick = () => {
        setHasLikedRoom(!hasLikedRoom);
    };

    return (
        <button className='likeButton' onClick={handleOnClick}>
            {hasLikedRoom ? "I like this Room" : "Like Room"}
        </button>
    )
}
