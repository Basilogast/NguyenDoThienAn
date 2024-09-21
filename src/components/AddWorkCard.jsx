import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const AddWorkCard = ({ addNewWorkCard }) => {
  const [workData, setWorkData] = useState({
    img: null,
    text: "",
    textPara: "",
    pdfUrl: null,
    detailsRoute: "",
    size: "small", // Default size
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkData({
      ...workData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setWorkData({
      ...workData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure addNewWorkCard is a function
    if (typeof addNewWorkCard === 'function') {
      addNewWorkCard(workData);
    } else {
      console.error("addNewWorkCard is not a function");
    }
    navigate("/NguyenDoThienAn/");
  };

  return (
    <Container>
      <h2>Add a New Work Card</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formWorkTitle">
          <Form.Label>Work Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter work title"
            name="text"
            value={workData.text}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formWorkTextPara">
          <Form.Label>Description (Comma separated list)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description (separated by commas)"
            name="textPara"
            value={workData.textPara}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formWorkImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formWorkPdf">
          <Form.Label>PDF File</Form.Label>
          <Form.Control
            type="file"
            name="pdfUrl"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </Form.Group>

        <Form.Group controlId="formDetailsRoute">
          <Form.Label>Details Route</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter details route (optional)"
            name="detailsRoute"
            value={workData.detailsRoute}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formWorkSize">
          <Form.Label>Card Size</Form.Label>
          <Form.Control
            as="select"
            name="size"
            value={workData.size}
            onChange={handleInputChange}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add WorkCard
        </Button>
      </Form>
    </Container>
  );
};
