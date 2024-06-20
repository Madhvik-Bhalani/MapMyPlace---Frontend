import React, {useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import Notification from './Notification/Notification';

const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate();
    const alert = new Notification();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQuery();
    const urlToken = query.get('token');  // Extract the token from the URL
    //for reset password modal to not show msg sign up /in required

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token && !urlToken) {
            // If no token in local storage and no token in URL, navigate to home
            navigate("/");
            alert.notify(false, "Sign up / sign in required..!!");
        }
    }, []);

    return element;
};

export default ProtectedRoute;
