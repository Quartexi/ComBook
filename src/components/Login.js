import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import makeStyles from "@mui/material/styles/makeStyles";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const buttonStyle = {
        backgroundColor: '#2196f3',
        borderRadius: '4px',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#1976d2',
        },
        width: '400px',
        letterSpacing: '10px',
        fontSize: '20px',
    }

    function handleLogin(event) {
        event.preventDefault();

        callApi()
            .then((login) => {
                if (login) {
                    sessionStorage.setItem('isAuthenticated', 'true');
                    sessionStorage.setItem('username', username);
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h2 style={{ marginBottom: '1rem', letterSpacing: "10px", fontSize: "40px" }}>COMBOOK</h2>
            <form onSubmit={handleLogin}>
                {error && <div>{error}</div>}
                <div>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        size="big"
                        margin="dense"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                            ),
                            style: {backgroundColor: "white", borderRadius: "4px"}
                        }}
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        style={{width: "400px", marginBottom: '1rem'}}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        size="big"
                        margin="dense"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon/>
                                </InputAdornment>
                            ),
                            style: {backgroundColor: "white", borderRadius: "4px"}
                        }}
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        style={{width: "400px", marginBottom: '2rem'}}
                    />
                </div>
                <Button type="submit" startIcon={<LoginIcon />} style={buttonStyle}>Login</Button>
            </form>
        </div>
    );
}

export default Login;