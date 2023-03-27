import {useNavigate} from "react-router-dom";
import Room from "../components/Room";
import WorkPlace from "../components/WorkPlace";
import '../CSS/WorkPlace.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {useState} from "react";

const BookingPage = () => {
    const navigate = useNavigate();
    const options = [
        '1', '2', '3'
    ];
    const [selectedOption, setSelectedOption] = useState();
    const [rooms, setRooms] = useState([]);

    function SetFloor(floor) {
        getRooms(floor).then(async (response) => {
            await setRooms(response);
            setSelectedOption(floor);
            console.log(rooms);
        })
            .catch((e) => {
                console.log(e.message);
            })
    }

    function handleLogout(event) {
        event.preventDefault();

        sessionStorage.setItem('isAuthenticated', 'false');
        navigate("/");
    }

    const getRooms = async (floor) => {
        try {
            return await fetch('http://127.0.0.1:5071/api/Room/getRooms', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT, FETCH',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                },
                body: JSON.stringify({floor: floor, workplaceList: []})
            }).then((response) => response.json());
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h2>BookingPage</h2>
            <form onSubmit={handleLogout}>
                <button type="submit">Logout</button>
                <Dropdown options={options} value={selectedOption} placeholder="Wähle eine Etage"
                          onChange={option => SetFloor(option.value)}/>
                <div className="grid">
                    {selectedOption === "1" && (
                        <>
                            {rooms.map((room) => (
                                <Room sizeX={room.sizeX} sizeY={room.sizeY} column={room.column} row={room.row}
                                      id={room.id}>
                                    <div className="grid-workplace">
                                        {rooms.workplaceList.map((workplace) => (
                                            <WorkPlace sizeX={workplace.sizeX} sizeY={workplace.sizeY} row={workplace.row} column={workplace.column}/>
                                        ))}
                                    </div>
                                </Room>
                            ))}
                        </>
                    )}
                    {selectedOption === "2" && (
                        <>
                            {rooms.map((room) => (
                                <Room sizeX={room.sizeX} sizeY={room.sizeY} column={room.column} row={room.row}
                                      id={room.id}>
                                    <WorkPlace sizeX={40} sizeY={80} row={1} column={1}/>
                                    <WorkPlace sizeX={40} sizeY={80} row={2} column={2}/>
                                </Room>
                            ))}
                        </>
                    )}
                    {selectedOption === "3" && (
                        <>
                            {rooms.map((room) => (
                                <Room sizeX={room.sizeX} sizeY={room.sizeY} column={room.column} row={room.row}
                                      id={room.id}>
                                    <WorkPlace sizeX={40} sizeY={80} row={1} column={1}/>
                                    <WorkPlace sizeX={40} sizeY={80} row={2} column={2}/>
                                </Room>
                            ))}
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

export {
    BookingPage
};