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

    const [add_password, toggle] = React.useState("");

    return (
        <div className="postLogin">
            <Navbar/>
            {/* <div id="test">{"Bonjour "+state["nom"]+" "+state["prenom"]}</div> */}

            <div className="website_container">
                <div className="titre_website">Website list</div>
                {/* <TbWorld color="www_icone white" size={36}/> */}

                <div className="liste_website">
                    <div className="encoche" onClick={() => toggle("add_password")}></div>
                    <div className="addButton addButton--active" onClick={() => toggle("add_password")}></div>
                    <div className="carre"></div>

                    <div className="list_site_marg"></div>
                    <div className="list_site_cont">
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                        <div className="site underline" onClick={() => toggle("")}>Site test</div>
                    </div>
                </div>
            </div>

            <div className={"add_password_container " + add_password} >
                Add Password
            </div>

            <div className={"password_container " + add_password}>
                <div className="account_container">
                    <div className="titre_website">Account list</div>

                    <div className="list_account_cont">
                        <div className="list_account"></div>

                        <div className="encoche" onClick={() => toggle("add_password")}></div>
                        <div className="addButton addButton--active" onClick={() => toggle("add_password")}></div>
                        <div className="carre"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostLogin;
