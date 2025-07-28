/*import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = 1; // Replace with logged-in user later

  useEffect(() => {
    fetch(`http://localhost:8085/projectwork/api/projects/enrolled?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data); // Initialize with all projects
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = projects.filter((p) =>
      p.title.toLowerCase().includes(value) ||
      (p.description && p.description.toLowerCase().includes(value))
    );
    setFilteredProjects(filtered);
  };

  if (loading) return <p>Loading Dashboard...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Enrolled Projects</h2>
        <input
          type="text"
          placeholder="Search enrolled projects..."
          value={searchTerm}
          onChange={handleSearch}
          className="dashboard-search"
        />
      </div>

      {filteredProjects.length === 0 ? (
        <p>No matching projects found.</p>
      ) : (
        <div className="project-list">
          {filteredProjects.map((p) => (
            <div key={p.id} className="project-card">
              <Link to={`/project/${p.id}`} className="project-title">
                {p.title}
              </Link>
              <p className="project-desc">
                {p.shortDescription?.substring(0, 120) || "No description available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;


*/
/*import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = 1; // Replace with real user later

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true" ||
    sessionStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) return;

    fetch(`http://localhost:8085/projectwork/api/projects/enrolled?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <h2 style={{ textAlign: "center", marginTop: "20px" }}>Please log in first to view your enrolled projects.</h2>;
  }

  if (loading) return <p>Loading Dashboard...</p>;

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = projects.filter((p) =>
      p.title.toLowerCase().includes(value) ||
      (p.description && p.description.toLowerCase().includes(value))
    );
    setFilteredProjects(filtered);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Enrolled Projects</h2>
        <input
          type="text"
          placeholder="Search enrolled projects..."
          value={searchTerm}
          onChange={handleSearch}
          className="dashboard-search"
        />
      </div>

      {filteredProjects.length === 0 ? (
        <p>No matching projects found.</p>
      ) : (
        <div className="project-list">
          {filteredProjects.map((p) => (
            <div key={p.id} className="project-card">
              <Link to={`/project/${p.id}`} className="project-title">
                {p.title}
              </Link>
              <p className="project-desc">
                {p.shortDescription?.substring(0, 120) || "No description available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
*/

/*
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard({ isLoggedIn, setIsLoggedIn }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = 1; // Replace dynamically with actual userId after login

  // Restore login if page refreshed
  useEffect(() => {
    if (!isLoggedIn) {
      const savedLogin = sessionStorage.getItem("isLoggedIn") === "true";
      if (savedLogin) {
        setIsLoggedIn(true);
      }
    }
  }, [isLoggedIn, setIsLoggedIn]);

  // Fetch enrolled projects
  useEffect(() => {
    if (!isLoggedIn) {
      setProjects([]);
      setFilteredProjects([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8085/projectwork/api/projects/enrolled?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setFilteredProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setProjects([]);
        setFilteredProjects([]);
        setLoading(false);
      });
  }, [isLoggedIn]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = projects.filter(
      (p) =>
        p.title?.toLowerCase().includes(value) ||
        p.shortDescription?.toLowerCase().includes(value)
    );
    setFilteredProjects(filtered);
  };

  if (loading) return <p>Loading Dashboard...</p>;

  if (!isLoggedIn) {
    return (
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <p>Please log in to view your enrolled projects.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Enrolled Projects</h2>
        <input
          type="text"
          placeholder="Search enrolled projects..."
          value={searchTerm}
          onChange={handleSearch}
          className="dashboard-search"
        />
      </div>

      {filteredProjects.length === 0 ? (
        <p>No enrolled projects found.</p>
      ) : (
        <div className="project-list">
          {filteredProjects.map((p) => (
            <div key={p.id} className="project-card">
              <Link to={`/project/${p.id}`} className="project-title">
                {p.title}
              </Link>
              <p className="project-desc">
                {p.shortDescription?.substring(0, 120) || "No description available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;


*/
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard({ isLoggedIn, setIsLoggedIn }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Get userId from sessionStorage (set in Login.jsx)
  const userId = sessionStorage.getItem("userId");

  // Restore login state if page refreshed
  useEffect(() => {
    if (!isLoggedIn) {
      const savedLogin = sessionStorage.getItem("isLoggedIn") === "true";
      if (savedLogin) {
        setIsLoggedIn(true);
      }
    }
  }, [isLoggedIn, setIsLoggedIn]);

  // Fetch enrolled projects for the logged-in user
  useEffect(() => {
    if (!isLoggedIn || !userId) {
      setProjects([]);
      setFilteredProjects([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8085/projectwork/api/projects/enrolled?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setFilteredProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching enrolled projects:", err);
        setProjects([]);
        setFilteredProjects([]);
        setLoading(false);
      });
  }, [isLoggedIn, userId]);

  // Search filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = projects.filter(
      (p) =>
        p.title?.toLowerCase().includes(value) ||
        p.shortDescription?.toLowerCase().includes(value)
    );
    setFilteredProjects(filtered);
  };

  if (loading) return <p>Loading Dashboard...</p>;

  if (!isLoggedIn) {
    return (
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <p>Please log in to view your enrolled projects.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Enrolled Projects</h2>
        <input
          type="text"
          placeholder="Search enrolled projects..."
          value={searchTerm}
          onChange={handleSearch}
          className="dashboard-search"
        />
      </div>

      {filteredProjects.length === 0 ? (
        <p>No enrolled projects found.</p>
      ) : (
        <div className="project-list">
          {filteredProjects.map((p) => (
            <div key={p.id} className="project-card">
              <Link to={`/project/${p.id}`} className="project-title">
                {p.title}
              </Link>
              <p className="project-desc">
                {p.shortDescription?.substring(0, 120) || "No description available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
