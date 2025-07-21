import { create } from "zustand";

export type Job = {
  id: number;
  employer_id: number;
  category_id: number | null;
  job_title: string;
  job_code: string;
  location: string;
  salary: string;
  posting_status: string;
  role: string;
  type: string;
  view_count: number;
  created_at: string;
  updated_at: string;
};

type JobData = {
  jobs: Job[];
};

type JobActions = {
  setJobs: (jobsFromServer: Job[]) => void;
};

export const useJobStore = create<JobData & JobActions>((set) => ({
  jobs: [],
  setJobs: (jobsFromServer: Job[]) => {
    set({ jobs: jobsFromServer });
  },
}));
