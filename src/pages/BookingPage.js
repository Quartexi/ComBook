import {useNavigate} from "react-router-dom";
import Room from "../components/Room";
import WorkPlace from "../components/WorkPlace";
import '../CSS/WorkPlace.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useState} from "react";

const BookingPage = () => {
    const navigate = useNavigate();
    const options = [
        '1', '2', '3'
    ];
    const username = sessionStorage.getItem('username');
    const [selectedOption, setSelectedOption] = useState();
    const [rooms, setRooms] = useState([]);
    const [workPlaceId, setWorkPlaceId] = useState(0);
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState(new Date().toLocaleDateString("de-DE"));

    function SetFloor(floor) {
        getRooms(floor).then(async (response) => {
            await setRooms(response);
            setSelectedOption(floor);
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

    const addDays = async () => {
        const dateTemp = date;
        await dateTemp.setDate(date.getDate() + 1);
        await setDate(dateTemp);
        await setDateString(dateTemp.toLocaleDateString("de-DE"));
        await SetFloor(selectedOption);
    };

    const subtractDays = async () => {
        if (dateString !== new Date().toLocaleDateString("de-DE")) {
            const dateTemp = date;
            await dateTemp.setDate(date.getDate() - 1);
            await setDate(dateTemp);
            await setDateString(dateTemp.toLocaleDateString("de-DE"));
            await SetFloor(selectedOption);
        }
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
                body: JSON.stringify({floor: floor, workplaceList: [{date: date.toLocaleDateString("de-DE")}]})
            }).then((response) => response.json());
        } catch (error) {
            console.log(error);
        }
    }

    const bookWorkplace = async () => {
        try {
            return await fetch('http://127.0.0.1:5071/api/Room/bookWorkplace', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT, FETCH',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                },
                body: JSON.stringify({username: username, workplaceId: 1})
            }).then((response) => response.json());
        } catch (error) {
            console.log(error);
        }
    }

    const bookid = (id) => {
        if(workPlaceId === id) {
            setWorkPlaceId(0);
            //background color should go back to white from the one
        } else {
            setWorkPlaceId(id);
            //backgroundcolor should switch to the otherone clicked
        }
    }

    return (
        <div>
            <h2>BookingPage</h2>

            <h3>
                <button onClick={subtractDays}>zurück</button>
                {date.toLocaleDateString("de-DE")}
                <button onClick={addDays}>vor</button>
            </h3>
            <h2>
                <button onClick={bookWorkplace}>Sitzplatz buchen</button>
            </h2>

            <form onSubmit={handleLogout}>
                <button type="submit">Logout</button>
                <Dropdown options={options} value={selectedOption} placeholder="Wähle eine Etage"
                          onChange={option => SetFloor(option.value)}/>
                <div className="grid">
                    {selectedOption === "1" && (
                        <>
                            {rooms.map((room, index) => (
                                <Room sizeX={room.sizeX} sizeY={room.sizeY} column={room.column} row={room.row}
                                      id={room.id}>
                                    <div className="grid-workplace">
                                        {rooms[index].workplaceList.map((workplace) => (
                                            <WorkPlace sizeX={workplace.sizeX} sizeY={workplace.sizeY}
                                                       row={workplace.row} column={workplace.column} id={workplace.id}
                                                       bookingid={workplace.bookingid}
                                                       bookid={bookid}/>
                                        ))}
                                    </div>
                                </Room>
                            ))}
                        </>
                    )}
                    {selectedOption === "2" && (
                        <>
                            {rooms.map((room, index) => (
                                <Room sizeX={room.sizeX} sizeY={room.sizeY} column={room.column} row={room.row}
                                      id={room.id}>
                                    <div className="grid-workplace">
                                        {rooms[index].workplaceList.map((workplace) => (
                                            <WorkPlace sizeX={workplace.sizeX} sizeY={workplace.sizeY}
                                                       row={workplace.row} column={workplace.column} id={workplace.id}/>
                                        ))}
                                    </div>
                                </Room>
                            ))}
                        </>
                    )}
                    {selectedOption === "3" && (
                        <>
                            {rooms.map((room, index) => (
                                <Room sizeX={room.sizeX} sizeY={room.sizeY} column={room.column} row={room.row}
                                      id={room.id}>
                                    <div className="grid-workplace">
                                        {rooms[index].workplaceList.map((workplace) => (
                                            <WorkPlace sizeX={workplace.sizeX} sizeY={workplace.sizeY}
                                                       row={workplace.row} column={workplace.column} id={workplace.id}/>
                                        ))}
                                    </div>
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