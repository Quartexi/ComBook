import '../CSS/Room.css';

const Room = ({children, sizeX, sizeY, row, column, id}) => {
    const squareStyle = {
        width: `${sizeX}px`,
        height: `${sizeY}px`,
        gridRow: `${row} / span 1`,
        gridColumn: `${column} / span 1`,
        id: `${id}`,
    };
    return <div className="square" style={squareStyle}>
        {children}
    </div>;
}

export default Room;