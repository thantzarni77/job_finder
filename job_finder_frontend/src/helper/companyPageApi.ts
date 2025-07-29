import axiosClient from "./axiosClient";

export type CompanyType = {
  id: number;
  company_name: string;
  company_address: string;
  company_phone: number;
  company_email: string;
  company_type: string;
  created_at: Date;
};

export async function getCompanies(): Promise<CompanyType[]> {
  const { data } = await axiosClient.get("/employer");
  return data.data;
}
