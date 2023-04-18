import React, {useState, useRef, useEffect} from "react";
import "./VerifEmail.css"
import {useNavigate} from "react-router-dom";
import {Navbar} from "..";
import QRCode from "react-qr-code";
// import {useLocation } from 'react-router-dom';
import * as OTPAuth from "otpauth";
import totp_tuto from '../../assets/totp_tuto.jpg'



function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const secret = window.crypto.getRandomValues(new Uint16Array(3)).reduce(
    (prev, curr, index) => (
        prev = prev.toString(16).toUpperCase()
    ) + (
        curr =  curr.toString(16).toUpperCase()
    )
).split('').sort(() => 128 -
    window.crypto.getRandomValues(new Uint32Array(1))[0]
).join('')

const secret_otp = OTPAuth.Secret.fromUTF8(secret).base32

// console.log(key)


function VerifEmail() {
    // const {state} = useLocation();
    const navigate = useNavigate();

    const queryParameters = new URLSearchParams(window.location.search)
    let uuid = encodeURI(queryParameters.get("uuid"));
    let email = encodeURI(queryParameters.get("email"));
    // console.log(uuid);

    var csrftoken = getCookie('csrftoken');

    useEffect(() => {
        if (uuid) {
            fetch('/api/user/' + uuid + '/verif_mail/', {
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'X-CSRFToken': csrftoken
                }
            })
                .then(response => response.json())
                .then((data) => {
                    // console.log(data)
                })
        }
    }, [])

    useEffect(() => {
        let totp = new OTPAuth.TOTP({
            issuer: 'Fraise',
            label: email,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: secret_otp,
        })
        set_totp(totp)
    }, [email])
    

    const form_totp = useRef("")
    const [rotate, set_rotate] = useState("")
    const [totp, set_totp] = useState("")

    function submit_verif_totp(event) {
        event.preventDefault();
        
        var token_otp = encodeURI(form_totp.current.value)
        // var token = totp.generate();
        // console.log(token);
        var delta = totp.validate({token: token_otp, window: 0})
        // console.log(delta);
        if (delta !== null) {
            let formField = {
                'secret_totp': secret_otp,
                'uuid': uuid,
            }
            formField = JSON.stringify(formField)

            fetch('/api/user/set_totp/', {
                method: 'POST',
                body: formField,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'X-CSRFToken': csrftoken,
                }
            })
            .then(response => response.json())
            .then((data) => {
                if (data['status'] === 'ok') {
                    navigate("/Login");
                }
            })
            
        } else {
            alert("Error: wrong code or an error occured while scanning the qrcode")
        }
    }

    return (
        <div className="VerifEmail">
            <Navbar />
            {/* {verif(uuid)} */}

            <div className="contenair">
                <div id="verif_mail"> <p>{"Account activated"}</p></div>

                <div className={"wheel_cont rotate_" + rotate}>
                    <div className="totp_setup">
                        Mfa set up :
                        <br />
                        <br />
                        Scan this QRcode with an MFA app on your phone (google authenticator)

                        <div className='qrcode' >
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                // value={"otpauth://totp/Fraise?secret=" + secret_otp}
                                value={totp.toString()}
                                viewBox={'0 0 256 256'}
                            />
                        </div>

                        <button className={"bttn next"} onClick={() => { set_rotate('left') }}> Next </button>
                    </div>

                    <div className="totp_verif">
                        Verify the code :
                        <br />
                        <br />
                        Enter the code to finish the configuration
                        <br />
                        <br />

                        <form id="totp_verif" onSubmit={(event)=> submit_verif_totp(event)}>
                            <input type="number" className="input_verif" ref={form_totp} placeholder="Code" required></input>

                            <button className={"bttn confirm"} onClick={() => { set_rotate('left') }}> Confirm </button>
                        </form>

                        <img className="tuto_totp" src={totp_tuto} alt="tuto" />

                        <button className={"bttn prev"} onClick={() => { set_rotate('right') }}> Prev </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default VerifEmail;
