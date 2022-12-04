import './App.css';
import Accueil from "./Components/accueil/Accueil";
import Login from "./Components/login/Login";
import PostLogin from './Components/PostLogin/PostLogin';
import PostSignup from './Components/PostSignup/PostSignup';
import VerifEmail from './Components/VerifEmail/VerifEmail';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

//On récupère les compenents de index.js
// import {Accueil} from "./components";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/postLogin' element={<PostLogin/>}/>
        <Route path='/postSignup' element={<PostSignup/>}/>
        <Route path='/verifEmail' element={<VerifEmail/>}/>
      </Routes>
    </Router>
  );
}

export default App;

