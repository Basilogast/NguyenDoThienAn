import React from "react";
import star from "../assets/img/starinhand.png";
import hero from "../assets/img/heroImg.png";

import location from "../assets/img/location.svg";
import mail from "../assets/img/mail.svg";
import phone from "../assets/img/phone.svg";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const Footer = () => {
  return (
    <section className="footer" id="footer">
      <Container>
        <Row className="d-flex">
          <Col xs={12} md={4} xl={4}>
            <img src={star} />
            <h2>
              Work <br />
              with me
            </h2>
          </Col>
          <Col xs={12} md={3} xl={3}>
            <div className="imgWrapper">
              <img src={hero} className="profile" />
            </div>
          </Col>
          <Col xs={12} md={5} xl={5} style={{paddingLeft: "30px"}}>
            <hr />
            <div
              className="d-flex flex-column"
              style={{ width: "100%", height: "100%" }}
            >
              <div className="d-flex" style={{margin: "10px 0"}}>
                <div className="iconWrapper">
                  <img src={location} alt="location" />
                </div>
                <div>
                  <h3>Address</h3>
                  <p>8 District, Ho Chi Minh City, Viet Nam</p>
                </div>
              </div>
              <div className="d-flex" style={{margin: "10px 0"}}>
                <div className="iconWrapper">
                  <img src={mail} alt="location" />
                </div>
                <div>
                  <h3>Email</h3>
                  <p className="email-wrapper">annguyen20112003@gmail.com</p>
                </div>
              </div>
              <div className="d-flex" style={{margin: "10px 0"}}>
                <div className="iconWrapper">
                  <img src={phone} alt="location" />
                </div>
                <div>
                  <h3>Phone</h3>
                  <p>0902784042</p>
                </div>
              </div>
               {/* Send Message Form */}
               <Form>
                <Form.Group controlId="messageInput" style={{ margin: "10px 0", fontSize: "18px" }}>
                  <Form.Label>Send me a message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Type your message..."
                    style={{fontSize: "18px"}}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="sendMessageButton" style={{fontSize: "18px"}}>
                  Send
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
