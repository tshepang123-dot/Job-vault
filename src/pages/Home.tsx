import { useState, type FormEvent } from "react";
import InputField from "../components/InputField";
import JobCard from "../components/JobCard";
import { useJobs } from "../hooks/useJobs";
import type { JobStatus } from "../types";

const STATUSES: JobStatus[] = ["Applied", "Interview", "Offer", "Rejected"];

export default function Home() {
  const { jobs, addJob } = useJobs();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<JobStatus>("Applied");
  const [error, setError] = useState("");

  const interviews = jobs.filter((j) => j.status === "Interview").length;
  const offers = jobs.filter((j) => j.status === "Offer").length;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = addJob({ title, company, address, contact, status });

    if (message) {
      setError(message);
      return;
    }

    // Clear the form
    setTitle("");
    setCompany("");
    setAddress("");
    setContact("");
    setStatus("Applied");
    setError("");
  };

  return (
    <div className="home">
      <aside className="card">
        <h2>Add application</h2>
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Job title"
            placeholder="e.g. Frontend Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputField
            label="Company"
            placeholder="e.g. Brightwave Studio"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <InputField
            label="Address (optional)"
            placeholder="Street, city"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <InputField
            label="Contact details (optional)"
            placeholder="Name, email or phone"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <div className="field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value as JobStatus)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <p className="form-error" role="alert">
            {error}
          </p>

          <button className="btn btn-block" type="submit">
            Save application
          </button>
        </form>
      </aside>

      <section>
        <h2>Jobs you applied for</h2>

        <div className="stats">
          <div className="stat">
            <strong>{jobs.length}</strong>
            <span className="muted">Total</span>
          </div>
          <div className="stat">
            <strong>{interviews}</strong>
            <span className="muted">Interviews</span>
          </div>
          <div className="stat">
            <strong>{offers}</strong>
            <span className="muted">Offers</span>
          </div>
        </div>

        {jobs.length === 0 ? (
          <p className="muted">No applications yet. Add your first one on the left.</p>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </section>
    </div>
  );
}