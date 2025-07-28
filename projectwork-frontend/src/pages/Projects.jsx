/*
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Projects.css";

function Projects() {
  const { domainId } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8085/projectwork/api/projects/domain/${domainId}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [domainId]);

  if (!localStorage.getItem("loggedIn")) {
    return <h2>Please login to view projects.</h2>;
  }

  return (
    <div className="page-container">
      <h2>Projects in Domain {domainId}</h2>
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
      <p>
  <b>Short Description:</b>{project.shortDescription}
</p>
    <p><b>Skills:</b> {project.skillsRequired}</p>
            <p><b>Deadline:</b> {project.submissionDeadline}</p>
            <Link to={`/project/${project.id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Projects;
*/import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Projects.css";

function Projects() {
  const { domainId } = useParams();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8085/projectwork/api/projects/domain/${domainId}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [domainId]);

  if (!localStorage.getItem("loggedIn")) {
    return <h2>Please login to view projects.</h2>;
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.shortDescription &&
        project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="page-container1">
      {/* Title + Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 10 }}>Projects in Domain {domainId}</h2>
        <input
          type="text"
          placeholder="Search projects..."
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

      {/* Project Cards */}
      {loading ? (
        <p>Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>
              <b>Short Description:</b> {project.shortDescription}
            </p>
            <p>
              <b>Skills:</b> {project.skillsRequired}
            </p>
            <p>
              <b>Start Date:</b> {project.startDate}
            </p>
            <p>
              <b>Deadline:</b> {project.submissionDeadline}
            </p>
            <Link to={`/project/${project.id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Projects;
