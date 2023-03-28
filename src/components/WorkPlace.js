import React, {useState} from 'react';
import '../CSS/WorkPlace.css';

const WorkPlace = ({sizeX, sizeY, row, column, id}) => {
    const [clicked, setClicked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const squareStyle = {
        width: `${sizeX}px`,
        height: `${sizeY}px`,
        gridRow: `${row} / span 1`,
        gridColumn: `${column} / span 1`,
        backgroundColor: clicked ? 'green' : isHovering ? '#CCCCCC' : '#FFFFFF',
        cursor: 'pointer',
        id: id
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const handleClick = () => {
        setClicked(!clicked);
        console.log(id);
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
