import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    function handleLogin(event) {
        event.preventDefault();

        callApi()
            .then((login) => {
                if (login) {
                    sessionStorage.setItem('isAuthenticated', 'true');
                    navigate("/booking");
                } else {
                    setError('Invalid username or password');
                }
            })
            .catch((e) => {
                console.log(e.message)
            })
    }

    const callApi = async () => {
        try {
            return await fetch('http://127.0.0.1:5071/api/Workplace', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT, FETCH',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                },
                body: JSON.stringify({id: '1'})
            }).then((response) => response.json());
        } catch (error) {
            setError('No Connection to Server');
            return false;
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