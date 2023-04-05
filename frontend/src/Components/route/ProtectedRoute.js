import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function check_access_token() {
        const userToken = sessionStorage.getItem('access_token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }
    
    useEffect(() => {
            check_access_token();
        }, [isLoggedIn]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;