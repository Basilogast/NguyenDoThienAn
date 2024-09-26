import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function EditWorkCard() {
  const { id } = useParams(); // Get the workcard ID from the URL
  const navigate = useNavigate();

  const [workData, setWorkData] = useState({
    text: "",
    textPara: "",
    detailsRoute: "",
    size: "small", // Default size
  });
  const [imgFile, setImgFile] = useState(null); // State to handle image file
  const [pdfFile, setPdfFile] = useState(null); // State to handle PDF file
  const [imgFileName, setImgFileName] = useState(""); // For storing the current image file name
  const [pdfFileName, setPdfFileName] = useState(""); // For storing the current PDF file name

  useEffect(() => {
    const fetchWorkCard = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/workcards/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setWorkData({
            text: data.text,
            textPara: data.textPara.join(", "),
            detailsRoute: data.detailsRoute,
            size: data.size,
          });
          setImgFileName(data.img.split("/").pop());
          setPdfFileName(data.pdfUrl.split("/").pop());

          // Log file names to ensure they are being set
          console.log("Image File Name:", data.img.split("/").pop());
          console.log("PDF File Name:", data.pdfUrl.split("/").pop());
        } else {
          console.error("Failed to fetch workcard data");
        }
      } catch (error) {
        console.error("Error fetching workcard:", error);
      }
    };

    fetchWorkCard();
  }, [id]);

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
      setImgFile(files[0]); // Set new image file
      setImgFileName(files[0].name); // Display the file name in the input
    } else if (name === "pdfUrl") {
      setPdfFile(files[0]); // Set new PDF file
      setPdfFileName(files[0].name); // Display the file name in the input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", workData.text);
    formData.append("textPara", workData.textPara.split(","));
    formData.append("detailsRoute", workData.detailsRoute);
    formData.append("size", workData.size);

    if (imgFile) {
      formData.append("img", imgFile);
    }
    if (pdfFile) {
      formData.append("pdfUrl", pdfFile);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/workcards/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Workcard updated successfully");
        navigate("/NguyenDoThienAn/"); // Redirect to the main page
      } else {
        alert("Failed to update workcard");
      }
    } catch (error) {
      console.error("Error updating workcard:", error);
    }
  };

  return (
    <Container style={{ paddingTop: "50px" }}>
      <Link to="/NguyenDoThienAn" className="btnHome">
        Return to Homepage
      </Link>
      <Container className="add-workcard-container">
        <h2 className="form-title">Edit Work Card</h2>
        <Form onSubmit={handleSubmit} className="custom-form">
          <Form.Group controlId="formWorkTitle" className="form-group">
            <Form.Label className="form-label">Work Title</Form.Label>
            <Form.Control
              type="text"
              name="text"
              value={workData.text}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formWorkTextPara" className="form-group">
            <Form.Label className="form-label">
              Description (Comma separated)
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="textPara"
              value={workData.textPara}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formDetailsRoute" className="form-group">
            <Form.Label className="form-label">Details Route</Form.Label>
            <Form.Control
              type="text"
              name="detailsRoute"
              value={workData.detailsRoute}
              onChange={handleInputChange}
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formWorkSize" className="form-group">
            <Form.Label className="form-label">Card Size</Form.Label>
            <Form.Control
              as="select"
              name="size"
              value={workData.size}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formWorkImage" className="form-group">
            <Form.Label className="form-label">Current Image</Form.Label>
            {/* Display the current image file name */}
            {imgFileName ? (
              <p>Current Image: {imgFileName}</p>
            ) : (
              <p>No image uploaded</p>
            )}
            <Form.Control
              type="file"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formWorkPdf" className="form-group">
            <Form.Label className="form-label">Current PDF</Form.Label>
            {/* Display the current PDF file name */}
            {pdfFileName ? (
              <p>Current PDF: {pdfFileName}</p>
            ) : (
              <p>No PDF uploaded</p>
            )}
            <Form.Control
              type="file"
              name="pdfUrl"
              accept=".pdf"
              onChange={handleFileChange}
              className="form-control"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-btn">
            Update WorkCard
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default EditWorkCard;
