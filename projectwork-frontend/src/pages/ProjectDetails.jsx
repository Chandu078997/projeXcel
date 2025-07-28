/*
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submissionLink, setSubmissionLink] = useState("");
  const [message, setMessage] = useState("");
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [submission, setSubmission] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const user = { id: 1, name: "John Doe" }; // Replace with actual login later

  // Check if user is enrolled for this project
  const checkEnrollment = () => {
    fetch(`http://localhost:8085/projectwork/api/projects/enrolled?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const enrolled = data.some((p) => p.id === parseInt(projectId)); // p.id is the Project ID now
        setIsEnrolled(enrolled);
      });
  };

  // Fetch submission details if any
  const fetchSubmission = () => {
    fetch(`http://localhost:8085/projectwork/api/projects/submissions/${projectId}?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setSubmission(data[0]);
          setAlreadySubmitted(true);
        } else {
          setSubmission(null);
          setAlreadySubmitted(false);
        }
      });
  };

  // Load project details + enrollment + submission
  useEffect(() => {
    fetch(`http://localhost:8085/projectwork/api/projects/details/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);

        if (data.submissionDeadline) {
          const deadlineDate = new Date(data.submissionDeadline);
          const now = new Date();
          const diffTime = deadlineDate.getTime() - now.getTime();
          const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysRemaining(daysLeft);
          setIsDeadlinePassed(daysLeft < 0);
        }
      });

    checkEnrollment();
    fetchSubmission();
  }, [projectId]);

  // Handle enrollment
  const handleEnroll = () => {
    fetch(`http://localhost:8085/projectwork/api/projects/enroll/${projectId}?userId=${user.id}`, {
      method: "POST",
    })
      .then((res) => res.text())
      .then((msg) => {
        setMessage(msg);
        setIsEnrolled(true); // instantly disable button
      });
  };

  // Handle submission
  const handleSubmit = () => {
    if (!isEnrolled) {
      setMessage("You must enroll before submitting.");
      return;
    }
    if (isDeadlinePassed) {
      setMessage("Submission is closed for this project.");
      return;
    }
    if (alreadySubmitted) {
      setMessage("You have already submitted.");
      return;
    }

    fetch(
      `http://localhost:8085/projectwork/api/projects/submit/${projectId}?userId=${user.id}&submissionLink=${encodeURIComponent(submissionLink)}`,
      { method: "POST" }
    )
      .then((res) => res.text())
      .then((msg) => {
        setMessage(msg);
        fetchSubmission();
      });
  };

  if (loading) return <p>Loading project details...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div className="page-container">
      <h2>{project.title}</h2>
      <p><b>Description:</b> {project.description}</p>
      <p><b>Skills Required:</b> {project.skillsRequired}</p>
      <p><b>Deadline:</b> {project.submissionDeadline}</p>
      <p>{isDeadlinePassed ? "Deadline passed" : `${daysRemaining} days remaining`}</p>


      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={!isEnrolled ? handleEnroll : undefined}
          disabled={isEnrolled}
          style={{
            backgroundColor: isEnrolled ? "gray" : "#1976d2",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: isEnrolled ? "not-allowed" : "pointer",
          }}
        >
          {isEnrolled ? "Enrolled" : "Enroll in this Project"}
        </button>
      </div>

      
      <div className="submission-box">
        <h3>Submit Your Work</h3>
        <input
          type="text"
          placeholder="Enter submission link"
          value={submissionLink}
          onChange={(e) => setSubmissionLink(e.target.value)}
          disabled={!isEnrolled || isDeadlinePassed || alreadySubmitted}
        />
        <button
          onClick={handleSubmit}
          disabled={!isEnrolled || isDeadlinePassed || alreadySubmitted}
        >
          Submit
        </button>
        {message && <p>{message}</p>}
      </div>

   
      {submission && (
        <div className="submission-status" style={{ marginTop: "20px" }}>
          <h3>Your Submission</h3>
          <p>
            <b>Link:</b>{" "}
            <a href={submission.submissionLink} target="_blank" rel="noopener noreferrer">
              {submission.submissionLink}
            </a>
          </p>
          <p><b>Status:</b> {submission.status}</p>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
*/
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submissionLink, setSubmissionLink] = useState("");
  const [message, setMessage] = useState("");
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [submission, setSubmission] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [emailSent, setEmailSent] = useState(false);

  // Get actual logged-in user from sessionStorage
  const userId = sessionStorage.getItem("userId");
  const userEmail = sessionStorage.getItem("userEmail");

  const checkEnrollment = () => {
    if (!userId) return;

    fetch(`http://localhost:8085/projectwork/api/projects/enrolled?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const enrolled = data.some((p) => p.id === parseInt(projectId));
        setIsEnrolled(enrolled);
      });
  };

  const fetchSubmission = () => {
    if (!userId) return;

    fetch(`http://localhost:8085/projectwork/api/projects/submissions/${projectId}?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setSubmission(data[0]);
          setAlreadySubmitted(true);
        } else {
          setSubmission(null);
          setAlreadySubmitted(false);
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:8085/projectwork/api/projects/details/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);

        if (data.submissionDeadline && data.startDate) {
          const startDate = new Date(data.startDate);
          const deadlineDate = new Date(data.submissionDeadline);
          const now = new Date();

          const totalDuration = deadlineDate.getTime() - startDate.getTime();
          const timeRemaining = deadlineDate.getTime() - now.getTime();

          const daysLeft = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
          setDaysRemaining(daysLeft);
          setIsDeadlinePassed(daysLeft < 0);

          const elapsed = Math.max(0, now.getTime() - startDate.getTime());
          const progressPercent = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
          setProgress(100 - progressPercent);
        }
      });

    checkEnrollment();
    fetchSubmission();
  }, [projectId, userId]);

  const handleEnroll = () => {
    if (!userId) {
      setMessage("You must log in to enroll.");
      return;
    }

    fetch(`http://localhost:8085/projectwork/api/projects/enroll/${projectId}?userId=${userId}`, {
      method: "POST",
    })
      .then((res) => res.text())
      .then((msg) => {
        setMessage(msg);
        setIsEnrolled(true);
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 4000);
      });
  };

  const handleSubmit = () => {
    if (!userId) {
      setMessage("You must log in to submit.");
      return;
    }
    if (!isEnrolled) {
      setMessage("You must enroll before submitting.");
      return;
    }
    if (isDeadlinePassed) {
      setMessage("Submission is closed for this project.");
      return;
    }
    if (alreadySubmitted) {
      setMessage("You have already submitted.");
      return;
    }

    fetch(
      `http://localhost:8085/projectwork/api/projects/submit/${projectId}?userId=${userId}&submissionLink=${encodeURIComponent(submissionLink)}`,
      { method: "POST" }
    )
      .then((res) => res.text())
      .then((msg) => {
        setMessage(msg);
        fetchSubmission();
      });
  };

  if (loading) return <p>Loading project details...</p>;
  if (!project) return <p>Project not found</p>;

  let statusBadge = "";
  let badgeColor = "";
  if (alreadySubmitted) {
    statusBadge = "Submitted";
    badgeColor = "green";
  } else if (isDeadlinePassed) {
    statusBadge = "Missed Deadline";
    badgeColor = "red";
  } else if (isEnrolled) {
    statusBadge = "Pending";
    badgeColor = "orange";
  }

  let progressColor = "#4caf50";
  if (progress < 50 && progress >= 20) {
    progressColor = "#ff9800";
  } else if (progress < 20) {
    progressColor = "#f44336";
  }

  return (
    <div className="page-container1">
      <h2>{project.title}</h2>

      {emailSent && (
        <div style={{
          backgroundColor: "#4caf50",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "15px",
          textAlign: "center",
          fontWeight: "bold"
        }}>
          A confirmation email has been sent to your registered email ({userEmail}).
        </div>
      )}

      {/* Project Info */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <p><b>Description:</b> {project.description}</p>
        <p><b>Skills Required:</b> {project.skillsRequired}</p>
        <p><b>Start Date:</b> {project.startDate}</p>
        <p><b>Deadline:</b> {project.submissionDeadline}</p>

        {project.whatsappGroupLink && (
  <p>
    <b>Join WhatsApp Group:</b>{" "}
    {isDeadlinePassed ? (
      <span
        style={{
          color: "gray",
          textDecoration: "line-through",
          cursor: "not-allowed",
          opacity: 0.6,
        }}
      >
        Link disabled (Deadline passed)
      </span>
    ) : (
      <a
        href={project.whatsappGroupLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1976d2", textDecoration: "underline" }}
      >
        Click here to join
      </a>
    )}
  </p>
    )}



 <p style={{ marginTop: "100px" }}>
          {isDeadlinePassed ? "Deadline passed" : `${daysRemaining} days remaining`}
        </p>

        {!isDeadlinePassed && (
          <>
            <p style={{ fontWeight: "bold", margin: "5px 0" }}>{progress}% Remaining</p>
            <div style={{ marginBottom: "20px" }}>
              <div style={{
                background: "#ddd",
                height: "25px",
                borderRadius: "50px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "inset 0 0 5px rgba(0,0,0,0.3)",
              }}>
                <div style={{
                  width: `${progress}%`,
                  background: progressColor,
                  height: "100%",
                  borderRadius: "50px 0 0 50px",
                  transition: "width 0.5s ease-in-out, background 0.5s ease-in-out",
                }}></div>
              </div>
            </div>
          </>
        )}
      </div>

      {statusBadge && (
        <div style={{ marginBottom: "15px" }}>
          <span style={{
            display: "inline-block",
            padding: "5px 15px",
            backgroundColor: badgeColor,
            color: "white",
            borderRadius: "5px",
            fontWeight: "bold",
          }}>
            {statusBadge}
          </span>
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={!isEnrolled && !isDeadlinePassed ? handleEnroll : undefined}
          disabled={isEnrolled || isDeadlinePassed}
          style={{
            backgroundColor: isDeadlinePassed
              ? "red"
              : isEnrolled
              ? "gray"
              : "#1976d2",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: isEnrolled || isDeadlinePassed ? "not-allowed" : "pointer",
          }}
        >
          {isDeadlinePassed
            ? "Deadline Passed"
            : isEnrolled
            ? "Enrolled"
            : "Enroll in this Project"}
        </button>
      </div>

      <div className="submission-box">
        <h3 style={{ textAlign: "center"}}>Submit Your Work</h3>
        <input
          type="text"
          placeholder="Enter submission link"
          value={submissionLink}
          onChange={(e) => setSubmissionLink(e.target.value)}
          disabled={!isEnrolled || isDeadlinePassed || alreadySubmitted}
        />
        <button
          onClick={handleSubmit}
          disabled={!isEnrolled || isDeadlinePassed || alreadySubmitted}
        >
          Submit
        </button>
        {message && <p>{message}</p>}
      </div>

      {submission && (
        <div className="submission-status" style={{ marginTop: "20px" }}>
          <h3>Your Submission</h3>
          <p>
            <b>Link:</b>{" "}
            <a href={submission.submissionLink} target="_blank" rel="noopener noreferrer">
              {submission.submissionLink}
            </a>
          </p>
          <p><b>Status:</b> {submission.status}</p>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
