import React from "react";
import "./VerifEmail.css"
import {Navbar} from "..";
// import {useLocation } from 'react-router-dom';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


function VerifEmail() {
    // const {state} = useLocation();
    const queryParameters = new URLSearchParams(window.location.search)
    let uuid = queryParameters.get("uuid");
    // console.log(uuid);

    var csrftoken = getCookie('csrftoken');

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

    // useEffect(() => {
    //     //console.log(state)
    //     // verif(uuid)
    // }, [])

    return (
        <div className="VerifEmail">
            <Navbar/>
            {/* {verif(uuid)} */}
            <div id="test"> <p>{"Compte activé ! vous pouvez vous connecter."}</p></div>
        </div>
    );
}

export default VerifEmail;
