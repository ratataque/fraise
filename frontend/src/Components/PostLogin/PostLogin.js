import React, {useEffect} from "react";
import "./PostLogin.css"
import {Navbar} from "../../Components";
import {useLocation } from 'react-router-dom';
// import {TbWorld} from "react-icons/tb" //React-logo d'une fraise



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
                {/* <TbWorld color="www_icone white" size={36}/> */}

                <div className="liste_website">
                    <div className="addButton addButton--active"></div>
                    <div className="encoche"></div>
                    <div className="carre"></div>

                    <div className="list_site_marg"></div>
                    <div className="list_site_cont">
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                        <div className="site underline">Site test</div>
                    </div>
                </div>
            </div>

            <div className="password_container">
                Password
            </div>
        </div>
    );
}

export default PostLogin;
