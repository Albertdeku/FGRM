import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
// import Navbar from "./Navbar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FAQs from "./pages/FAQs";
import About from "./pages/About";
import CreateCase from "./pages/CreateCase";
import TrackCase from "./pages/TrackCase";
import Login from "./pages/Login";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-case" element={<CreateCase />} />
        <Route path="/track-case" element={<TrackCase />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
