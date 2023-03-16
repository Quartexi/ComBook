import { useState } from 'react';
import {Navigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    function handleLogin(event) {
        event.preventDefault();

        // Here you can implement your authentication logic,
        // for example by making an API call to your backend.
        if (username === 'user' && password === 'password') {
            localStorage.setItem('isAuthenticated', true);
            window.location.reload();
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