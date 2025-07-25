import { create } from "zustand";

type SeekerProject = {
  id: number;
  seeker_id: number;
  title: string;
  image: string;
  description: string;
  link: string;
  created_at: string;
  updated_at: string;
};

type Projects = {
  projects: SeekerProject[];
};

type SeekerProjectActions = {
  setSeekerProjects: (projects: SeekerProject[]) => void;
};

export const useSeekerProject = create<Projects & SeekerProjectActions>(
  (set) => ({
    projects: [],
    setSeekerProjects: (projectsFromServer) => {
      set({ projects: projectsFromServer });
    },
  }),
);
