import './App.css';
import Helmet from 'react-helmet'
//import Accueil from "./components/accueil/Accueil";
import Login from "./Components/login/Login";


import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

//On récupère les compenents de index.js
// import {Accueil} from "./components";



function App() {
  return (
    <div>
      <Login/>
    </div>  
  );
}

export default App;

