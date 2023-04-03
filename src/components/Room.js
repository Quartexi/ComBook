import '../CSS/Room.css';

const Room = ({children, sizeX, sizeY, row, column, id}) => {
    const squareStyle = {
        gridRow: `${row}`,
        gridColumn: `${column}`,
        id: `${id}`,
    };
    return <div className="square" style={squareStyle}>
        {children}
    </div>;
}

export default Room;