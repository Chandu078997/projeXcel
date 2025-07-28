/*
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // <-- Add this
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            // Public Pages 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />

            // Protected Pages (require login) 
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/:domainId"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project/:projectId"
              element={
                <ProtectedRoute>
                  <ProjectDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
*/
/*
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Avoids blank page during check

  useEffect(() => {
    // Session-only login (always log out on refresh unless session exists)
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setLoading(false);
  }, []);

  if (loading) {
    // Show a loading screen instead of blank page
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  return (
    <Router>
      <div className="app-container">
        // Navbar is always visible but will show different links based on login
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <div className="content">
          <Routes>
            // Public Routes 
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />

            // Private Routes 
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects/:domainId" element={<Projects />} />
                <Route path="/project/:projectId" element={<ProjectDetails />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                // Before login, redirect `/` to `/login` 
                <Route path="/"element={<p style={{ textAlign: "center" }}>Please log in to access Home.</p>} />

                // Show message instead of blank pages for protected routes 
                <Route path="/dashboard" element={<p style={{ textAlign: "center" }}>Please log in to access Dashboard.</p>} />
                <Route path="/projects/:domainId" element={<p style={{ textAlign: "center" }}>Please log in to access Projects.</p>} />
                <Route path="/project/:projectId" element={<p style={{ textAlign: "center" }}>Please log in to view Project Details.</p>} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
*/

/*
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Avoids flicker during initial check

  useEffect(() => {
    // Restore session login state on refresh
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setLoading(false);
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  return (
    <Router>
      <div className="app-container">
       
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <div className="content">
          <Routes>
           
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />

            
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects/:domainId" element={<Projects />} />
                <Route path="/project/:projectId" element={<ProjectDetails />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
           
                <Route
                  path="/"
                  element={<p style={{ textAlign: "center" }}>Please log in to access Home.</p>}
                />
                <Route
                  path="/dashboard"
                  element={<p style={{ textAlign: "center" }}>Please log in to access Dashboard.</p>}
                />
                <Route
                  path="/projects/:domainId"
                  element={<p style={{ textAlign: "center" }}>Please log in to access Projects.</p>}
                />
                <Route
                  path="/project/:projectId"
                  element={<p style={{ textAlign: "center" }}>Please log in to view Project Details.</p>}
                />
                
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


*/

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore login state from sessionStorage
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setLoading(false);
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />

            {/* Private Routes */}
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                {/* FIXED: Pass props to Dashboard */}
                <Route
                  path="/dashboard"
                  element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="/projects/:domainId" element={<Projects />} />
                <Route path="/project/:projectId" element={<ProjectDetails />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                {/* Show message before login */}
                <Route
                  path="/"
                  element={<p style={{ textAlign: "center" }}>Please log in to access Home.</p>}
                />
                <Route
                  path="/dashboard"
                  element={<p style={{ textAlign: "center" }}>Please log in to access Dashboard.</p>}
                />
                <Route
                  path="/projects/:domainId"
                  element={<p style={{ textAlign: "center" }}>Please log in to access Projects.</p>}
                />
                <Route
                  path="/project/:projectId"
                  element={<p style={{ textAlign: "center" }}>Please log in to view Project Details.</p>}
                />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
