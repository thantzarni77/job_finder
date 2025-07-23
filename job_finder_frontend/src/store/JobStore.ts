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
  category: { id: number; name: string; created_at: Date; updated_at: Date };
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

// job filter
//  filter with job type
type jobTypeFilter = {
  selectedJobType: string[];
  setSelectedJobType: (jobType: string[]) => void;
};
export const useJobTypeFilter = create<jobTypeFilter>((set) => ({
  selectedJobType: [],
  setSelectedJobType: (selectedJobType) => {
    set({ selectedJobType });
  },
}));

// filter with role
type jobRoleFilter = {
  selectedJobRole: string[];
  setSelectedJobRole: (selectedJobRole: string[]) => void;
};

export const useJobRoleFilter = create<jobRoleFilter>((set) => ({
  selectedJobRole: [],
  setSelectedJobRole: (selectedJobRole) => {
    set({ selectedJobRole });
  },
}));

// filter with category
type jobCategoryFilter = {
  selectedJobCategory: string[];
  setSelectedJobCategory: (categories: string[]) => void;
};

export const useJobCategoryFilter = create<jobCategoryFilter>((set) => ({
  selectedJobCategory: [],
  setSelectedJobCategory: (selectedJobCategory) => {
    set({ selectedJobCategory });
  },
}));
