import {useNavigate} from "react-router-dom";
import Room from "../components/Room";
import WorkPlace from "../components/WorkPlace";
import '../CSS/WorkPlace.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {useState} from "react";
import {Button} from "react-bootstrap";

const BookingPage = () => {
    const navigate = useNavigate();
    const options = [
        '1', '2', '3'
    ];
    const username = sessionStorage.getItem('username');
    const [selectedOption, setSelectedOption] = useState();
    const [rooms, setRooms] = useState([]);
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState(new Date().toLocaleDateString("de-DE"));

    const [specialView, setSpecialView] = useState(false);
    const [specialViewCreated, setSpecialViewCreated] = useState();
    const [specialViewWorkplaceId, setSpecialViewWorkplaceId] = useState();
    const [specialViewDate, setSpecialViewDate] = useState();
    const [specialViewUsername, setSpecialViewUsername] = useState();
    const [specialViewDelete, setSpecialViewDelete] = useState();


    const [clickedChildId, setClickedChildId] = useState(null);

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
        await setClickedChildId(null);
    };

    const subtractDays = async () => {
        if (dateString !== new Date().toLocaleDateString("de-DE")) {
            const dateTemp = date;
            await dateTemp.setDate(date.getDate() - 1);
            await setDate(dateTemp);
            await setDateString(dateTemp.toLocaleDateString("de-DE"));
            await setClickedChildId(null);
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
                body: JSON.stringify({floor: floor, workplaceList: [{date: date.toLocaleDateString("de-DE"), username: ''}]})
            }).then((response) => response.json());
        } catch (error) {
            console.log(error);
        }
    }

    const bookWorkplace = async () => {
        try {
            return await fetch('http://127.0.0.1:5071/api/Booking/bookWorkplace', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT, FETCH',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                },
                body: JSON.stringify({username: username, workplaceid: clickedChildId, date: date})
            }).then((response) => {
                response.json();
                SetFloor(selectedOption);
                setClickedChildId(null);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getBookingInformation = async (bookingid) => {
        try {
            return await fetch('http://127.0.0.1:5071/api/Booking/getBookingInformation', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT, FETCH',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                },
                body: JSON.stringify({bookingid: bookingid, date: "", username: ""})
            }).then((response) => response.json());
        } catch (error) {
            console.log(error);
        }
    }

    const bookid = (childId, childClicked) => {
        if (childClicked) {
            // child was already clicked, so reset the clickedChildId state to null
            setClickedChildId(null);
        } else {
            // child was not already clicked, so update the clickedChildId state to the new child's ID
            setClickedChildId(childId);
        }
    }

    function infoScreen(id, bookingid) {
        getBookingInformation(bookingid).then(async (response) => {
            await setSpecialViewCreated(response.created);
            await setSpecialViewWorkplaceId(response.workplaceid);
            await setSpecialViewDate(response.date);
            await setSpecialViewUsername(response.username);
        })
            .catch((e) => {
                console.log(e.message);
            })
        if(username === specialViewUsername) {
            setSpecialViewDelete(true);
        } else {
            setSpecialViewDelete(false);
        }
        setSpecialView(true);
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
                                                       bookingid={workplace.bookingid} username={workplace.username}
                                                       bookid={bookid} infoScreen={infoScreen}
                                                       clicked={workplace.id === clickedChildId}/>
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
                {specialView === true && (
                    <>
                    <div>
                        <h2>
                            Erstellt Am: {specialViewCreated}
                        </h2>
                        <h2>
                            Für das Datum: {specialViewDate}
                        </h2>
                        <h2>
                            Sitzplatz: {specialViewWorkplaceId}
                        </h2>
                        <h2>
                            Username: {specialViewUsername}
                        </h2>
                        <Button onClick={() => setSpecialView(false)}>Schließen</Button>
                        {specialViewDelete === true && (
                            <>
                                <Button>Delete</Button>
                            </>
                        )}
                    </div>
                    </>
                    )}
            </form>
        </div>
    );
}

export {
    BookingPage
};