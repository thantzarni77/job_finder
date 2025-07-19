import { create } from "zustand";

type EduRecord = Record<string, string>;

type SeekerProfile = {
  id: number | null;
  skills: string[];
  education: EduRecord[];
  work_experience: string[];
  role: string;
  talent: string;
  social_media_link: string[];
  image: string;
  bio: string;
  user_id: {
    id: number | null;
    name: string;
    phone: string;
    address: string;
  };
};

type SeekerProfileState = {
  seekerProfile: SeekerProfile;
  setSeekerProfile: (value: SeekerProfile) => void;
};

export const useSeekerProfileStore = create<SeekerProfileState>((set) => ({
  seekerProfile: {
    id: null,
    skills: [],
    education: [],
    work_experience: [],
    role: "",
    talent: "",
    social_media_link: [],
    image: "",
    bio: "",
    user_id: {
      id: null,
      name: "",
      phone: "",
      address: "",
    },
  },
  setSeekerProfile: (seekerProfileFromServer) => {
    set({ seekerProfile: seekerProfileFromServer });
  },
}));
