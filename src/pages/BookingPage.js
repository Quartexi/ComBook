import {Navigate, useNavigate} from "react-router-dom";
import Room from "../components/Room";
import WorkPlace from "../components/WorkPlace";
import '../CSS/WorkPlace.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {useState} from "react";

const BookingPage = () => {
    const navigate = useNavigate();

    const options = [
        'Keller', 'Erdgeschoss', '2. Etage'
    ];
    const defaultOption = options[1];

    const [selectedOption, setSelectedOption] = useState(defaultOption);

    function handleLogout(event) {
        event.preventDefault();

        //api call for login info, return true or false
        sessionStorage.setItem('isAuthenticated', 'false');
        navigate("/");
    }

    return (
        <div>
            <h2>BookingPage</h2>
            <form onSubmit={handleLogout}>
                <button type="submit">Logout</button>
                <Dropdown options={options} value={selectedOption} placeholder="Select an option"
                          onChange={option => setSelectedOption(option.value)}/>
                <div className="grid">
                    {selectedOption === "Keller" && (
                        <>
                            <Room sizeX={300} sizeY={370} row={1} column={1}>
                                <div className="grid-workplace">
                                    <WorkPlace sizeX={40} sizeY={80} row={2} column={5}/>
                                    <WorkPlace sizeX={40} sizeY={80} row={2} column={6}/>
                                    <WorkPlace sizeX={40} sizeY={80} row={3} column={5}/>
                                    <WorkPlace sizeX={40} sizeY={80} row={3} column={6}/>
                                </div>
                            </Room>
                        </>
                    )}
                    {selectedOption === "Erdgeschoss" && (
                        <>
                            <Room sizeX={400} sizeY={370} row={1} column={1}>
                                <div className="grid-workplace">
                                    <WorkPlace sizeX={40} sizeY={80} row={2} column={5}/>
                                    <WorkPlace sizeX={40} sizeY={80} row={2} column={6}/>
                                    <WorkPlace sizeX={40} sizeY={80} row={3} column={5}/>
                                    <WorkPlace sizeX={40} sizeY={80} row={3} column={6}/>
                                </div>
                            </Room>
                        </>
                    )}
                    {selectedOption === "2. Etage" && (
                        <>
                            <Room sizeX={500} sizeY={370} row={1} column={1}>
                                <div className="grid-workplace">
                                    <WorkPlace sizeX={40} sizeY={80} row={2} column={5}/>
                                    <WorkPlace sizeX={40} sizeY={80} row={2} column={6}/>
                                    <WorkPlace sizeX={40} sizeY={80} row={3} column={5}/>
                                    <WorkPlace sizeX={40} sizeY={80} row={3} column={6}/>
                                </div>
                            </Room>
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