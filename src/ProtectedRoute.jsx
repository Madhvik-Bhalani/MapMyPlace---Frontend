import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification/Notification';

const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate();
    const alert = new Notification();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            alert.notify(false, "Sign up / sign in required..!!");
        }
    }, []);

    return element;
};

export default ProtectedRoute;
