import { useLocalStorage } from "./useLocalStorage";
import { useAuth } from "../context/AuthContext";
import type { Job, JobStatus } from "../types";

interface NewJob {
  title: string;
  company: string;
  address: string;
  contact: string;
  status: JobStatus;
}

export function useJobs() {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useLocalStorage<Job[]>(`jv-jobs-${currentUser}`, []);

  // Returns an error message, or null when the job was saved.
  const addJob = (data: NewJob): string | null => {
    if (!data.title.trim() || !data.company.trim()) {
      return "Job title and company are required.";
    }

    const nextId = jobs.length ? Math.max(...jobs.map((j) => j.id)) + 1 : 1;

    const job: Job = {
      id: nextId,
      title: data.title.trim(),
      company: data.company.trim(),
      status: data.status,
      dateApplied: new Date().toISOString().slice(0, 10),
      address: data.address.trim() || "Not added",
      contact: data.contact.trim() || "Not added",
      duties: [],
      requirements: [],
    };

    setJobs([job, ...jobs]);
    return null;
  };

  return { jobs, addJob };
}