import React, { useEffect, useRef, useState } from "react";
import "./PostLogin.css"
import { Navbar } from "../../Components";
import { useLocation, useNavigate } from 'react-router-dom';
import { BsClipboardPlus } from "react-icons/bs" //React-logo d'une fraise
import { AiOutlineEdit } from "react-icons/ai" //React-logo d'une fraise
import strawberry_guy from "../../assets/strawberry_guy.png" //React-logo d'une fraise
import {v4 as uuidv4} from 'uuid';

var CryptoJS = require("crypto-js");

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function check_jwt_exp() {
    var token = sessionStorage.getItem("access_token");

    if (token) {
        try {
            var token_data = JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return 'ko'
        }

        if (token_data.exp * 1000 > Date.now()) {
            // console.log('token exp: '+token_data.exp, 'now : '+Date.now().toString());
            // return "access_token "+token
            return false
        } else {
            return true
            // return "refresh_token "+sessionStorage.getItem("refresh_token"); 
        }
    }
}


function AES256_encode(password, key) {
    var uuid = uuidv4();
    var crypt_key = CryptoJS.SHA256(key+uuid).toString(CryptoJS.enc.Base64)

    var encrypted = CryptoJS.AES.encrypt(uuid+password, crypt_key).toString();

    return uuid+"$"+encrypted
}

function AES256_decode(password_chiffre, key) {
    var uuid = password_chiffre.split('$')[0];
    var decrypt_key = CryptoJS.SHA256(key+uuid).toString(CryptoJS.enc.Base64)

    var decrypted = CryptoJS.AES.decrypt(password_chiffre.split('$')[1], decrypt_key).toString(CryptoJS.enc.Utf8);

    return {'uuid': decrypted.slice(0, 35), 'password': decrypted.slice(36, decrypted.length)}
    // return decrypted.slice(36, decrypted.length)
}

function dechiffre_les_mdp(passwords_chiffre) {
    // console.log(passwords_chiffre);                           
    var key = sessionStorage.getItem('front_key')
    var webiste_dechiffre = {}

    if (passwords_chiffre) {
        for (const [site, compte] of Object.entries(passwords_chiffre)) {
            var decod = AES256_decode(site, key)
            webiste_dechiffre[decod.password] ??= {'value': {}, 'uuid': compte.uuid}

            for (const [email, password] of Object.entries(compte.value)) {
                var email_dechiffre = AES256_decode(email, key)
                var password_dechiffre = AES256_decode(password.value, key)

                webiste_dechiffre[decod.password].value[email_dechiffre.password] = {'value': password_dechiffre.password, 'uuid': password.uuid}
        }}
        // console.log(webiste_dechiffre);
    }
    return webiste_dechiffre
}

