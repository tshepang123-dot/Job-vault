import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import type { Job } from "../types";

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link to={`/job/${job.id}`} className="card job-card">
      <div>
        <h3>{job.title}</h3>
        <span className="muted">
          {job.company} · applied {job.dateApplied}
        </span>
      </div>
      <StatusBadge status={job.status} />
    </Link>
  );
}