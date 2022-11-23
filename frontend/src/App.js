import './App.css';
import Accueil from "./Components/accueil/Accueil";
import Login from "./Components/login/Login";
import PostLogin from './Components/PostLogin/PostLogin';
import PostSignup from './Components/PostSignup/PostSignup';
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
      </Routes>
    </Router>
  );
}

export default App;

