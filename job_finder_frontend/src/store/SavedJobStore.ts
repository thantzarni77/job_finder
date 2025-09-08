import { create } from "zustand";

type SaveJob = {
  id: number;
  seeker_id: number;
  post_job_id: number;
  created_at: string;
  updated_at: string;
};

type SeekerSavedJobs = {
  seekerSavedJobs: SaveJob[];
};

type SeekerSavedJobsActions = {
  setSeekerSavedJobs: (value: SaveJob[]) => void;
};

export const useSeekerSavedJobs = create<
  SeekerSavedJobs & SeekerSavedJobsActions
>((set) => ({
  seekerSavedJobs: [],
  setSeekerSavedJobs: (value: SaveJob[]) => {
    set({ seekerSavedJobs: value });
  },
}));
