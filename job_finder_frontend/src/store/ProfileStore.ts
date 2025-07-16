import { create } from "zustand";

type UserID = {
  id: number | null;
  name: string;
};

type SeekerProfile = {
  id: number | null;
  skills: string[];
  education: string[];
  work_experience: string[];
  role: string;
  talent: string;
  social_media_link: string[];
  seeker_image: string;
  bio: string;
  user_id: UserID;
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
    seeker_image: "",
    bio: "",
    user_id: {
      id: null,
      name: "",
    },
  },
  setSeekerProfile: (seekerProfileFromServer) => {
    set({ seekerProfile: seekerProfileFromServer });
  },
}));
