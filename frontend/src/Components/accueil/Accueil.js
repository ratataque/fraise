import './Accueil.css';

//On récupère les compenents de index.js
import {Navbar, Header, AboutUs, Features, Footer} from "../../Components";




function Accueil() {
  return (
    <main>
      <header className="header-bg">
        
        <Navbar/>
        <Header/>
      </header>
      <body>
      </body>
        <Footer/>
    </main>
  );
}

export default Accueil;
