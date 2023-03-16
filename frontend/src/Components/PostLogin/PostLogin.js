import React, {useEffect} from "react";
import "./PostLogin.css"
import {Navbar} from "../../Components";
import {useLocation } from 'react-router-dom';



function PostLogin() {
    const {state} = useLocation();

    useEffect(() => {
        // console.log(state)
    }, [])

    return (
        <div className="postLogin">
            <Navbar/>
            <div id="test">{"Bonjour "+state["nom"]+" "+state["prenom"]}</div>

            <div className="website_container">
                <div className="titre_website">Website liste</div>

                <div className="liste_website">

                </div>
            </div>

            <div className="password_container">
                Password
            </div>
        </div>
    );
}

export default PostLogin;
