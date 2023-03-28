import React from "react";
import "./VerifEmail.css"
import {Navbar} from "..";
import QRCode from "react-qr-code";
// import {useLocation } from 'react-router-dom';
import * as OTPAuth from "otpauth";



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

const token_otp = OTPAuth.Secret.fromUTF8(secret).base32
// console.log(key)




function VerifEmail() {
    // const {state} = useLocation();
    const queryParameters = new URLSearchParams(window.location.search)
    let uuid = queryParameters.get("uuid");
    // console.log(uuid);

    var csrftoken = getCookie('csrftoken');

    if (uuid) {
        fetch('/api/user/'+uuid+'/verif_mail/', {
            method: 'get',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'X-CSRFToken': csrftoken
            }
        })
        .then(response=>response.json())
        .then((data)=> {
            // console.log(data)
        })
    }

    // useEffect(() => {
    //     //console.log(state)
    //     // verif(uuid)
    // }, [])

    return (
        <div className="VerifEmail">
            <Navbar/>
            {/* {verif(uuid)} */}
            <div id="verif_mail"> <p>{"Compte activé ! vous pouvez vous connecter."}</p></div>

            <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>
            <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%"}}
            value={"otpauth://totp/Fraise?secret="+token_otp}
            viewBox={'0 0 256 256'}
            />
            </div>
        </div>

    );
}

export default VerifEmail;
