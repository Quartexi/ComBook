import {Navigate, useNavigate} from "react-router-dom";
import Room from "../components/Room";
import WorkPlace from "../components/WorkPlace";
import '../CSS/WorkPlace.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const BookingPage = () => {
    const navigate = useNavigate();

    const options = [
        'Erdgeschoss', 'Keller', '2. Etage'
    ];
    const defaultOption = options[0];

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
                <Dropdown options={options} value={defaultOption} placeholder="Select an option" />
                <div className="grid">
                    <Room sizeX={300} sizeY={370} row={1} column={1}>
                        <div className="grid-workplace">
                            <WorkPlace sizeX={40} sizeY={80} row={2} column={5}/>
                            <WorkPlace sizeX={40} sizeY={80} row={2} column={6}/>
                            <WorkPlace sizeX={40} sizeY={80} row={3} column={5}/>
                            <WorkPlace sizeX={40} sizeY={80} row={3} column={6}/>
                        </div>
                    </Room>
                    <Room sizeX={300} sizeY={300} row={1} column={2}/>
                    <Room sizeX={300} sizeY={300} row={1} column={3}/>
                </div>
            </form>
        </div>
    );
}

export {
    BookingPage
};