import axiosClient from "./axiosClient";

type User = {
  id: number;
  name: string;
  phone: string;
  address: string;
};

export type Employer = {
  id: number;
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_image: string;
  company_type: string;

  verification: string;
  created_at: string; // ISO date string
  user_id: User;
};

type LinkItem = {
  url: string | null;
  label: string;
  active: boolean;
};

type Links = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: LinkItem[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type EmployerApiResponse = {
  data: Employer[];
  links: Links;
  meta: Meta;
  statusCode: number;
  message: string;
};

export async function getCompanies(
  page: number,
  searchCompanyName: string,
): Promise<EmployerApiResponse> {
  const { data } = await axiosClient.get("/employer", {
    params: {
      page: page,
      companyName: searchCompanyName,
    },
  });
  return data;
}

export async function getCompanyDetail(id: number) {
  const { data } = await axiosClient.get(`/employer-data/${id}`);
  return data.data;
}
