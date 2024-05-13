import { useState } from 'react';


export const LikeButton = () => {
    const [hasLikedRoom, setHasLikedRoom] = useState(false);

    return (
        <button className='likeButton' onClick={() => setHasLikedRoom(!hasLikedRoom)}>
            {hasLikedRoom ? "I like this Room" : "Like Room"}
        </button>
    );
};
