import '../CSS/Room.css';

const Room = ({children, sizeX, sizeY, row, column, id, name}) => {
    const squareStyle = {
        gridRow: `${row}`,
        gridColumn: `${column}`,
        id: `${id}`,
    };
    return <div className="square" style={squareStyle}>
        <h2 className="roomName">{name}</h2>
        {children}
    </div>;
}

export default Room;