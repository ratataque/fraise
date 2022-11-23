import React, { useRef, useState, useEffect} from "react";
import "./PostSignup.css"
import {Navbar} from "../../Components";
import { Link, useLocation } from 'react-router-dom';



function PostSignup() {
    const {state} = useLocation();

    useEffect(() => {
        console.log(state)
    }, [])

    return (
        <div className="PostSignup">
            <Navbar/>
            <div id="test"> <p>{"Inscription réussi ! merci de valider votre compte grâce a l'email que nous vous avons envoyé."}</p></div>
        </div>
    );
}

export default PostSignup;
