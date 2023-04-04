import React, {useState} from 'react';
import '../CSS/WorkPlace.css';

const WorkPlace = ({sizeX, sizeY, row, column, id, bookingid, username, bookid, clicked, infoScreen}) => {

    const [isHovering, setIsHovering] = useState(false);
    const usernameStorage = sessionStorage.getItem('username');

    const squareStyle = {
        width: `${sizeX}px`,
        height: `${sizeY}px`,
        gridRow: `${row}`,
        gridColumn: `${column}`,
        backgroundColor: clicked ? 'green' : (username === usernameStorage ? 'orange' : (bookingid > 0 ? 'red' : (isHovering ? '#CCCCCC' : '#FFFFFF'))),
        cursor: 'pointer',
        id: id,
        bookingid: bookingid,
        username: username
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const handleClick = () => {
        if(bookingid === 0) {
            bookid(id, clicked);
        } else {
            infoScreen(id, bookingid);
        }
    };

    return (
        <div
            className="workplace"
            style={squareStyle}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    );
};

export default WorkPlace;
