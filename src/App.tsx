import "./App.css";
import Login from "./pages/Login";
// import Navbar from "./components/Navbar";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./index.css";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <div id="home" className="h-screen flex items-center justify-center">
        Home Section
      </div>
      <div
        id="faqs"
        className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900"
      >
        FAQs
      </div>
      <div id="about" className="h-screen flex items-center justify-center">
        About
      </div>
      <div
        id="create-case"
        className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900"
      >
        Create Case
      </div>
      <div
        id="track-case"
        className="h-screen flex items-center justify-center"
      >
        Track Case
      </div>
      <div
        id="login"
        className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900"
      >
        Login
      </div>
    </>
  );
};

export default App;
