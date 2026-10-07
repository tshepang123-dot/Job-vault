export type JobStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export interface User {
  username: string;
  password: string; // demo only; real apps hash passwords on a server
}

export interface Job {
  id: number;
  title: string;
  company: string;
  status: JobStatus;
  dateApplied: string;
  address: string;
  contact: string;
  salary?: string;
  workType?: string;
  interviewDate?: string;
  duties: string[];
  requirements: string[];
  notes?: string;
}