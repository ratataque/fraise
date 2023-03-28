import React, {useEffect, prevState, useRef, useState} from "react";
import "./PostLogin.css"
import {Navbar} from "../../Components";
import {useLocation } from 'react-router-dom';
import {BsClipboardPlus} from "react-icons/bs" //React-logo d'une fraise
import {AiOutlineEdit} from "react-icons/ai" //React-logo d'une fraise
import strawberry_guy from "../../assets/strawberry_guy.png" //React-logo d'une fraise
// import {BigUint64Array} from "typescript/lib";


function PostLogin() {
    const {state} = useLocation();

    const form_website = useRef(null)
    const form_email = useRef(null)
    const form_new_email = useRef(null)
    const form_change_email = useRef(null)
    const form_password = useRef(null)
    const form_new_password = useRef(null)
    const form_change_password = useRef(null)
    const form_confirm_password = useRef(null)
    const form_confirm_new_password = useRef(null)
    const form_confirm_change_password = useRef(null)


    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [generated_password_main, set_generated_password_main] = useState("");
    const [generated_password_change, change_generated_password] = useState("");
    const [generated_password_change_confirm, change_generated_password_confirm] = useState("");

    const [email_main, set_email_main] = useState("");
    const [change_email, set_change_email] = useState("");
    
    const [search, set_search] = useState("")

    const [add_password, toggle] = React.useState("add_password");
    const [edit_password, toggle_password] = React.useState(true);
    const [edit_email, toggle_email] = React.useState(false);

    var cacher = edit_password ? "cacher" : "";
    var password = edit_password ? "password" : "text";
    var email_change = !edit_email && edit_password ? "email_cacher" : "";
    var active_email = !edit_email ? "active" : ""
    var active_password = !edit_password ? "active" : ""

    // const test_data = {
    //                     "Site test 1": {"test1@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 2": {"test2@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 3": {"test3@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 4": {"test4@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 5": {"test5@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 6": {"test6@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 7": {"test7@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 8": {"test8@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 9": {"test9@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 10": {"test10@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 11": {"test11@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 12": {"test12@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 13": {"test13@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 14": {"test14@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                     "Site test 15": {"test15@test.com": "A9DC&d20H74ub1v99WF€?/Pwm717FtCypf81G1E116A7$"},
    //                 }
    const [website_dict, set_new_website_dict] = useState(state["passwords"]);
    const [website_current, set_current_website] = useState(Object.keys(website_dict)[0]);

    function set_current_website_props(e) {
        var id = e.target.getAttribute("id")
        setTimeout(() => {
            if (switch_ !== "montre_display") {
                marg_switch("montre_display");
            }

            if (Object.keys(website_dict[id]).length === 0) {
                setIsButtonClicked(!isButtonClicked);
                var mail = "";
                var pswd = generated_password_change;
                toggle_email(false);
                marg_switch("montre_add");
            } else {
                var mail = Object.keys(website_dict[id])[0]
                var pswd = Object.values(website_dict[id])[0]
            }
            set_current_website(id)
            set_email_main(mail)
            set_change_email(mail)
            set_generated_password_main(pswd);
            change_generated_password(pswd);
            change_generated_password_confirm(pswd);
        }, 100);
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
        set_change_email(event.target.value)
    }
    const handle_password_change = (event) => {
        change_generated_password(event.target.value)
    }
    const handle_password_change_confirm = (event) => {
        change_generated_password_confirm(event.target.value)
    }

    function submit_new_website(event) {
        event.preventDefault();

        var site = form_website.current.value
        if (form_password.current.value === form_confirm_password.current.value) {
            website_dict[site] = {[form_email.current.value] : form_password.current.value};
            set_new_website_dict(website_dict);

            toggle_email(true);
            toggle_password(true);
            toggle("");
            document.getElementById("email_add_new").value="";
            document.getElementById("website_new").value="";
            marg_switch("montre_display");

            var mail = Object.keys(website_dict[site])[0]
            var pswd = Object.values(website_dict[site])[0]
            set_current_website(site)
            set_email_main(mail)
            set_change_email(mail)
            set_generated_password_main(pswd);
            change_generated_password(pswd);
            change_generated_password_confirm(pswd);
        } else {
            alert("Les deux mots passes ne sont pas identique !")
        }
    }

    function display_another_password(site, username) {
        // var site = website_current

        toggle_email(true);
        toggle_password(true);
        toggle("");
        document.getElementById("email_add").value="";
        marg_switch("montre_display");

        var pswd = website_dict[site][username]
        set_email_main(username)
        set_change_email(username)
        set_generated_password_main(pswd);
        change_generated_password(pswd);
        change_generated_password_confirm(pswd);
    }

    function submit_new_password(event) {
        event.preventDefault();

        var site = website_current
        var username = form_new_email.current.value
        if (form_new_password.current.value === form_confirm_new_password.current.value) {
            console.log(username);
            console.log(email_main);

            website_dict[site][username] = form_new_password.current.value;
            set_new_website_dict(website_dict);

            display_another_password(site, username)
        } else {
            alert("Les deux mots passes ne sont pas identique !")
        }
    }

    function submit_change_password(event) {
        event.preventDefault();

        var site = website_current
        var username = form_change_email.current.value
        if (form_change_password.current.value === form_confirm_change_password.current.value) {
            if (username === email_main) {
                website_dict[site][username] = form_new_password.current.value;
            } else {
                delete Object.assign(website_dict[site], {[username]: form_change_password.current.value})[email_main];
                // website_dict[site][username] = form_new_password.current.value;
            }
            set_new_website_dict(website_dict);

            display_another_password(site, username)
        } else {
            alert("Les deux mots passes ne sont pas identique !")
        }
    }

    function delete_password(username) {
        var site = website_dict[website_current]

        delete site[username]
        set_new_website_dict(website_dict)
        if (Object.keys(site).length === 0) {
            toggle_email(false);
            toggle_password(true);
            toggle("");
            document.getElementById("email_add").value="";
            marg_switch("montre_add");
        } else {
            display_another_password(site, Object.keys(site)[0])
        }
    }

    function delete_website(website) {
        delete website_dict[website]
        set_new_website_dict(website_dict)

        if (Object.keys(website_dict).length === 0) {
            toggle_email(false);
            toggle_password(true);
            toggle("add_password");
            document.getElementById("email_add_new").value="";
            document.getElementById("website_new").value="";
        } else {
            var site = Object.keys(website_dict)[0];
            set_current_website(site)
            display_another_password(site, Object.keys(website_dict[site])[0])
        }
    }

    function cancel_add() {
        toggle("")
        toggle_password(true);
        change_generated_password(generated_password_main)
        change_generated_password_confirm(generated_password_main)
        if (Object.keys(website_dict[website_current]).length !== 0) {
            toggle_email(true);
            marg_switch("montre_display")
        } else {
            marg_switch("montre_add")
        }
        document.getElementById("email_add").value="";
        document.getElementById("email_add_new").value="";
        document.getElementById("website_new").value="";
    }

    return (
        <div className="postLogin">
            <Navbar/>
            <div id="presentation">{"Bonjour "+state["nom"]+" "+state["prenom"]}</div>

            <div className="website_container">
                <div className="titre_website">Website list</div>
                {/* <TbWorld color="www_icone white" size={36}/> */}

                <div className="liste_website">
                    <input className="recherche" placeholder="Recherche" onChange={(e) => set_search(e.target.value)}></input>

                    <div className="encoche" onClick={() => {toggle("add_password");toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked)}}></div>
                    <div className="addButton addButton--active" onClick={() => {toggle("add_password");toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked)}}></div>
                    <div className="carre"></div>

                    <div className="list_site_marg"></div>
                    <div className="list_site_cont">
                        {
                            Object.keys(website_dict).length !== 0 ? Object.entries(website_dict).map( ([key, value]) => search === "" || key.includes(search) ? 
                                                                                                                <div id={key} className="site underline" onClick={(e) => {
                                                                                                                    transi_website();
                                                                                                                    toggle("");
                                                                                                                    toggle_email(true);
                                                                                                                    toggle_password(true);
                                                                                                                    set_current_website_props(e); }}>{key}
                                                                                                                </div> : null
                                                                                                                ) : <div className="site underline" onClick={() => {toggle("add_password");toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked)}}>Add</div> 
                        }
                    </div>
                </div>
            </div>

            <div className={" add_password_container " + add_password} >
                    <div className="new_password_cont">
                        <form id="form_new_website" onSubmit={(event) => {submit_new_website(event)}}>
                            <div className="titre_website">Website : </div>
                            <input id="website_new" type="text" className="website_field" placeholder="Example.com" ref={form_website} required></input>

                            <div className={"marge " + switch_}>
                                <div className="display_password">
                                    <div className="titre_email"> Email / Username :</div>
                                    <input id="email_add_new" type={"text"} className="email_field" placeholder="Example@example.com" ref={form_email} required></input>
                                    <button type="button" className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("email_add_new").value)}><BsClipboardPlus/></button>

                                    <div className="titre_password">Password :</div>
                                    <input id="password_add_new" type={password} className="password_field" readOnly={edit_password} value={generated_password_change} onChange={handle_password_change}ref={form_password} required></input>
                                    <button type="button" className={"btn_copy " + active_password} onClick={() => toggle_password(!edit_password)}><AiOutlineEdit/></button>
                                    <button type="button" className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("password_add_new").value)}><BsClipboardPlus/></button>

                                    <div className={"titre_password " + cacher}>Confirm Password :</div>
                                    <input type={"text"} className={"password_field " + cacher} value={generated_password_change_confirm} onChange={handle_password_change_confirm} ref={form_confirm_password} required></input>
                                    <button type="button" className={cacher + " btn_copy btn_generate"} onClick={() => setIsButtonClicked(!isButtonClicked)}>Generate</button>

                                    <button type="submit" className={email_change + " btn_change "} >Confirm</button>
                                    <button type="button" className={email_change + " btn_change btn_cancel "} onClick={() => {cancel_add()}}>Cancel</button>

                                    <img src={strawberry_guy} alt="strawberry guy" className="strawberry_guy"></img>
                                </div>
                            </div>
                        </form>
                    </div>
            </div>

            <div className={transi + " password_container " + add_password}>
                <div className="account_container">
                    <div className="titre_website">Account list</div>

                    <div className="list_account_cont">
                        <div className="list_account">
                        {
                            Object.keys(website_dict).length !== 0 && Object.keys(website_dict[website_current]).length !== 0 ? Object.entries(website_dict[website_current]).map( ([key, value]) => <div id={key} className="site underline" onClick={(e) => {display_another_password(website_current, e.target.getAttribute("id"))}}>{key}</div>) : <div className="site underline" onClick={() => {marg_switch("montre_add"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked);}}>Add</div>
                        }
                        </div>

                        <div className="list_account_marg"></div>
                        <div className="encoche" onClick={() => {marg_switch("montre_add"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked);}}></div>
                        <div className="addButton addButton--active" onClick={() => {marg_switch("montre_add"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked);}}></div>
                        <div className="carre"></div>

                        <button type="button" className="delete_website" onClick={() => delete_website(website_current)}>Delete Website</button>
                    </div>
                </div>

                <div className="display_password_cont">
                    <div className="display_password_cont_titre ">
                        <div className="titre_website">{website_current}</div>

                        <div className={"marge " + switch_}>
                            <div className="display_password">
                                <form id="form_change_password" onSubmit={(event) => submit_change_password(event)}>
                                    <div className="titre_email"> Email / Username :</div>
                                    <input id="email" type={"text"} className="email_field" readOnly={edit_email} value={change_email} onChange={handle_email_change} ref={form_change_email}></input>
                                    <button type="button" className={"btn_copy " + active_email} onClick={() => toggle_email(!edit_email)}><AiOutlineEdit/></button>
                                    <button type="button" className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("email").value)}><BsClipboardPlus/></button>

                                    <div className="titre_password">Password :</div>
                                    <input id="password" type={password} className="password_field" readOnly={edit_password} value={generated_password_change} onChange={handle_password_change} ref={form_change_password}></input>
                                    <button type="button" className={"btn_copy " + active_password} onClick={() => toggle_password(!edit_password)}><AiOutlineEdit/></button>
                                    <button type="button" className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("password").value)}><BsClipboardPlus/></button>

                                    <div className={"titre_password " + cacher}>Confirm Password :</div>
                                    <input type={"text"} className={"password_field " + cacher} value={generated_password_change_confirm} onChange={handle_password_change_confirm} ref={form_confirm_change_password}></input>
                                    <button type="button" className={cacher + " btn_copy btn_generate"} onClick={() => setIsButtonClicked(!isButtonClicked)}>Generate</button>

                                    <button type="submit" className={email_change + " btn_change " + cacher}>Change</button>
                                    <button type="button" className={email_change + " btn_change btn_cancel " + cacher} onClick={() => {toggle_email(true);toggle_password(true);set_change_email(email_main);change_generated_password(generated_password_main);change_generated_password_confirm(generated_password_main);}}>Cancel</button>
                                    <button type="button" className={cacher + " btn_change btn_delete "} onClick={() => {delete_password(email_main);}}>Delete</button>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="new_password_cont">
                        <div className={"marge " + switch_}>
                            <div className="display_password">
                                <form id="form_new_password" onSubmit={(event) => {submit_new_password(event)}}>
                                    <div className="titre_email"> Email / Username :</div>
                                    <input id="email_add" type={"text"} className="email_field" placeholder="Example@example.com" ref={form_new_email} required></input>
                                    <button type="button" className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("email_add").value)}><BsClipboardPlus/></button>

                                    <div className="titre_password">Password :</div>
                                    <input id="password_add" type={password} className="password_field" readOnly={edit_password} value={generated_password_change} onChange={handle_password_change} ref={form_new_password} required></input>
                                    <button type="button" className={"btn_copy " + active_password} onClick={() => toggle_password(!edit_password)}><AiOutlineEdit/></button>
                                    <button type="button" className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("password_add").value)}><BsClipboardPlus/></button>

                                    <div className={"titre_password " + cacher}>Confirm Password :</div>
                                    <input type={"text"} className={"password_field " + cacher} value={generated_password_change_confirm} onChange={handle_password_change_confirm} ref={form_confirm_new_password} required></input>
                                    <button type="button" className={cacher + " btn_copy btn_generate"} onClick={() => setIsButtonClicked(!isButtonClicked)}>Generate</button>

                                    <button type="submit" className={email_change + " btn_change "}>Confirm</button>
                                    <button type="button" className={email_change + " btn_change btn_cancel "} onClick={() => cancel_add()}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default PostLogin;
