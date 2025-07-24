import { create } from "zustand";

type SeekerProfile = {
  id: number | null;
  skills: string[];
  education: { degree: string; year: string }[];
  work_experience: {
    workPos: string;
    year: string;
  }[];
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

type EmployerProfile = {
  id: number | null;
  user_id: number | null;
  company_name: string | null;
  company_address: string | null;
  company_phone: string | null;
  company_email: string | null;
  company_image: string | null;
  company_type: string | null;
  company_description: string | null;
  password: null;
  verification: string;
  created_at: string;
  updated_at: string;
};

type SeekerProfileState = {
  seekerProfile: SeekerProfile;
  setSeekerProfile: (value: SeekerProfile) => void;
};

type EmployerProfileState = {
  employerProfile: EmployerProfile;
  setEmployerProfile: (value: EmployerProfile) => void;
};

export const useProfileStore = create<
  SeekerProfileState & EmployerProfileState
>((set) => ({
  seekerProfile: {
    id: null,
    skills: [],
    education: [{ degree: "", year: "" }],
    work_experience: [{ workPos: "", year: "" }],
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

  employerProfile: {
    id: null,
    user_id: null,
    company_name: "",
    company_address: "",
    company_phone: "",
    company_email: "",
    company_image: "",
    company_type: "",
    company_description: "",
    password: null,
    verification: "",
    created_at: "",
    updated_at: "",
  },
  setEmployerProfile: (employerProfileFromServer) => {
    set({ employerProfile: employerProfileFromServer });
  },
}));
