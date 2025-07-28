/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserWithForm } from "../api/auth";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For toggling password
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await registerUserWithForm(form);
      setMessage(res);

      // Clear the fields
      setForm({ name: "", email: "", password: "" });

      // Redirect to Login on success
      if (res.includes("successfully")) {
        setTimeout(() => {
          navigate("/login");
        }, 1500); // Wait so the user sees the message
      }
    } catch (err) {
      setMessage("Registration failed: " + err.message);

      // Clear fields (optional)
      setForm({ name: "", email: "", password: "" });
    }
  };

  return (
    <div className="page-container">
      <h2>Register</h2>
      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <div className="password-container">
        <input
          name="password"
          type={showPassword ? "text" : "password"} // Toggle visibility
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="button"
          className="eye-button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
     <button onClick={handleRegister}>Register</button>
{message && (
  <p style={{ color: message.toLowerCase().includes("success") ? "limegreen" : "red" }}>
    {message}
  </p>
)}

    </div>
  );
}

export default Register;
*/import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && !value.trim()) {
      error = "Name is required";
    }
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = "Email is required";
      else if (!emailRegex.test(value)) error = "Invalid email format";
    }
    if (name === "password") {
      if (!value.trim()) error = "Password is required";
      else if (value.length < 6) error = "Password must be at least 6 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const handleRegister = async () => {
    try {
      const res = await registerUser(form); // Fixed: send flat object
      setMessage(res);

      // Redirect if registration is successful
      if (res.toLowerCase().includes("success")) {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setMessage("Registration failed: " + err.message);
    }
  };

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    form.password.trim() &&
    !errors.name &&
    !errors.email &&
    !errors.password;

  return (
    <div className="page-container">
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        onBlur={(e) => validateField("name", e.target.value)}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        onBlur={(e) => validateField("email", e.target.value)}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <div className="password-container">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          onBlur={(e) => validateField("password", e.target.value)}
        />
        <span
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
          style={{ cursor: "pointer", marginLeft: "8px" }}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>
      {errors.password && <p className="error">{errors.password}</p>}

      <button
        onClick={handleRegister}
        disabled={!isFormValid}
        className={!isFormValid ? "disabled-btn" : ""}
      >
        Register
      </button>

      {message && (
        <p style={{ color: message.toLowerCase().includes("success") ? "limegreen" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Register;
