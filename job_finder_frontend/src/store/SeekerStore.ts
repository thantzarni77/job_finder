import { create } from "zustand";
import { type SeekerApiResponse } from "../helper/talentPage";

export type SeekerProject = {
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

// state which to store talents to filter
type TalentFilterType = {
  selectedTalents: string[];
  setSelectedTalents: (selectedTalents: string[]) => void;
};

export const useSeekerFilterStore = create<TalentFilterType>((set) => ({
  selectedTalents: [],
  setSelectedTalents: (selectedTalents) => {
    set({ selectedTalents });
  },
}));

type SearchTalentsByNameType = {
  talentName: string;
  setTalentName: (name: string) => void;
};

export const useSearchTalentsByName = create<SearchTalentsByNameType>(
  (set) => ({
    talentName: "",
    setTalentName: (talentName) => {
      set({ talentName });
    },
  }),
);

type SeekerParentType = {
  stateSeekers: SeekerApiResponse;
  setStateSeekers: (seekers: SeekerApiResponse) => void;
};

export const initialSeekerApiResponse: SeekerApiResponse = {
  data: [],
  links: {
    first: "",
    last: "",
    prev: null,
    next: null,
  },
  meta: {
    current_page: 1,
    from: 0,
    last_page: 1,
    links: [],
    path: "",
    per_page: 10,
    to: 0,
    total: 0,
  },
  statusCode: 200,
  message: "",
};

export const useSeekerParentStore = create<SeekerParentType>((set) => ({
  stateSeekers: initialSeekerApiResponse,
  setStateSeekers: (stateSeekers) => {
    set({ stateSeekers });
  },
}));
