import Login from "../components/Login";
import {Navigate} from "react-router-dom";
import React from "react";


const LoginPage = () => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated === "true") {
        return <Navigate to="/booking"/>
    } else {
        return <Login/>
    }
}

export {
    LoginPage
};