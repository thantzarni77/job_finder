import { create } from "zustand";

export type Job = {
  id: number;
  employer_id: number;
  category_id: number | null;
  job_title: string;
  location: string;
  salary: string;
  posting_status: string;
  role: string;
  type: string;
  requirements: string;
  description: string;
  deadline: Date;
  vacancy: string;
  note: string;
  benefits: string;
  gender: string;
  view_count: number;
  job_code: string;
  created_at: string;
  updated_at: string;
  job_detail: {
    id: number;
    post_job_id: number;
    requirements: string;
    description: string;
    deadline: string;
    vacancy: number;
    note: string;
    gender: string;
    save_count: number;
    apply_count: number;
    benefits: string;
    created_at: string;
    updated_at: string;
  };
  employer: {
    id: number;
    user_id: number;
    company_name: string | null;
    company_address: string | null;
    company_phone: string | null;
    company_email: string | null;
    company_image: string | null;
    company_type: string | null;
    company_description: string | null;
    verification: string;
    created_at: string;
    updated_at: string;
  };
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

export type JobWithJobDetail = {
  id: number;
  employer_id: number;
  category_id: number;
  job_title: string;
  salary: string;
  role: string;
  posting_status: string;
  location: string;
  type: string;
  view_count: number | null;
  job_code: string;
  created_at: string;
  updated_at: string;
  employer: {
    id: number;
    user_id: number;
    company_name: string | null;
    company_address: string | null;
    company_phone: string | null;
    company_email: string | null;
    company_image: string | null;
    company_type: string | null;
    company_description: string | null;
    verification: string;
    created_at: string;
    updated_at: string;
  };
  job_detail: {
    id: number;
    post_job_id: number;
    requirements: string;
    description: string;
    deadline: string;
    vacancy: number;
    note: string;
    gender: string;
    save_count: number | null;
    apply_count: number | null;
    benefits: string;
    created_at: string;
    updated_at: string;
  };
};

type JobDetails = {
  jobDetails: null | JobWithJobDetail;
};

const initialValues = {
  id: 0,
  employer_id: 0,
  category_id: 0,
  job_title: "",
  salary: "",
  role: "",
  posting_status: "",
  location: "",
  type: "",
  view_count: null,
  job_code: "",
  created_at: "",
  updated_at: "",
  employer: {
    id: 0,
    user_id: 0,
    company_name: "",
    company_address: "",
    company_phone: "",
    company_email: "",
    company_image: "",
    company_type: "",
    company_description: "",
    verification: "",
    created_at: "",
    updated_at: "",
  },
  job_detail: {
    id: 0,
    post_job_id: 0,
    requirements: "",
    description: "",
    deadline: "",
    vacancy: 0,
    note: "",
    gender: "",
    save_count: null,
    apply_count: null,
    benefits: "",
    created_at: "",
    updated_at: "",
  },
};

type JobDetailActions = {
  setJobDetails: (jobDetailsFromServer: JobWithJobDetail) => void;
};

export const useJobDetailStore = create<JobDetails & JobDetailActions>(
  (set) => ({
    jobDetails: initialValues,
    setJobDetails: (jobDetailsFromServer) => {
      set({ jobDetails: jobDetailsFromServer });
    },
  }),
);

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

// filter with salary
type SalaryRange = {
  min: number;
  max: number | null;
};

type jobSalaryFilter = {
  selectedSalary: SalaryRange | null;
  setSelectedSalary: (selectedSalary: SalaryRange | null) => void;
};

export const useJobSalaryFilter = create<jobSalaryFilter>((set) => ({
  selectedSalary: null,
  setSelectedSalary: (selectedSalary) => {
    set({ selectedSalary });
  },
}));

// search with job title
type SearchJobTitleType = {
  jobTitle: string;
  setJobTitle: (jobTitle: string) => void;
};
export const useSearchJobTitle = create<SearchJobTitleType>((set) => ({
  jobTitle: "",
  setJobTitle: (jobTitle: string) => {
    set({ jobTitle });
  },
}));

//seeker applied jobs
type AppliedJob = {
  id: number;
  seeker_id: number;
  employer_id: number;
  post_job_id: number;
  document: string[];
  message: string;
  shortlist: number;
  expected_salary: string;
  created_at: string;
  updated_at: string;
};

type SeekerAppliedJobs = {
  seekerAppliedJobs: AppliedJob[];
};

type SeekerAppliedJobsActions = {
  setAppliedJobs: (value: AppliedJob[]) => void;
};

export const useAppliedJobStore = create<
  SeekerAppliedJobs & SeekerAppliedJobsActions
>((set) => ({
  seekerAppliedJobs: [
    {
      id: 0,
      seeker_id: 0,
      employer_id: 0,
      post_job_id: 0,
      document: [""],
      message: "",
      shortlist: 0,
      expected_salary: "",
      created_at: "2025-07-26T15:05:32.000000Z",
      updated_at: "2025-07-26T15:05:32.000000Z",
    },
  ],
  setAppliedJobs: (value: AppliedJob[]) => {
    set({ seekerAppliedJobs: value });
  },
}));

export type AppliedSeeker = {
  id: number;
  seeker_id: number;
  employer_id: number;
  post_job_id: number;
  document: string[];
  message: string;
  shortlist: number;
  expected_salary: number;
  created_at: string;
  updated_at: string;
};

type JobPaginateType = {
  page: number;
  setPage: (page: number) => void;
};
export const useCompanyPaginateStore = create<JobPaginateType>((set) => ({
  page: 1,
  setPage: (page: number) => {
    set({ page });
  },
}));
