import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NotFound() {
  const { currentUser } = useAuth();

  return (
    <section className="not-found">
      <div className="not-found-code">404</div>
      <h1>We can't find that page</h1>
      <p className="muted">The link may be broken or the page may have moved.</p>
      <Link to={currentUser ? "/home" : "/"} className="btn">
        {currentUser ? "Back to my applications" : "Go to the home page"}
      </Link>
    </section>
  );
}