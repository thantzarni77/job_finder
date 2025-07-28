import axiosClient from "./axiosClient";

// type EducationType = {
//   school: string;
//   degree: string;
//   year: string;
// };
// type WorkExperienceType = {
//   company: string;
//   position: string;
//   start_date: string;
//   end_date: string;
// };
// type SocialMediaLinkType = {
//   facebook: string;
//   github: string;
//   linkedin: string;
//   instagram: string;
//   twitter: string;
// };

// type User_idType = {
//   id: number;
//   name: string;
//   phone: number | null;
//   address: string | null;
//   email: string;
// };

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

// getting seeker user list
export const getSeekerList = async (
  talents: string[],
): Promise<SeekerType[]> => {
  const { data } = await axiosClient.get("/seeker", {
    params: {
      talent: talents,
    },
  });
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
