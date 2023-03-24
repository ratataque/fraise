import React, {useEffect, prevState, useRef, useState} from "react";
import "./PostLogin.css"
import {Navbar} from "../../Components";
import {useLocation } from 'react-router-dom';
import {BsClipboardPlus} from "react-icons/bs" //React-logo d'une fraise
import {AiOutlineEdit} from "react-icons/ai" //React-logo d'une fraise
// import {BigUint64Array} from "typescript/lib";


function PostLogin() {
    const {state} = useLocation();

    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [generated_password_main, set_generated_password] = useState("");
    const [generated_password_change, change_generated_password] = useState("");
    const [generated_password_change_confirm, change_generated_password_confirm] = useState("");

    useEffect(() => {
        // console.log(state)

        const s = "!\"§$%&/()=?\u{20ac}";

        const password = window.crypto.getRandomValues(new Uint32Array(6)).reduce(
                (prev, curr, index) => (
                    !index ? prev : prev.toString(36)
                ) + (
                    index % 2 ? curr.toString(36).toUpperCase() : curr.toString(36)
                ) + (
                    curr=s.substr(Math.floor(s.length*Math.random()), 1)
                )
            ).split('').sort(() => 128 -
                window.crypto.getRandomValues(new Uint8Array(1))[0]
            ).join('')

        set_generated_password(password);
        change_generated_password(password);
        change_generated_password_confirm(password);
    }, [isButtonClicked])

    const [switch_, toggle_switch] = React.useState("montre_display");
    function marg_switch(elem) {
        toggle_switch("")

        setTimeout(() => {
            toggle_switch(elem)
        }, 300);
    }

    const handle_password_change = (event) => {
        change_generated_password(event.target.value)
    }
    const handle_password_change_confirm = (event) => {
        change_generated_password_confirm(event.target.value)
    }

    const [add_password, toggle] = React.useState("");
    const [edit_password, toggle_password] = React.useState(true);
    const [edit_email, toggle_email] = React.useState(true);

    var cacher = edit_password ? "cacher" : "";
    var password = edit_password ? "password" : "text";
    var email_change = !edit_email && edit_password ? "email_cacher" : "";
    var active_email = !edit_email ? "active" : ""
    var active_password = !edit_password ? "active" : ""

    // console.log(generated_password_main);
    // console.log(generated_password_change);

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
                    <div className="new_password_cont">
                        <div className="titre_website">Add password</div>

                        <div className={"marge " + switch_}>
                            <div className="display_password">
                                <div className="titre_email"> Email / Username :</div>
                                <input id="email_add" type={"email"} className="email_field" placeholder="Example@example.com" ></input>
                                <button className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("email_add").value)}><BsClipboardPlus/></button>

                                <div className="titre_password">Password :</div>
                                <input id="password_add" type={password} className="password_field" readOnly={edit_password} value={generated_password_change} onChange={handle_password_change}></input>
                                <button className={"btn_copy " + active_password} onClick={() => toggle_password(!edit_password)}><AiOutlineEdit/></button>
                                <button className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("password_add").value)}><BsClipboardPlus/></button>

                                <div className={"titre_password " + cacher}>Confirm Password :</div>
                                <input type={"text"} className={"password_field " + cacher} value={generated_password_change_confirm} onChange={handle_password_change_confirm}></input>
                                <button className={cacher + " btn_copy btn_generate"} onClick={() => setIsButtonClicked(!isButtonClicked)}>Generate</button>

                                <button className={email_change + " btn_change "}>Confirm</button>
                                <button className={email_change + " btn_change btn_cancel "}>Cancel</button>
                            </div>
                        </div>
                    </div>
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
                        <div className="addButton addButton--active" onClick={() => {marg_switch("montre_add"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked);}}></div>
                        <div className="carre"></div>
                    </div>
                </div>

                <div className="display_password_cont">
                    <div className="display_password_cont_titre ">
                        <div className="titre_website">Site test</div>

                        <div className={"marge " + switch_}>
                            <div className="display_password">
                                <div className="titre_email"> Email / Username :</div>
                                <input id="email" type={"email"} className="email_field" readOnly={edit_email} value="test@test.com"></input>
                                <button className={"btn_copy " + active_email} onClick={() => toggle_email(!edit_email)}><AiOutlineEdit/></button>
                                <button className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("email").value)}><BsClipboardPlus/></button>

                                <div className="titre_password">Password :</div>
                                <input id="password" type={password} className="password_field" readOnly={edit_password} value={generated_password_change} onChange={handle_password_change}></input>
                                <button className={"btn_copy " + active_password} onClick={() => toggle_password(!edit_password)}><AiOutlineEdit/></button>
                                <button className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("password").value)}><BsClipboardPlus/></button>

                                <div className={"titre_password " + cacher}>Confirm Password :</div>
                                <input type={"text"} className={"password_field " + cacher} value={generated_password_change_confirm} onChange={handle_password_change_confirm}></input>
                                <button className={cacher + " btn_copy btn_generate"} onClick={() => setIsButtonClicked(!isButtonClicked)}>Generate</button>

                                <button className={email_change + " btn_change " + cacher}>Change</button>
                                <button className={email_change + " btn_change btn_cancel " + cacher} onClick={() => {toggle_email(true);toggle_password(true);change_generated_password(generated_password_main);change_generated_password_confirm(generated_password_main);}}>Cancel</button>
                            </div>
                        </div>
                    </div>


                    <div className="new_password_cont">
                        <div className="titre_website">Site test</div>

                        <div className={"marge " + switch_}>
                            <div className="display_password">
                                <div className="titre_email"> Email / Username :</div>
                                <input id="email_add" type={"email"} className="email_field" placeholder="Example@example.com" ></input>
                                <button className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("email_add").value)}><BsClipboardPlus/></button>

                                <div className="titre_password">Password :</div>
                                <input id="password_add" type={password} className="password_field" readOnly={edit_password} value={generated_password_change} onChange={handle_password_change}></input>
                                <button className={"btn_copy " + active_password} onClick={() => toggle_password(!edit_password)}><AiOutlineEdit/></button>
                                <button className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("password_add").value)}><BsClipboardPlus/></button>

                                <div className={"titre_password " + cacher}>Confirm Password :</div>
                                <input type={"text"} className={"password_field " + cacher} value={generated_password_change_confirm} onChange={handle_password_change_confirm}></input>
                                <button className={cacher + " btn_copy btn_generate"} onClick={() => setIsButtonClicked(!isButtonClicked)}>Generate</button>

                                <button className={email_change + " btn_change "}>Confirm</button>
                                <button className={email_change + " btn_change btn_cancel "} onClick={() => {toggle_email(false);toggle_password(true);change_generated_password(generated_password_main);change_generated_password_confirm(generated_password_main);}}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default PostLogin;
