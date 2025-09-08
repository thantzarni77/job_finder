import axiosClient from "./axiosClient";

export type SeekerType = {
  id: number | null;
  skills: string[];
  education: { degree: string; year: string }[];
  work_experience:
    | {
        workPos: string;
        year: string;
      }[]
    | null;
  role: string;
  talent: string;
  social_media_link: string[];
  image: string;
  bio: string;
  user_id: {
    id: number | null;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  created_at: Date;
};

type TalentsType = {
  id: number;
  name: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
};

type Education = {
  degree: string;
  year: string;
};

type WorkExperience = {
  workPos: string;
  year: string;
};

export type Seeker = {
  id: number;
  skills: string[];
  education: Education[];
  work_experience: WorkExperience[];
  role: string;
  talent: string;
  social_media_link: string[];
  image: string;
  bio: string;
  user_id: User;
  created_at: string;
};

type Link = {
  url: string | null;
  label: string;
  active: boolean;
};

type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type SeekerApiResponse = {
  data: Seeker[];
  links: PaginationLinks;
  meta: Meta;
  statusCode: number;
  message: string;
};

// getting seeker user list
export const getSeekerList = async (
  talents: string[],
  page: number,
  talentName: string,
): Promise<SeekerApiResponse> => {
  if (talents && talents.length > 0) {
    page = 1;
  }
  const { data } = await axiosClient.get("/seeker", {
    params: {
      talent: talents,
      page,
      talentName,
    },
  });
  return data;
};

//getting talent/seeker's detail data
export const getSeekerDetail = async (id: number): Promise<Seeker> => {
  const { data } = await axiosClient.get(`/seeker/${id}`);
  return data.data;
};

// getting talent list
export const getTalents = async (): Promise<TalentsType[]> => {
  const { data } = await axiosClient.get("/talent");
  return data.data;
};
