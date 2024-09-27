import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Cookies from "js-cookie"; // Import js-cookie

import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Client } from "./components/Client";
import { Work } from "./components/Work";
import { AddWorkCard } from "./components/AddWorkCard";
import EditWorkCard from "./components/EditWorkCard";
import { Footer } from "./components/Footer";
import SignInButton from "./components/SignInButton"; // Import the sign-in component
import { auth, signOut } from "../firebaseConfig"; // Firebase configuration

function App() {
  const [workCards, setWorkCards] = useState([]);
  const [signedInUser, setSignedInUser] = useState(null); // Track signed-in user

  // List of allowed emails
  const allowedEmails = ["duyhung08112003@gmail.com", "annguyen20112003@gmail.com"];

  // Restore session from cookies on app load
  useEffect(() => {
    const storedUser = Cookies.get("signedInUser");
    if (storedUser) {
      setSignedInUser(JSON.parse(storedUser)); // Restore user from cookie
    }
  }, []);

  // Fetch workcards data from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/workcards")
      .then((response) => response.json())
      .then((data) => {
        setWorkCards(data);
      })
      .catch((error) => console.error("Error fetching workcards:", error));
  }, []);

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
          path="/NguyenDoThienAn/"
          element={
            <div className="App">
              <NavBar />
              <Hero />
              <About />
              <Client />
              <Work workCards={workCards} signedInUser={signedInUser} />
              <Footer />
              <SignInButton
                signedInUser={signedInUser}
                setSignedInUser={setSignedInUser}
              />
            </div>
          }
        />
        {/* Add Work Route - Only allow access if signed in and email is in allowedEmails */}
        {signedInUser && allowedEmails.includes(signedInUser.email) && (
          <Route
            path="/NguyenDoThienAn/add-work"
            element={
              <div className="App">
                <AddWorkCard addNewWorkCard={addNewWorkCard} />
                <Footer />
              </div>
            }
          />
        )}
        {/* Edit Work Route */}
        {signedInUser && allowedEmails.includes(signedInUser.email) && (
          <Route
            path="/NguyenDoThienAn/edit-work/:id"
            element={
              <div className="App">
                <EditWorkCard />
                <Footer />
              </div>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
