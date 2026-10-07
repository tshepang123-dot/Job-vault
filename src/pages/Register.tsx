import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { currentUser, register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Already logged in? No need to register again.
  if (currentUser) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = register(username, password);

    if (message) {
      setError(message);
      return;
    }

    navigate("/home");
  };

  return (
    <section className="auth card">
      <h1>Create your account</h1>
      <p className="muted auth-subtitle">
        Pick a username and password to start tracking.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Username"
          placeholder="Enter username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="form-error" role="alert">
          {error}
        </p>

        <button className="btn btn-block" type="submit">
          Register
        </button>
      </form>

      <p className="muted auth-footer">
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </section>
  );
}
