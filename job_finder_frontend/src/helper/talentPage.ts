import axiosClient from "./axiosClient";

type EducationType = {
  school: string;
  degree: string;
  year: string;
};
type WorkExperienceType = {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
};
type SocialMediaLinkType = {
  facebook: string;
  github: string;
  linkedin: string;
  instagram: string;
  twitter: string;
};

type User_idType = {
  id: number;
  name: string;
  phone: number | null;
  address: string | null;
  email: string;
};

export type SeekerType = {
  id: number;
  skills: string[];
  education: EducationType[];
  work_experience: WorkExperienceType[];
  role: string;
  talent: string;
  social_media_link: SocialMediaLinkType[];
  image: string;
  bio: string;
  created_at: Date;
  user_id: User_idType;
};

type TalentsType = {
  id: number;
  name: string;
};

// getting seeker user list
export const getSeekerList = async (): Promise<SeekerType[]> => {
  const { data } = await axiosClient.get("/seeker");
  return data.data;
};

//getting talent/seeker's detail data
export const getSeekerDetail = async (id: number): Promise<SeekerType> => {
  const { data } = await axiosClient.get(`/seeker/${id}`);
  return data.data;
};

// getting talent list
export const getTalents = async (): Promise<TalentsType[]> => {
  const { data } = await axiosClient.get("/talent");
  return data.data;
};
