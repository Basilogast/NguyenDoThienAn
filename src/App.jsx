import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Client } from "./components/Client";
import { Work } from "./components/Work";
import { AddWorkCard } from "./components/AddWorkCard";
import { Footer } from "./components/Footer";

function App() {
  const [workCards, setWorkCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/workcards")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the entire fetched data
        setWorkCards(data);
      })
      .catch((error) => console.error("Error fetching workcards:", error));
  }, []);
  

  // Function to add a new workcard to the state and backend
  const addNewWorkCard = (formData) => {
    console.log("Posting new workcard to backend:", formData);

    fetch("http://localhost:5000/api/workcards", {
      method: "POST",
      body: formData, // Use FormData instead of JSON
    })
      .then((response) => {
        console.log("Server response:", response);

        // Check if the content type is JSON before parsing
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          throw new Error("Server did not return JSON.");
        }
      })
      .then((addedCard) => {
        // Add the new workcard to the state
        setWorkCards([...workCards, addedCard]);
        console.log("New workcard added:", addedCard);
      })
      .catch((error) => {
        console.error("Error adding workcard:", error);
      });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/NguyenDoThienAn"
          element={
            <div className="App">
              <NavBar />
              <Hero />
              <About />
              <Client />
              <Work workCards={workCards} />
              <Footer />
            </div>
          }
        />
        <Route
          path="/NguyenDoThienAn/add-work"
          element={
            <div className="App">
              <AddWorkCard addNewWorkCard={addNewWorkCard} />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
