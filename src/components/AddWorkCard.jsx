import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import "./AddWorkCard.css"; // Add custom styles here

export const AddWorkCard = ({ addNewWorkCard }) => {
  const [workData, setWorkData] = useState({
    text: "",
    textPara: "",
    detailsRoute: "",
    size: "small", // Default size
  });

  const [imgFile, setImgFile] = useState(null); // Separate state for image file
  const [pdfFile, setPdfFile] = useState(null); // Separate state for PDF file

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
    if (name === "img") {
      setImgFile(files[0]); // Set the image file
    } else if (name === "pdfUrl") {
      setPdfFile(files[0]); // Set the PDF file
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const workDataToSend = {
      ...workData,
      textPara: workData.textPara.split(","), // Split by comma to match array format
    };

    const formData = new FormData();
    formData.append("text", workDataToSend.text);
    formData.append("textPara", workDataToSend.textPara);
    formData.append("detailsRoute", workDataToSend.detailsRoute);
    formData.append("size", workDataToSend.size);

    if (imgFile) {
      formData.append("img", imgFile);
    }
    if (pdfFile) {
      formData.append("pdfUrl", pdfFile);
    }

    if (typeof addNewWorkCard === "function") {
      addNewWorkCard(formData); // Pass FormData to the backend
    } else {
      console.error("addNewWorkCard is not a function");
    }

    navigate("/NguyenDoThienAn/");
  };

  return (
    <Container className="add-workcard-container">
      <h2 className="form-title">Add a New Work Card</h2>
      <Form onSubmit={handleSubmit} className="custom-form">
        <Form.Group controlId="formWorkTitle" className="form-group">
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

        <Form.Group controlId="formWorkTextPara" className="form-group">
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

        <Form.Group controlId="formWorkImage" className="form-group">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formWorkPdf" className="form-group">
          <Form.Label>PDF File</Form.Label>
          <Form.Control
            type="file"
            name="pdfUrl"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </Form.Group>

        <Form.Group controlId="formDetailsRoute" className="form-group">
          <Form.Label>Details Route</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter details route (optional)"
            name="detailsRoute"
            value={workData.detailsRoute}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formWorkSize" className="form-group">
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

        <Button variant="primary" type="submit" className="submit-btn">
          Add WorkCard
        </Button>
      </Form>
    </Container>
  );
};
