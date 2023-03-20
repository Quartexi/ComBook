import {useState} from 'react';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    function handleLogin(event) {
        event.preventDefault();

        //api call for login info, return true or false
        if (username === 'a' && password === 'a') {
            sessionStorage.setItem('isAuthenticated', 'true');
            navigate("/booking");
        } else {
            setError('Invalid username or password');
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                {error && <div>{error}</div>}
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;