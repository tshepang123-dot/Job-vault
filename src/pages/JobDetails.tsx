import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputField from "../components/InputField";
import StatusBadge from "../components/StatusBadge";
import NotFound from "./NotFound";
import { useJobs } from "../hooks/useJobs";
import type { Job, JobStatus } from "../types";

const STATUSES: JobStatus[] = ["Applied", "Interview", "Offer", "Rejected"];
const WORK_TYPES = ["On-site", "Hybrid", "Remote"];


const toLines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const makeForm = (j: Job) => ({
  status: j.status as string,
  address: j.address,
  contact: j.contact,
  salary: j.salary ?? "",
  workType: j.workType ?? "",
  interviewDate: j.interviewDate ?? "",
  duties: j.duties.join("\n"),
  requirements: j.requirements.join("\n"),
  notes: j.notes ?? "",
});

type FormState = ReturnType<typeof makeForm>;

interface JobViewProps {
  job: Job;
  updateJob: (id: number, changes: Partial<Job>) => void;
  deleteJob: (id: number) => void;
}

function JobView({ job, updateJob, deleteJob }: JobViewProps) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<FormState>(makeForm(job));

  const change =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const startEdit = () => {
    setForm(makeForm(job));
    setEditing(true);
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateJob(job.id, {
      status: form.status as JobStatus,
      address: form.address.trim() || "Not added",
      contact: form.contact.trim() || "Not added",
      salary: form.salary.trim(),
      workType: form.workType,
      interviewDate: form.interviewDate,
      duties: toLines(form.duties),
      requirements: toLines(form.requirements),
      notes: form.notes.trim(),
    });
    setEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${job.title}" at ${job.company}?`)) {
      deleteJob(job.id);
      navigate("/home");
    }
  };

 
  if (editing) {
    return (
      <div className="detail-edit">
        <button className="link-button" onClick={() => setEditing(false)}>
          Cancel and go back
        </button>

        <form className="card" onSubmit={handleSave} noValidate>
          <h1 className="detail-title">Edit {job.title}</h1>
          <p className="muted">{job.company}</p>

          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" className="input" value={form.status} onChange={change("status")}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <InputField label="Address" value={form.address} onChange={change("address")} />
          <InputField label="Contact details" value={form.contact} onChange={change("contact")} />
          <InputField label="Salary" placeholder="e.g. R38,000 per month" value={form.salary} onChange={change("salary")} />

          <div className="field">
            <label htmlFor="workType">Work type</label>
            <select id="workType" className="input" value={form.workType} onChange={change("workType")}>
              <option value="">Not added</option>
              {WORK_TYPES.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          <InputField label="Interview date" type="date" value={form.interviewDate} onChange={change("interviewDate")} />

          <div className="field">
            <label htmlFor="duties">Duties (one per line)</label>
            <textarea id="duties" className="input" rows={4} value={form.duties} onChange={change("duties")} />
          </div>

          <div className="field">
            <label htmlFor="requirements">Requirements (one per line)</label>
            <textarea id="requirements" className="input" rows={4} value={form.requirements} onChange={change("requirements")} />
          </div>

          <div className="field">
            <label htmlFor="notes">Interview notes</label>
            <textarea id="notes" className="input" rows={4} value={form.notes} onChange={change("notes")} />
          </div>

          <div className="detail-actions">
            <button className="btn" type="submit">Save changes</button>
            <button className="btn btn-ghost" type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

 
  return (
    <>
      <div className="detail-top">
        <Link to="/home">Back to my applications</Link>
      </div>

      <div className="detail">
        <section className="card">
          <StatusBadge status={job.status} />
          <h1 className="detail-title">{job.title}</h1>
          <p className="muted">
            {job.company} · applied {job.dateApplied}
          </p>

          <h2>Duties</h2>
          {job.duties.length ? (
            <ul>{job.duties.map((d) => <li key={d}>{d}</li>)}</ul>
          ) : (
            <p className="muted">No duties added yet.</p>
          )}

          <h2>Requirements</h2>
          {job.requirements.length ? (
            <ul>{job.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
          ) : (
            <p className="muted">No requirements added yet.</p>
          )}

          <h2>Interview notes</h2>
          <p className={job.notes ? "" : "muted"}>
            {job.notes || "Add questions to ask and points to remember."}
          </p>

          <div className="detail-actions">
            <button className="btn" onClick={startEdit}>Edit details</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </section>

        <aside className="card">
          <h2>Company and role</h2>
          <dl>
            <dt>Address</dt>
            <dd>{job.address}</dd>
            <dt>Contact</dt>
            <dd>{job.contact}</dd>
            <dt>Salary</dt>
            <dd>{job.salary || "Not added"}</dd>
            <dt>Work type</dt>
            <dd>{job.workType || "Not added"}</dd>
            <dt>Interview</dt>
            <dd>{job.interviewDate || "Not scheduled"}</dd>
          </dl>
        </aside>
      </div>
    </>
  );
}

export default function JobDetails() {
  const { id } = useParams();
  const { jobs, updateJob, deleteJob } = useJobs();
  const job = jobs.find((j) => j.id === Number(id));


  if (!job) return <NotFound />;

  return <JobView job={job} updateJob={updateJob} deleteJob={deleteJob} />;
}