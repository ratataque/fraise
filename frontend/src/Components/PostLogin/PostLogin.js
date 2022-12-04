import React, {useEffect} from "react";
import "./PostLogin.css"
import {Navbar} from "../../Components";
import {useLocation } from 'react-router-dom';



function PostLogin() {
    const {state} = useLocation();

    useEffect(() => {
        console.log(state)
    }, [])

    return (
        <div className="postLogin">
            <Navbar/>
            <div id="test">{"Bonjour "+state["nom"]+" "+state["prenom"]}</div>
            <div>
                <pre>{JSON.stringify(state,null, 2)}</pre>
            </div>
        </div>
    );
}

export default PostLogin;
