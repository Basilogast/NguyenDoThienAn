import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Client } from "./components/Client";
import { Work } from "./components/Work";
import {Footer} from "./components/Footer";

import {HP} from "./components/workpage/HP"
import {OTEKER} from "./components/workpage/OTEKER"
import {HONGKONG} from "./components/workpage/HONGKONG"

function App() {
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
              <Work />
              <Footer/>
            </div>
          }
        />
        <Route
          path="/NguyenDoThienAn/HanhPhucInternational"
          element={
            <div className="App">
              <HP/>
              <Footer/>
            </div>
          }
        />
        <Route
          path="/NguyenDoThienAn/DrOTEKER"
          element={
            <div className="App">
              <OTEKER/>
              <Footer/>
            </div>
          }
        />
        <Route
          path="/NguyenDoThienAn/HONGKONGMooncake"
          element={
            <div className="App">
              <HONGKONG/>
              <Footer/>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
