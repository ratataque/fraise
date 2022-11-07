import './Accueil.css';
import Helmet from 'react-helmet'

//On récupère les compenents de index.js
import {Navbar, Header, AboutUs, Features, Footer} from "../../components";




function Accueil() {
  return (
    <main>
      <header className="header-bg">
        
        <Navbar/>
        <Header/>
      </header>
      <body>
        <AboutUs/>
        <Features/>
      </body>
        <Footer/>
    </main>
  );
}

export default Accueil;
