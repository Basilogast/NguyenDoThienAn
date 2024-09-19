import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import WorkCard from "./WorkCard";

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
