import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import "./AddWorkCard.css"; // Add custom styles here

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig"; // Your Firebase config

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const workDataToSend = {
      ...workData,
      textPara: workData.textPara.split(","), // Convert comma-separated list to array
    };
  
    try {
      let imgUrl = null;
      let pdfUrl = null;
  
      // Upload the image to Firebase Storage
      if (imgFile) {
        const imgRef = ref(storage, `images/${imgFile.name}-${Date.now()}`);
        const imgSnapshot = await uploadBytes(imgRef, imgFile);
        imgUrl = await getDownloadURL(imgSnapshot.ref); // Get the download URL of the uploaded image
        console.log("Image URL:", imgUrl);
      }
  
      // Upload the PDF to Firebase Storage
      if (pdfFile) {
        const pdfRef = ref(storage, `pdfs/${pdfFile.name}-${Date.now()}`);
        const pdfSnapshot = await uploadBytes(pdfRef, pdfFile);
        pdfUrl = await getDownloadURL(pdfSnapshot.ref); // Get the download URL of the uploaded PDF
        console.log("PDF URL:", pdfUrl);
      }
  
      // Prepare FormData with the Firebase URLs
      const formData = new FormData();
      formData.append("text", workDataToSend.text);
      formData.append("textPara", workDataToSend.textPara);
      formData.append("detailsRoute", workDataToSend.detailsRoute);
      formData.append("size", workDataToSend.size);
  
      if (imgUrl) {
        formData.append("img", imgUrl); // Append the Firebase image URL
      }
      if (pdfUrl) {
        formData.append("pdfUrl", pdfUrl); // Append the Firebase PDF URL
      }
  
      // Log the FormData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
      // Send the data to the backend
      if (typeof addNewWorkCard === "function") {
        addNewWorkCard(formData); // Pass the FormData with Firebase URLs
      } else {
        console.error("addNewWorkCard is not a function");
      }
  
      // Navigate back to the homepage after submission
      navigate("/NguyenDoThienAn/");
    } catch (error) {
      console.error("Error uploading files to Firebase:", error);
    }
  };
  

  return (
    <Container style={{paddingTop: "50px"}}>
      <Link to="/NguyenDoThienAn" className="btnHome">
        Return to Homepage
      </Link>
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
    </Container>
  );
};
