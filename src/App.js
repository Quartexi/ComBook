import {Route, Routes, Navigate} from 'react-router-dom';
import {LoginPage} from './pages/LoginPage';
import {BookingPage} from './pages/BookingPage';

export function requireAuth(Component) {
    return function AuthenticatedComponent(props) {
        const isAuthenticated = sessionStorage.getItem('isAuthenticated');
        const username = sessionStorage.getItem('username');
        if (isAuthenticated === "true" && username.length > 0) {
            return <Component {...props} />
        } else {
            return <Navigate to="/" replace/>
        }

    };
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/booking" element={<BookingPageWrapper/>}/>
        </Routes>
    );
}

const BookingPageWrapper = requireAuth(BookingPage);

export default App;
