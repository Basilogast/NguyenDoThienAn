import { Container } from "react-bootstrap";
import aeonLogo from "../assets/img/client/aeonLogo.jpg";
import cafeAmazonLogo from "../assets/img/client/cafeAmazonLogo.png"
import fressiLogo from "../assets/img/client/fressiLogo.png"
import hanhphucLogo from "../assets/img/client/hanhphucLogo.png"
import herLogo from "../assets/img/client/herLogo.png"
import hongkongLogo from "../assets/img/client/hongkongLogo.png"
import kiehlLogo from "../assets/img/client/kiehlLogo.png"
import lifebuoyLogo from "../assets/img/client/lifebuoyLogo.png"
import otekerLogo from "../assets/img/client/otekerLogo.png"
import verizonLogo from "../assets/img/client/verizonLogo.jpg"


export const Client = () => {
  return (
    <section className="client">
      <Container>
        <div className="d-flex flex-column align-items-center">
          <h2>MY PREVIOUS CLIENTS</h2>
          <hr></hr>
        </div>
        <div className="row row-cols-5 logos">
          <div className="col imgContainer">
            <img src={otekerLogo} />
          </div>
          <div className="col imgContainer">
            <img src={hongkongLogo} />
          </div>
          <div className="col imgContainer">
            <img src={cafeAmazonLogo} />
          </div>
          <div className="col imgContainer">
            <img src={hanhphucLogo} />
          </div>
          <div className="col imgContainer">
            <img src={aeonLogo} />
          </div>
          <div className="col imgContainer">
            <img src={fressiLogo} />
          </div>
          <div className="col imgContainer">
            <img src={lifebuoyLogo} />
          </div>
          <div className="col imgContainer">
            <img src={kiehlLogo} />
          </div>
          <div className="col imgContainer">
            <img src={verizonLogo} />
          </div>
          <div className="col imgContainer">
            <img src={herLogo} />
          </div>
        </div>
      </Container>
    </section>
  );
};
