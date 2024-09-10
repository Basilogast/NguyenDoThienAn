import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root"); // Ensure accessibility by setting the root element for modals

function PdfModal({ isOpen, onRequestClose, pdfUrl, text, detailsRoute }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent dark overlay
          zIndex: 9999,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "90%",
          backgroundColor: "#fff", // White background for content
          borderRadius: "12px", // Rounded corners
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
          transition: "opacity 0.3s ease-in-out", // Smooth transition
          position: "relative", // Position relative to use for absolute positioning of button
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
          height: "calc(100% - 60px)", // Adjust height to fit within content area, excluding the button
          marginTop: "60px", // Adjust margin to make space for the button
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
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            color: "#333", // Dark text color
            overflowY: "auto", // Ensure scroll if text overflows
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
              fontFamily: "Arial, sans-serif", // Set a clean font family
              paddingLeft: "20px", // Space for bullet points
              listStyleType: "disc", // Ensure bullet points are displayed
              margin: 0, // Reset margin to ensure bullet points are visible
            }}
          >
            {text && text.map((item, index) => <li key={index}>{item}</li>)}
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
