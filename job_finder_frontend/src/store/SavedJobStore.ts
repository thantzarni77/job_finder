import { create } from "zustand";

type SaveJob = {
  id: number;
  seeker_id: number;
  post_job_id: number;
  created_at: string;
  updated_at: string;
};

type SingleSavedJob = {
  saveJob: SaveJob;
};

type SingleSavedJobActions = {
  setSingleSavedJob: (value: SaveJob) => void;
};

export const useSavedSingleJobStore = create<
  SingleSavedJob & SingleSavedJobActions
>((set) => ({
  saveJob: {
    id: 0,
    seeker_id: 0,
    post_job_id: 0,
    created_at: "",
    updated_at: "",
  },
  setSingleSavedJob: (value: SaveJob) => {
    set({ saveJob: value });
  },
}));
