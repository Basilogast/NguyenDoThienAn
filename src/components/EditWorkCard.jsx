import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"; // Firebase functions
import { storage } from "../../firebaseConfig"; // Your Firebase config

function EditWorkCard() {
  const { id, table } = useParams(); // Get both the workcard ID and table from the URL
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
  const [imgFilePath, setImgFilePath] = useState(""); // For storing the current Firebase image path
  const [pdfFileName, setPdfFileName] = useState(""); // For storing the current PDF file name

  useEffect(() => {
    const fetchWorkCard = async () => {
      try {
        const response = await fetch(
          `https://thienanbackend-production.up.railway.app/api/${table}/${id}` // Use table in the API request
        );
        if (response.ok) {
          const data = await response.json();
          setWorkData({
            text: data.text,
            textPara: data.textPara.join(", "), // Convert array to comma-separated string
            detailsRoute: data.detailsRoute,
            size: data.size,
          });
          setImgFileName(data.img ? data.img.split("/").pop() : "");
          setImgFilePath(data.img || ""); // Store the Firebase path for deletion
          setPdfFileName(data.pdfUrl ? data.pdfUrl.split("/").pop() : "");
        } else {
          console.error("Failed to fetch workcard data");
        }
      } catch (error) {
        console.error("Error fetching workcard:", error);
      }
    };

    fetchWorkCard();
  }, [id, table]);

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
    formData.append("textPara", workData.textPara.split(",")); // Convert to array
    formData.append("detailsRoute", workData.detailsRoute);
    formData.append("size", workData.size);

    let newImgUrl = imgFilePath; // Retain the old image path by default

    try {
      // If a new image is uploaded, delete the old image and upload the new one to Firebase
      if (imgFile) {
        // Delete the old image from Firebase
        if (imgFilePath) {
          const oldImgRef = ref(storage, imgFilePath);
          await deleteObject(oldImgRef);
          console.log("Old image deleted from Firebase:", imgFilePath);
        }

        // Upload the new image to Firebase
        const newImgRef = ref(storage, `images/${imgFile.name}-${Date.now()}`);
        const imgSnapshot = await uploadBytes(newImgRef, imgFile);
        newImgUrl = await getDownloadURL(imgSnapshot.ref); // Get the download URL of the uploaded image
        console.log("New Image URL:", newImgUrl);
        formData.append("img", newImgUrl); // Update the form data with the new image URL
      }

      // If a new PDF is uploaded, append it to the formData
      if (pdfFile) {
        const pdfRef = ref(storage, `pdfs/${pdfFile.name}-${Date.now()}`);
        const pdfSnapshot = await uploadBytes(pdfRef, pdfFile);
        const newPdfUrl = await getDownloadURL(pdfSnapshot.ref); // Get the download URL of the uploaded PDF
        formData.append("pdfUrl", newPdfUrl);
      }

      const response = await fetch(
        `https://thienanbackend-production.up.railway.app/api/${table}/${id}`, // Use table in the API request
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Workcard updated successfully");
        navigate("/NguyenDoThienAn/"); // Redirect to the main page
        window.location.reload();
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
