import "./Header.css";
import image1 from "../../assets/image1.png";
import "../UI/button/Button.css"
import Button from '../UI/button/Button'




const Header = () => {
  return (
    <section id="header">
      <div className="container header">
        <div className="header-left">
          <h1>
            <span>Une phrase courte</span>
            <span>Web & Mobile</span>
            <span>Une phrase courte</span>
          </h1>
          <p className="u-text-small">
            Fraise est un Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Obcaecati ea aliquam sit nemo nisi! Nesciunt quis illum id qui
            et!
          </p>
          <div className="header-cta">
            <Button text={"Nous Rejoindre"} btnClass={"btn-dark"} href={"#"} />
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