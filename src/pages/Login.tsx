import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Already logged in? Go straight to Home.
  if (currentUser) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = login(username, password);

    if (message) {
      setError(message);
      return;
    }

    navigate("/home");
  };

  return (
    <section className="auth card">
      <h1>Welcome back</h1>
      <p className="muted auth-subtitle">
        Log in to see your applications.
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
          placeholder="Enter password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="form-error" role="alert">
          {error}
        </p>

        <button className="btn btn-block" type="submit">
          Log in
        </button>
      </form>

      <p className="muted auth-footer">
        New here? <Link to="/register">Register</Link>
      </p>
    </section>
  );
}

