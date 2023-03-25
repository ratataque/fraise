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

    const test_data = {
                        "Site test 1": {"test1@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 2": {"test2@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 3": {"test3@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 4": {"test4@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 5": {"test5@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 6": {"test6@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 7": {"test7@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 8": {"test8@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 9": {"test9@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 10": {"test10@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 11": {"test11@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 12": {"test12@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 13": {"test13@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 14": {"test14@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                        "Site test 15": {"test15@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
                    }
    const [website_dict, set_new_website_dict] = useState(test_data);
    const [website_current, set_current_website] = useState("");

    function set_current_website_func(e) {
        setTimeout(() => {
            set_current_website(e.target.getAttribute("id"))
        }, 350);
    }

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
    const [transi, toggle_transi] = React.useState("");
    function transi_website() {
        if (add_password !== "add_password") {
            toggle_transi("cacher")
            toggle("")

            setTimeout(() => {
                toggle("transi")
                toggle_transi("")
            }, 350);
        }
    }

    const handle_email_change = (event) => {
        // change_generated_password(event.target.value)
    }
    const handle_password_change = (event) => {
        change_generated_password(event.target.value)
    }
    const handle_password_change_confirm = (event) => {
        change_generated_password_confirm(event.target.value)
    }


    const [add_password, toggle] = React.useState("add_password");
    const [edit_password, toggle_password] = React.useState(true);
    const [edit_email, toggle_email] = React.useState(false);

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
                    <input className="recherche" placeholder="Recherche"></input>

                    <div className="encoche" onClick={() => {toggle("add_password");toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked)}}></div>
                    <div className="addButton addButton--active" onClick={() => {toggle("add_password");toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked)}}></div>
                    <div className="carre"></div>

                    <div className="list_site_marg"></div>
                    <div className="list_site_cont">
                        {
                            Object.entries(website_dict).map( ([key, value]) => <div id={key} className="site underline" onClick={(e) => {transi_website(); toggle("");toggle_email(true); toggle_password(true);set_current_website_func(e)}}>{key}</div>)
                        }
                    </div>
                </div>
            </div>

            <div className={" add_password_container " + add_password} >
                    <div className="new_password_cont">
                        <div className="titre_website">Website : </div>
                        <input type="text" className="website_field" placeholder="Example.com" ></input>

                        <div className={"marge " + switch_}>
                            <div className="display_password">
                                <div className="titre_email"> Email / Username :</div>
                                <input id="email_add_new" type={"email"} className="email_field" placeholder="Example@example.com" ></input>
                                <button className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("email_add_new").value)}><BsClipboardPlus/></button>

                                <div className="titre_password">Password :</div>
                                <input id="password_add_new" type={password} className="password_field" readOnly={edit_password} value={generated_password_change} onChange={handle_password_change}></input>
                                <button className={"btn_copy " + active_password} onClick={() => toggle_password(!edit_password)}><AiOutlineEdit/></button>
                                <button className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("password_add_new").value)}><BsClipboardPlus/></button>

                                <div className={"titre_password " + cacher}>Confirm Password :</div>
                                <input type={"text"} className={"password_field " + cacher} value={generated_password_change_confirm} onChange={handle_password_change_confirm}></input>
                                <button className={cacher + " btn_copy btn_generate"} onClick={() => setIsButtonClicked(!isButtonClicked)}>Generate</button>

                                <button className={email_change + " btn_change "}>Confirm</button>
                                <button className={email_change + " btn_change btn_cancel "} onClick={() => {toggle_email(false);toggle_password(true);change_generated_password(generated_password_main);change_generated_password_confirm(generated_password_main);}}>Cancel</button>
                            </div>
                        </div>
                    </div>
            </div>

            <div className={transi + " password_container " + add_password}>
                <div className="account_container">
                    <div className="titre_website">Account list</div>

                    <div className="list_account_cont">
                        <div className="list_account">
                        {
                            website_current ? Object.entries(website_dict[website_current]).map( ([key, value]) => <div className="site underline" onClick={() => {toggle(""); marg_switch("montre_display"); toggle_email(true); toggle_password(true);}}>{key}</div>) : <div className="site underline" onClick={() => {marg_switch("montre_add"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked);}}>Add</div>
                        }
                            {/* <div className="site underline" onClick={() => {toggle(""); marg_switch("montre_display"); toggle_email(true); toggle_password(true);}}>test@test.com</div>
                            <div className="site underline" onClick={() => {toggle(""); marg_switch("montre_display"); toggle_email(true); toggle_password(true);}}>test@test.com</div>
                            <div className="site underline" onClick={() => {toggle(""); marg_switch("montre_display"); toggle_email(true); toggle_password(true);}}>test@test.com</div> */}
                        </div>

                        <div className="list_account_marg"></div>
                        <div className="encoche" onClick={() => {marg_switch("montre_add"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked);}}></div>
                        <div className="addButton addButton--active" onClick={() => {marg_switch("montre_add"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked);}}></div>
                        <div className="carre"></div>
                    </div>
                </div>

                <div className="display_password_cont">
                    <div className="display_password_cont_titre ">
                        <div className="titre_website">{website_current}</div>

                        <div className={"marge " + switch_}>
                            <div className="display_password">
                                <div className="titre_email"> Email / Username :</div>
                                <input id="email" type={"email"} className="email_field" readOnly={edit_email} defaultValue="test@test.com"></input>
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