function PostLogin() {
    const { state } = useLocation();
    const navigate = useNavigate();

    // var test = AES256_encode("test", '123')
    // console.log(AES256_decode(test, '123').password, AES256_decode(test, '123').uuid);

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

    const [website_dict, set_new_website_dict] = useState(dechiffre_les_mdp(state["passwords"]));
    const [website_current, set_current_website] = useState(Object.keys(website_dict)[0]);

    async function refresh_jwt_token() {
        var csrftoken = getCookie('csrftoken');
        var token = sessionStorage.getItem('refresh_token')

        let formField = {
            'refresh': token,
        }
        formField = JSON.stringify(formField)

        await fetch('/api/token/refresh/', {
            method: 'POST',
            body: formField,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'X-CSRFToken': csrftoken,
                'Authorization': 'refresh_token ' + token
            }
        })
            .then(response => response.json())
            .then((data) => {
                // console.log(data);

                if (data['access']) {
                    sessionStorage.setItem('access_token', data['access'])
                    // console.log('ok');
                    // return 'ok'
                } else {
                    alert('session expirer')
                    sessionStorage.clear()
                    navigate("/login");
                }
            })
    }

    function set_current_website_props(e) {
        var id = e.target.getAttribute("id")
        setTimeout(() => {
            if (switch_ !== "montre_display") {
                marg_switch("montre_display");
            }
            var mail
            var pswd
            if (Object.keys(website_dict[id].value).length === 0) {
                setIsButtonClicked(!isButtonClicked);
                mail = "";
                pswd = generated_password_change;
                toggle_email(false);
                marg_switch("montre_add");
            } else {
                mail = Object.keys(website_dict[id].value)[0]
                pswd = Object.values(website_dict[id].value)[0].value
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
                    curr = s.substr(Math.floor(s.length * Math.random()), 1)
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

    async function submit_new_website(event) {
        event.preventDefault();

        var uuid = uuidv4();
        var website_uuid = uuidv4();
        var key = sessionStorage.getItem('front_key')
        var site = form_website.current.value

        // console.log(sessionStorage.getItem("access_token")); 
        // const test = await refresh_jwt_token()
        // console.log(test);
        // console.log(sessionStorage.getItem("access_token")); 
        
        if (check_jwt_exp()) {
            await refresh_jwt_token();
        }
        
        if (form_password.current.value === form_confirm_password.current.value) {
            var csrftoken = getCookie('csrftoken');
            let formField = [{
                'website_uuid': website_uuid,
                'uuid': uuid,
                "website": AES256_encode(site, key),
                "email": AES256_encode(form_email.current.value, key),
                "password_chiffre": AES256_encode(form_password.current.value, key),
            }]
            formField = JSON.stringify(formField)

            fetch('/api/password/create_password/', {
                method: 'POST',
                body: formField,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'X-CSRFToken': csrftoken,
                    // 'X-CSRFToken': 'twgYTe9Ivn1g9idFuGjZXLY3HIFctEgk',
                    'Authorization': "Bearer "+sessionStorage.getItem("access_token") 
                    // 'Authorization': token 
                }
            })
            .then(response => response.json())
            .then((data) => {
                // console.log(data);

                if (data['status'] === 'ok') {
                    website_dict[site] = {'value': {[form_email.current.value]: {'value': form_password.current.value, 'uuid': uuid}}, 'uuid': website_uuid};
                    set_new_website_dict(website_dict);

                    toggle_email(true);
                    toggle_password(true);
                    toggle("");
                    document.getElementById("email_add_new").value = "";
                    document.getElementById("website_new").value = "";
                    marg_switch("montre_display");

                    var mail = Object.keys(website_dict[site].value)[0]
                    var pswd = Object.values(website_dict[site].value)[0].value
                    set_current_website(site)
                    set_email_main(mail)
                    set_change_email(mail)
                    set_generated_password_main(pswd);
                    change_generated_password(pswd);
                    change_generated_password_confirm(pswd);
                }
            })

        } else {
            alert("Les deux mots passes ne sont pas identique !")
        }
    }

    function display_another_password(site, username) {
        // var site = website_current

        toggle_email(true);
        toggle_password(true);
        toggle("");
        document.getElementById("email_add").value = "";
        marg_switch("montre_display");

        var pswd = website_dict[site].value[username].value
        set_email_main(username)
        set_change_email(username)
        set_generated_password_main(pswd);
        change_generated_password(pswd);
        change_generated_password_confirm(pswd);
    }

    async function submit_new_password(event) {
        event.preventDefault();

        var uuid = uuidv4();
        var site = website_current
        var website_uuid = website_dict[site].uuid;
        var key = sessionStorage.getItem('front_key')
        var username = form_new_email.current.value

        if (check_jwt_exp()) {
            await refresh_jwt_token();
        }
        
        if (form_password.current.value === form_confirm_password.current.value) {
            var csrftoken = getCookie('csrftoken');
            let formField = [{
                'website_uuid': website_uuid,
                'uuid': uuid,
                "website": AES256_encode(site, key),
                "email": AES256_encode(username, key),
                "password_chiffre": AES256_encode(form_password.current.value, key),
            }]
            formField = JSON.stringify(formField)

            fetch('/api/password/create_password/', {
                method: 'POST',
                body: formField,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'X-CSRFToken': csrftoken,
                    'Authorization': "Bearer "+sessionStorage.getItem("access_token") 
                }
            })
            .then(response => response.json())
            .then((data) => {
                if (data['status'] === 'ok') {
                        website_dict[site].value[username] = {'value': form_new_password.current.value, 'uuid': uuid};
                        set_new_website_dict(website_dict);

                        display_another_password(site, username)
                }
            })
        } else {
            alert("Les deux mots passes ne sont pas identique !")
        }
    }

    async function submit_change_password(event) {
        event.preventDefault();

        var site = website_current
        var username = form_change_email.current.value
        var uuid = website_dict[site].value[email_main].uuid 
        var key = sessionStorage.getItem('front_key')

        if (check_jwt_exp()) {
            await refresh_jwt_token();
        }
        
        if (form_change_password.current.value === form_confirm_change_password.current.value) {
            var csrftoken = getCookie('csrftoken');
            let formField = [{
                'website_uuid': website_dict[site].uuid,
                'uuid': uuid,
                "website": AES256_encode(site, key),
                "email": AES256_encode(username, key),
                "password_chiffre": AES256_encode(form_password.current.value, key),
            }]
            formField = JSON.stringify(formField)

            fetch('/api/password/change_password/', {
                method: 'POST',
                body: formField,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'X-CSRFToken': csrftoken,
                    'Authorization': "Bearer "+sessionStorage.getItem("access_token") 
                }
            })
            .then(response => response.json())
            .then((data) => {
                if (data['status'] === 'ok') {
                    Object.assign(website_dict[site].value, { [username]: { 'value': form_change_password.current.value, 'uuid': uuid } });

                    if (username !== email_main) {
                        delete website_dict[site].value[email_main]
                    }

                    set_new_website_dict(website_dict);

                    display_another_password(site, username)
                }
            })
        } else {
            alert("Les deux mots passes ne sont pas identique !")
        }
    }

    async function delete_password(username) {
        var site = website_dict[website_current].value
        var uuid = site[username].uuid
        var csrftoken = getCookie('csrftoken');

        if (check_jwt_exp()) {
            await refresh_jwt_token();
        }
        
        let formField = {
            'uuid': uuid,
        }
        formField = JSON.stringify(formField)

        fetch('/api/password/delete_password/', {
            method: 'POST',
            body: formField,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'X-CSRFToken': csrftoken,
                'Authorization': "Bearer "+sessionStorage.getItem("access_token") 
            }
        })
        .then(response => response.json())
        .then((data) => {
            if (data['status'] === 'ok') {
                delete site[username]
                set_new_website_dict(website_dict)

                if (Object.keys(site).length === 0) {
                    toggle_email(false);
                    toggle_password(true);
                    toggle("");
                    document.getElementById("email_add").value = "";
                    marg_switch("montre_add");
                } else {
                    display_another_password(website_current, Object.keys(site)[0])
                }
            }
        })
    }

    async function delete_website(website) {
        var site = website_dict[website]
        var website_uuid = site.uuid
        var csrftoken = getCookie('csrftoken');

        if (check_jwt_exp()) {
            await refresh_jwt_token();
        }
        
        let formField = {
            'website_uuid': website_uuid,
        }
        formField = JSON.stringify(formField)

        fetch('/api/password/delete_website/', {
            method: 'POST',
            body: formField,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'X-CSRFToken': csrftoken,
                'Authorization': "Bearer "+sessionStorage.getItem("access_token") 
            }
        })
        .then(response => response.json())
        .then((data) => {
            if (data['status'] === 'ok') {
                delete website_dict[website]
                set_new_website_dict(website_dict)

                if (Object.keys(website_dict).length === 0) {
                    toggle_email(false);
                    toggle_password(true);
                    toggle("add_password");
                    document.getElementById("email_add_new").value = "";
                    document.getElementById("website_new").value = "";
                } else {
                    var site = Object.keys(website_dict)[0];
                    set_current_website(site)
                    display_another_password(site, Object.keys(website_dict[site].value)[0])
                    setIsButtonClicked(!isButtonClicked)
                    transi_website()
                }
            }
        })
        // console.log(website_dict);
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
        document.getElementById("email_add").value = "";
        document.getElementById("email_add_new").value = "";
        document.getElementById("website_new").value = "";
    }

    return (
        <div className="postLogin">
            <Navbar />
            <div id="presentation">{"Bonjour " + state["nom"] + " " + state["prenom"]}</div>

            <div className="website_container">
                <div className="titre_website">Website list</div>
                {/* <TbWorld color="www_icone white" size={36}/> */}

                <div className="liste_website">
                    <input className="recherche" placeholder="Recherche" onChange={(e) => set_search(e.target.value)}></input>

                    <div className="encoche" onClick={() => { toggle("add_password"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked) }}></div>
                    <div className="addButton addButton--active" onClick={() => { toggle("add_password"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked) }}></div>
                    <div className="carre"></div>

                    <div className="list_site_marg"></div>
                    <div className="list_site_cont">
                        {
                            Object.keys(website_dict).length !== 0 ? Object.entries(website_dict).map(([key, value]) => search === "" || key.includes(search) ?
                                <div id={key} className="site underline" onClick={(e) => {
                                    transi_website();
                                    toggle("");
                                    toggle_email(true);
                                    toggle_password(true);
                                    set_current_website_props(e);
                                }}>{key}
                                </div> : null
                            ) : <div className="site underline" onClick={() => { toggle("add_password"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked) }}>Add</div>
                        }
                    </div>
                </div>
            </div>

            <div className={" add_password_container " + add_password} >
                <div className="new_password_cont">
                    <form id="form_new_website" onSubmit={(event) => { submit_new_website(event) }}>
                        <div className="titre_website">Website : </div>
                        <input id="website_new" type="text" className="website_field" placeholder="Example.com" ref={form_website} required></input>

                        <div className={"marge " + switch_}>
                            <div className="display_password">
                                <div className="titre_email"> Email / Username :</div>
                                <input id="email_add_new" type={"text"} className="email_field" placeholder="Example@example.com" ref={form_email} required></input>
                                <button type="button" className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("email_add_new").value)}><BsClipboardPlus /></button>

                                <div className="titre_password">Password :</div>
                                <input id="password_add_new" type={password} className="password_field" readOnly={edit_password} value={generated_password_change} onChange={handle_password_change} ref={form_password} required></input>
                                <button type="button" className={"btn_copy " + active_password} onClick={() => toggle_password(!edit_password)}><AiOutlineEdit /></button>
                                <button type="button" className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("password_add_new").value)}><BsClipboardPlus /></button>

                                <div className={"titre_password " + cacher}>Confirm Password :</div>
                                <input type={"text"} className={"password_field " + cacher} value={generated_password_change_confirm} onChange={handle_password_change_confirm} ref={form_confirm_password} required></input>
                                <button type="button" className={cacher + " btn_copy btn_generate"} onClick={() => setIsButtonClicked(!isButtonClicked)}>Generate</button>

                                <button type="submit" className={email_change + " btn_change "} >Confirm</button>
                                <button type="button" className={email_change + " btn_change btn_cancel "} onClick={() => { cancel_add() }}>Cancel</button>

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
                                Object.keys(website_dict).length !== 0 && Object.keys(website_dict[website_current].value).length !== 0 ? Object.entries(website_dict[website_current].value).map(([key, value]) => <div id={key} className="site underline" onClick={(e) => { display_another_password(website_current, e.target.getAttribute("id")) }}>{key}</div>) : <div className="site underline" onClick={() => { marg_switch("montre_add"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked); }}>Add</div>
                            }
                        </div>

                        <div className="list_account_marg"></div>
                        <div className="encoche" onClick={() => { marg_switch("montre_add"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked); }}></div>
                        <div className="addButton addButton--active" onClick={() => { marg_switch("montre_add"); toggle_email(false); toggle_password(true); setIsButtonClicked(!isButtonClicked); }}></div>
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
                                    <button type="button" className={"btn_copy " + active_email} onClick={() => toggle_email(!edit_email)}><AiOutlineEdit /></button>
                                    <button type="button" className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("email").value)}><BsClipboardPlus /></button>

                                    <div className="titre_password">Password :</div>
                                    <input id="password" type={password} className="password_field" readOnly={edit_password} value={generated_password_change} onChange={handle_password_change} ref={form_change_password}></input>
                                    <button type="button" className={"btn_copy " + active_password} onClick={() => toggle_password(!edit_password)}><AiOutlineEdit /></button>
                                    <button type="button" className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("password").value)}><BsClipboardPlus /></button>

                                    <div className={"titre_password " + cacher}>Confirm Password :</div>
                                    <input type={"text"} className={"password_field " + cacher} value={generated_password_change_confirm} onChange={handle_password_change_confirm} ref={form_confirm_change_password}></input>
                                    <button type="button" className={cacher + " btn_copy btn_generate"} onClick={() => setIsButtonClicked(!isButtonClicked)}>Generate</button>

                                    <button type="submit" className={email_change + " btn_change " + cacher}>Change</button>
                                    <button type="button" className={email_change + " btn_change btn_cancel " + cacher} onClick={() => { toggle_email(true); toggle_password(true); set_change_email(email_main); change_generated_password(generated_password_main); change_generated_password_confirm(generated_password_main); }}>Cancel</button>
                                    <button type="button" className={cacher + " btn_change btn_delete "} onClick={() => { delete_password(email_main); }}>Delete</button>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="new_password_cont">
                        <div className={"marge " + switch_}>
                            <div className="display_password">
                                <form id="form_new_password" onSubmit={(event) => { submit_new_password(event) }}>
                                    <div className="titre_email"> Email / Username :</div>
                                    <input id="email_add" type={"text"} className="email_field" placeholder="Example@example.com" ref={form_new_email} required></input>
                                    <button type="button" className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("email_add").value)}><BsClipboardPlus /></button>

                                    <div className="titre_password">Password :</div>
                                    <input id="password_add" type={password} className="password_field" readOnly={edit_password} value={generated_password_change} onChange={handle_password_change} ref={form_new_password} required></input>
                                    <button type="button" className={"btn_copy " + active_password} onClick={() => toggle_password(!edit_password)}><AiOutlineEdit /></button>
                                    <button type="button" className="btn_copy" onClick={() => navigator.clipboard.writeText(document.getElementById("password_add").value)}><BsClipboardPlus /></button>

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
