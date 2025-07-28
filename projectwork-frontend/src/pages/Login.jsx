/*import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);

      // Mark user as logged in
      localStorage.setItem("loggedIn", "true");

      setMessage(res);

      // Clear the form fields
      setEmail("");
      setPassword("");

      // Redirect to Home
      navigate("/");
    } catch (err) {
      setMessage("Login failed: " + err.message);

      // Clear fields even if login fails
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;


*/

/*
import { useState, useEffect } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setForm({ email: "", password: "" });
  }, [setIsLoggedIn]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password } = form;

    setForm({ email: "", password: "" });
    setMessage("Logging in...");

    try {
      const res = await loginUser(email, password);
      setMessage(res);

      if (res.toLowerCase().includes("success")) {
        sessionStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        navigate("/"); // Redirect to Home (domains will load there)
      }
    } catch (err) {
      setMessage("Login failed: " + err.message);
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Login</button>
      {message && (
        <p style={{ color: message.toLowerCase().includes("success") ? "limegreen" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;
*/
import { useState, useEffect } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Reset login state when the page loads
  useEffect(() => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setForm({ email: "", password: "" });
  }, [setIsLoggedIn]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password } = form;

    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    setMessage("Logging in...");

    try {
      // Expecting loginUser to return the full user object now (id, email, etc.)
      const user = await loginUser(email, password);

      if (user && user.id) {
        // Save login session
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userId", user.id);     // Store userId for Dashboard
        sessionStorage.setItem("userEmail", user.email);

        setIsLoggedIn(true);
        setMessage("Login successful!");
        navigate("/dashboard"); // Redirect directly to Dashboard
      } else {
        setMessage("Login failed. Invalid response.");
      }
    } catch (err) {
      setMessage("Login failed: " + err.message);
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Login</button>
      {message && (
        <p style={{ color: message.toLowerCase().includes("success") ? "limegreen" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;
