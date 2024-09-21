import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import WorkCard from "./WorkCard";

import LYN from "../assets/img/works/LYN.png";
import HP from "../assets/img/works/HP.png";
import OTEKER from "../assets/img/works/workpage/OTEKER/4.1.mp4";
import HONGKONG from "../assets/img/works/HONGKONG.png";
import HONGKONG2 from "../assets/img/works/workpage/HONGKONG/GDN/GDN1.png";
import CELA from "../assets/img/works/CELA.png";
import DALMORE from "../assets/img/works/DALMORE.png";

import LYNpdf from "../assets/pdf/REPORT KOC _ LYN.pdf";
import HPpdf from "../assets/pdf/THE LAMP X BV HẠNH PHÚC PROPOSAL.pdf";
import HKpdf from "../assets/pdf/Hong Kong MX Moon Cake x The Lamp.pdf";
import CELApdf from "../assets/pdf/CELADON BOULEVARD_DIGITAL PROPOSAL 2024.pdf";
import DALpdf from "../assets/pdf/_Internal_Catalyst_2024.pdf";

export const Work = ({ workCards }) => {
  const styles = {
    pin_container: {
      margin: "0 auto",
      padding: 0,
      width: "80vw",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 300px)",
      gridAutoRows: "10px",
      justifyContent: "center",
      backgroundColor: "#121212",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      margin: "20px 0",
    },
  };

  return (
    <section className="work" id="work">
      <Container>
        <div className="d-flex flex-column align-items-center">
          <h2>MY DEDICATED WORKS</h2>
          <hr />
        </div>

        {/* Button to link to AddWorkCard component */}
        <div style={styles.buttonContainer}>
          <Link to="/NguyenDoThienAn/add-work">
            <Button variant="primary">Add New Work</Button>
          </Link>
        </div>

        <div style={styles.pin_container}>
          {/* Dynamically render WorkCard components from workCards prop */}
          {workCards.map((card, index) => (
            <WorkCard
              key={index}
              size={card.size}
              img={card.img}
              text={card.text}
              pdfUrl={card.pdfUrl}
              textPara={card.textPara}
              detailsRoute={card.detailsRoute}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
