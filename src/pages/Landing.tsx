import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    title: "Track applications",
    text: "Log each role and move it from Applied to Interview to Offer.",
  },
  {
    title: "Prepare for interviews",
    text: "Store the address, contacts, duties and requirements for every company.",
  },
  {
    title: "See your progress",
    text: "Counts for applied, interviewing and offers show where you stand today.",
  },
];

const steps = [
  { number: "1", title: "Create an account", text: "Pick a username and password." },
  { number: "2", title: "Add your applications", text: "Save the role, company and status." },
  { number: "3", title: "Prepare and follow up", text: "Open any job to review its details." },
];

export default function Landing() {
  const { currentUser } = useAuth();

  return (
    <>
      <section className="hero">
        <h1>
          Every application,
          <br />
          <span className="accent">one tidy vault.</span>
        </h1>
        <p className="muted">
          Job Vault keeps your applications, interview dates and company details
          together, so you walk into each interview prepared.
        </p>

        <div className="hero-actions">
          {currentUser ? (
            <Link to="/home" className="btn">
              Go to my applications
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn">
                Create free account
              </Link>
              <Link to="/login" className="btn btn-ghost">
                I already have one
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="grid3" aria-label="Features">
        {features.map((f) => (
          <div className="card" key={f.title}>
            <h3>{f.title}</h3>
            <p className="muted">{f.text}</p>
          </div>
        ))}
      </section>

      <section className="how">
        <h2>How it works</h2>
        <div className="grid3">
          {steps.map((s) => (
            <div className="card" key={s.number}>
              <span className="step-number">{s.number}</span>
              <h3>{s.title}</h3>
              <p className="muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        Job Vault: track every application in one place.
      </footer>
    </>
  );
}
