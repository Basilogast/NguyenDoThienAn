import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig"; // Your Firebase config

export const AddWorkCard = ({ addNewWorkCard, targetTable }) => {
  const [workData, setWorkData] = useState({
    text: "",
    textPara: "",
    detailsRoute: "",
    size: "small", // Default size
  });

  const [imgFile, setImgFile] = useState(null); // Separate state for image file
  const [pdfFile, setPdfFile] = useState(null); // Separate state for PDF file
  const [loading, setLoading] = useState(false);

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

    // Start loading state
    setLoading(true); // Set the loading state to true when the submission starts

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

      // Prepare FormData with the Firebase URLs and target table
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

      formData.append("targetTable", targetTable); // Pass the target table to the backend

      // Send the data to the backend
      if (typeof addNewWorkCard === "function") {
        await addNewWorkCard(formData); // Wait for the work card to be added

        // Show success alert
        alert("Workcard added successfully!");

        // Stop loading state
        setLoading(false);

        // Navigate back to the homepage after submission
        navigate("/NguyenDoThienAn/");
      } else {
        console.error("addNewWorkCard is not a function");
      }
    } catch (error) {
      console.error("Error uploading files to Firebase:", error);
      alert("An error occurred while uploading files. Please try again.");
      // Stop loading state in case of an error
      setLoading(false);
    }
  };

  return (
    <Container style={{ paddingTop: "50px" }}>
      <Link to="/NguyenDoThienAn" className="btnHome">
        Return to Homepage
      </Link>
      <Container className="add-workcard-container">
        <h2 className="form-title">Add a New {targetTable}</h2>
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

          <Button
            variant="primary"
            type="submit"
            className="submit-btn"
            disabled={loading} // Disable the button when loading is true
            style={{
              cursor: loading ? "progress" : "pointer", // Show loading cursor when submitting
              opacity: loading ? 0.7 : 1, // Dim the button when loading
              transition: "opacity 0.3s ease", // Smooth transition effect
            }}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Adding {targetTable}...
              </>
            ) : (
              `Add ${targetTable}`
            )}
          </Button>
        </Form>
      </Container>
    </Container>
  );
};
