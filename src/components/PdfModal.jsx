import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root"); // Ensure accessibility by setting the root element for modals

function PdfModal({ isOpen, onRequestClose, pdfUrl, text, detailsRoute }) {
  // Convert text to an array if it's not already
  const textArray = Array.isArray(text) ? text : text ? [text] : [];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent dark overlay
          zIndex: 9999,
          display: "flex", // Use flexbox for centering
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          position: "relative", // No absolute positioning
          width: "90%", // Use a percentage to better fit the viewport
          maxWidth: "1400px", // Fixed maximum width
          height: "80%", // Use a percentage to fit the viewport
          maxHeight: "700px", // Fixed maximum height to avoid scaling
          backgroundColor: "#fff", // White background for content
          borderRadius: "12px", // Rounded corners
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for clarity
          overflow: "hidden", // Remove overflow to prevent scrollbars
          margin: "auto", // Center horizontally
        },
      }}
    >
      <button
        onClick={onRequestClose}
        style={{
          backgroundColor: "#ff5c5c",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "4px",
          cursor: "pointer",
          position: "absolute", // Absolute positioning to place it at the top-right
          top: "20px", // Distance from the top
          right: "20px", // Distance from the right
          fontSize: "16px",
          transition: "background-color 0.3s ease-in-out", // Smooth background color transition
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#ff3b3b")
        } // Darker red on hover
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#ff5c5c")
        } // Original red
      >
        Close
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%", // Full height for both the iframe and text area
          gap: "20px", // Space between the iframe and text area
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <iframe
            src={pdfUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "8px", // Rounded corners for the iframe
            }}
            title="PDF Preview"
          ></iframe>
        </div>

        <div
          style={{
            flex: 1,
            maxWidth: "400px",
            backgroundColor: "#f4f4f4", // Light background for the text area
            borderRadius: "8px", // Rounded corners
            padding: "20px", // Add padding inside the text area
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for clarity
            color: "#333", // Dark text color
            overflowY: "auto", // Ensure scroll if text overflows
            fontFamily: "Arial, sans-serif", // Clean font for legibility
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#222", // Darker color for the heading
              fontSize: "2em", // Larger font size for the heading
              fontWeight: "bold",
              marginBottom: "20px", // Space below the heading
            }}
          >
            Scope of Work (SOW)
          </h2>
          <ul
            style={{
              color: "#555",
              lineHeight: "1.8",
              fontSize: "16px",
              paddingLeft: "20px", // Space for bullet points
              listStyleType: "disc", // Ensure bullet points are displayed
              margin: 0, // Reset margin to ensure bullet points are visible
            }}
          >
            {textArray.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {/* Conditionally render the "View in Detail" link if detailsRoute is not empty or undefined */}
          {detailsRoute && detailsRoute.trim() !== "" && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Link
                to={detailsRoute}
                style={{
                  color: "#007BFF",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                View in Detail
              </Link>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default PdfModal;
