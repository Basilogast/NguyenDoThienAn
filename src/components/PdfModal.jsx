import React, { useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

function PdfModal({ isOpen, onRequestClose, pdfUrl, text, detailsRoute }) {
  // Initialize textArray directly from text if it's an array
  const textArray = Array.isArray(text) ? text : [];

  useEffect(() => {
    if (pdfUrl) {
      console.log("PDF URL passed to PdfModal:", pdfUrl);
    }
  }, [pdfUrl]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          position: "relative",
          width: "90%",
          maxWidth: "1400px",
          height: "80%",
          maxHeight: "700px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          margin: "auto",
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
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "16px",
          transition: "background-color 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff3b3b")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff5c5c")}
      >
        Close
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <iframe
            src={pdfUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "8px",
            }}
            title="PDF Preview"
          ></iframe>
        </div>

        <div
          style={{
            flex: 1,
            maxWidth: "400px",
            backgroundColor: "#f4f4f4",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            color: "#333",
            overflowY: "auto",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#222",
              fontSize: "2em",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Scope of Work (SOW)
          </h2>
          <ul
            style={{
              color: "#555",
              lineHeight: "1.8",
              fontSize: "16px",
              paddingLeft: "20px",
              listStyleType: "disc",
              margin: 0,
            }}
          >
            {textArray.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

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
