/*

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      return; // Only load if logged in
    }
    fetch("http://localhost:8085/projectwork/domains")
      .then((res) => res.json())
      .then((data) => {
        setDomains(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!localStorage.getItem("loggedIn")) {
    return <h2>Please login to see available domains.</h2>;
  }

  return (
    <div className="page-container">
      <h2>Available Domains</h2>
      {loading ? <p>Loading domains...</p> : (
        <ul>
          {domains.map((domain) => (
            <li key={domain.id}>
              <Link to={`/projects/${domain.id}`}>{domain.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;

*/
/*
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [domains, setDomains] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      return;
    }
    fetch("http://localhost:8085/projectwork/domains")
      .then((res) => res.json())
      .then((data) => {
        setDomains(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!localStorage.getItem("loggedIn")) {
    return <h2>Please login to see available domains.</h2>;
  }

  const filteredDomains = domains.filter((domain) =>
    domain.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">

      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                      <h2>Available Domains  

                      </h2>
        <input
          type="text"
          placeholder="Search domains..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 20px",
            width: "220px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

      </div>
      {loading ? (
        <p>Loading domains...</p>
      ) : (
        <ul>
          {filteredDomains.map((domain) => (
            <li key={domain.id}>
              <Link to={`/projects/${domain.id}`}>{domain.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;

*/import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home({ isLoggedIn }) {
  const [domains, setDomains] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      setDomains([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("http://localhost:8085/projectwork/domains")
      .then((res) => res.json())
      .then((data) => {
        setDomains(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="page-container">
        <h2>Welcome to ProjectWork</h2>
        <p style={{ color: "red", marginTop: "20px" }}>
          You are not logged in. Please log in to explore available domains.
        </p>
      </div>
    );
  }

  return (
    <div className="page-container1">
      <h2>Welcome to ProjectWork</h2>
      <p>
        Browse and explore available project domains to get started.
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          marginTop: "20px",
        }}
      >
        <h3>Available Domains</h3>
        <input
          type="text"
          placeholder="Search domains..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 20px",
            marginLeft: "15px",
            width: "220px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
      </div>

      {loading ? (
        <p>Loading domains...</p>
      ) : (
        <ul>
          {domains
            .filter((domain) =>
              domain.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((domain) => (
              <li key={domain.id}>
                <Link to={`/projects/${domain.id}`}>{domain.name}</Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
