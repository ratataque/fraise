import "./Header.css";
import image1 from "../../assets/lock.jpg";
import "../UI/button/Button.css"
import Button from '../UI/button/Button'




const Header = () => {
  return (
    <section id="header">
      <div className="container header">
        <div className="header-left">
          <h1>
            <span>Fraise est un gestionnaire</span>
            <span> de mot de passe</span>
            <span> en ligne</span>
          </h1>
          <p className="u-text-small">
            Uniquement vous, pouvez déchiffrer vos mots de passes, il est donc important
            de choisir un mot de passe mère dont vous pouvez vous souvenir car si vous
            l'oubliez, vos mot de passes stocké sur fraise le seront aussi !
          </p>
          <div className="header-cta">
            <Button text={"Nous Rejoindre"} btnClass={"btn-dark"} href={"#"} />
          </div>
        </div>
        <div className="header-right">
          <img src={image1} alt="image1" />
        </div>
      </div>
    </section>
  );
};

export default Header;