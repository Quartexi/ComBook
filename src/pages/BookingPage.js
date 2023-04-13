import {useNavigate} from "react-router-dom";
import Room from "../components/Room";
import WorkPlace from "../components/WorkPlace";
import '../CSS/WorkPlace.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React, {useEffect, useState} from "react";
import AlertDialog from "../components/AlertDialog";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const BookingPage = () => {
    const navigate = useNavigate();
    const options = [
        '1', '2', '3'
    ];
    const username = sessionStorage.getItem('username');
    const [selectedOption, setSelectedOption] = useState();
    const [rooms, setRooms] = useState([]);
    const [date, setDate] = useState(new Date());
    const [minDate] = useState(new Date());

    const [specialView, setSpecialView] = useState(false);
    const [specialViewCreated, setSpecialViewCreated] = useState();
    const [specialViewWorkplaceId, setSpecialViewWorkplaceId] = useState();
    const [specialViewBookingId, setSpecialViewBookingId] = useState();
    const [specialViewDate, setSpecialViewDate] = useState();
    const [specialViewUsername, setSpecialViewUsername] = useState();
    const [specialViewDelete, setSpecialViewDelete] = useState();

    const [clickedChildId, setClickedChildId] = useState(null);

    function SetFloor(floor) {
        getRooms(floor).then(async (response) => {
            await setRooms(response);
            await setSelectedOption(floor);
            await setSpecialView(false);
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

    async function setDayCalender(value) {
        await setDate(value);
    }

    useEffect(() => {
        SetFloor(selectedOption);
        setClickedChildId(null);
    }, [date, selectedOption]);

    const getRooms = async (floor) => {
        console.log(date);
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
                body: JSON.stringify({
                    floor: floor,
                    row: '',
                    column: '',
                    name: '',
                    workplaceList: [{date: date.toLocaleDateString("de-DE"), username: ''}]
                })
            }).then((response) => response.json());
        } catch (error) {
            console.log(error);
        }
    }

    const bookWorkplace = async () => {
        console.log(date.toLocaleDateString("de-DE"));
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
                body: JSON.stringify({
                    username: username,
                    workplaceid: clickedChildId,
                    date: date.toLocaleDateString("de-DE")
                })
            }).then((response) => {
                response.json();
                SetFloor(selectedOption);
                setClickedChildId(null);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const deleteWorkplace = async () => {
        try {
            return await fetch('http://127.0.0.1:5071/api/Booking/deleteWorkplace', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT, FETCH',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                },
                body: JSON.stringify({username: username, bookingid: specialViewBookingId, date: ''})
            }).then((response) => {
                SetFloor(selectedOption);
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

    async function infoScreen(id, bookingid) {
        try {
            const response = await getBookingInformation(bookingid);
            await setSpecialViewBookingId(bookingid);
            await setSpecialViewCreated(response.created);
            await setSpecialViewWorkplaceId(response.workplaceid);
            await setSpecialViewDate(response.date);
            await setSpecialViewUsername(response.username);

            if (username === response.username) {
                setSpecialViewDelete(true);
                setSpecialView(true);
            } else {
                setSpecialViewDelete(false);
                setSpecialView(true);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    const handleCloseDialog = () => {
        setSpecialView(false);
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h1 style={{marginBottom: '1rem', letterSpacing: "10px", fontSize: "50px"}}>COMBOOK</h1>
                <Calendar onChange={(e) => setDayCalender(e)} value={date}
                          minDate={minDate}/>
                <Button onClick={bookWorkplace}>Sitzplatz buchen</Button>
            </div>
            <AlertDialog specialViewCreated={specialViewCreated} specialViewDate={specialViewDate}
                         specialViewWorkplaceId={specialViewWorkplaceId} specialViewUsername={specialViewUsername}
                         specialView={specialView} specialViewDelete={specialViewDelete}
                         deleteWorkplace={deleteWorkplace} open={specialView} onClose={handleCloseDialog}/>
            <div style={{justifyContent: "center"}}>
                <form onSubmit={handleLogout} style={{justifySelf: "center"}}>
                    <div style={{position: "relative", paddingRight: "20px"}}>
                        <Button type="submit" variant="contained"
                                color="primary"
                                size="large" startIcon={<LogoutIcon/>}>Logout
                        </Button>
                    </div>
                    <Dropdown options={options} value={selectedOption} placeholder="Wähle eine Etage"
                              onChange={option => SetFloor(option.value)}/>
                    <div className="grid">
                        {selectedOption === "1" && (
                            <>
                                {rooms.map((room, index) => (
                                    <Room sizeX={room.sizeX} sizeY={room.sizeY} column={room.column} row={room.row}
                                          id={room.id} name={room.name}>
                                        <div className="grid-workplace">
                                            {rooms[index].workplaceList.map((workplace) => (
                                                <WorkPlace sizeX={workplace.sizeX} sizeY={workplace.sizeY}
                                                           row={workplace.row} column={workplace.column}
                                                           id={workplace.id}
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
                                          id={room.id} name={room.name}>
                                        <div className="grid-workplace">
                                            {rooms[index].workplaceList.map((workplace) => (
                                                <WorkPlace sizeX={workplace.sizeX} sizeY={workplace.sizeY}
                                                           row={workplace.row} column={workplace.column}
                                                           id={workplace.id}
                                                           bookingid={workplace.bookingid} username={workplace.username}
                                                           bookid={bookid} infoScreen={infoScreen}
                                                           clicked={workplace.id === clickedChildId}/>
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
                                          id={room.id} name={room.name}>
                                        <div className="grid-workplace">
                                            {rooms[index].workplaceList.map((workplace) => (
                                                <WorkPlace sizeX={workplace.sizeX} sizeY={workplace.sizeY}
                                                           row={workplace.row} column={workplace.column}
                                                           id={workplace.id}
                                                           bookingid={workplace.bookingid} username={workplace.username}
                                                           bookid={bookid} infoScreen={infoScreen}
                                                           clicked={workplace.id === clickedChildId}/>
                                            ))}
                                        </div>
                                    </Room>
                                ))}
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export {
    BookingPage
};