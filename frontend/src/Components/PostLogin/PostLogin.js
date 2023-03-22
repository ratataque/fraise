import React, {useEffect, prevState} from "react";
import "./PostLogin.css"
import {Navbar} from "../../Components";
import {useLocation } from 'react-router-dom';
import {BsClipboardPlus} from "react-icons/bs" //React-logo d'une fraise
import {AiOutlineEdit} from "react-icons/ai" //React-logo d'une fraise



function PostLogin() {
    const {state} = useLocation();

    useEffect(() => {
        // console.log(state)
    }, [])

    const [switch_, toggle_switch] = React.useState("montre_display");
    function marg_switch(elem) {
        toggle_switch("")

        setTimeout(() => {
            toggle_switch(elem)
        }, 300);
    }

    const [add_password, toggle] = React.useState("");
    const [edit_password, toggle_password] = React.useState(true);
    const [edit_email, toggle_email] = React.useState(true);

    var cacher = edit_password ? "cacher" : "";
    var password = edit_password ? "password" : "text";
    var email_change = !edit_email && edit_password ? "email_cacher" : "";
    var active_email = !edit_email ? "active" : ""
    var active_password = !edit_password ? "active" : ""

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
                        <div className="list_account">
                            <div className="site underline" onClick={() => {toggle(""); marg_switch("montre_display"); toggle_email(true); toggle_password(true);}}>test@test.com</div>
                            <div className="site underline" onClick={() => {toggle(""); marg_switch("montre_display"); toggle_email(true); toggle_password(true);}}>test@test.com</div>
                            <div className="site underline" onClick={() => {toggle(""); marg_switch("montre_display"); toggle_email(true); toggle_password(true);}}>test@test.com</div>
                        </div>

                        <div className="list_account_marg"></div>
                        <div className="encoche" onClick={() => marg_switch()}></div>
                        <div className="addButton addButton--active" onClick={() => {marg_switch("montre_add"); toggle_email(false); toggle_password(true)}}></div>
                        <div className="carre"></div>
                    </div>
                </div>

                <div className="display_password_cont">
                    <div className="display_password_cont_titre ">
                        <div className="titre_website">Site test</div>

                        <div className={"marge " + switch_}>
                            <div className="display_password">
                                <div className="titre_email"> Email / Username :</div>
                                <input type={"email"} className="email_field" readOnly={edit_email} value="test@test.com"></input>
                                <button className={"btn_copy " + active_email} onClick={() => toggle_email(prevState=>!prevState)}><AiOutlineEdit/></button>
                                <button className="btn_copy"><BsClipboardPlus/></button>

                                <div className="titre_password">Password :</div>
                                <input type={password} className="password_field" readOnly={edit_password} value="test"></input>
                                <button className={"btn_copy " + active_password} onClick={() => toggle_password(prevState=>!prevState)}><AiOutlineEdit/></button>
                                <button className="btn_copy"><BsClipboardPlus/></button>

                                <div className={"titre_password " + cacher}>Confirm Password :</div>
                                <input type={"text"} className={"password_field " + cacher} ></input>
                                <button className={email_change + " btn_change " + cacher}>Change</button>
                            </div>
                        </div>
                    </div>


                    <div className="new_password_cont">
                        <div className="titre_website">Site test</div>

                        <div className={"marge " + switch_}>
                            <div className="display_password">
                                <div className="titre_email"> Email / Username :</div>
                                <input type={"email"} className="email_field" placeholder="Example@example.com" ></input>

                                <div className="titre_password">Password :</div>
                                <input type={password} className="password_field" readOnly={edit_password} value="test"></input>
                                <button className={"btn_copy " + active_password} onClick={() => toggle_password(prevState=>!prevState)}><AiOutlineEdit/></button>

                                <div className={"titre_password " + cacher}>Confirm Password :</div>
                                <input type={"text"} className={"password_field " + cacher} ></input>
                                <button className={cacher + " btn_copy " + active_password} onClick={() => toggle_password(prevState=>!prevState)}><AiOutlineEdit/></button>

                                <button className={email_change + " btn_change "}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default PostLogin;
