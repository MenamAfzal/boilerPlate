import type { AxiosError } from "axios";
import { createMutation, createQuery } from "react-query-kit";
import { NetWorkService } from "@/services/apinetworkservice";

type Variables = void;
type CompanyVariables = { id: number };

type EditCompanyVariables = {
  name: string;
  email: string;
  contact_number: string;
  no_of_employees: number;
  start_time: string;
  end_time: string;
  average_wage: number;
  languages: number[];
  categories: number[];
  short_description?: string;
  company_id: number;
  facebook_link: string;
  twitter_link: string;
  instagram_link: string;
  locations: {
    address_1: string;
    address_2: string;
    city_id: string;
    country_id: string;
    phone: string;
    email: string;
    website: string;
    web_location: string;
    longitude: string;
    latitude: string;
    google_location: string;
  };
};

type Company = {
  average_wage: string | null;
  contact_number: string;
  created_at: string;
  created_by: string | null;
  email: string;
  id: number;
  is_approved: string;
  member_since: string;
  name: string;
  no_of_employees: string | null;
  salary_range: string | null;
  short_description: string;
  slug: string;
  user_id: string;
  user_name: string;
  website: string | null;
  working_time: string | null;
  pic: string;
  cover: string;
  role_name: string;
};

export type SingleCompany = {
  id: number;
  name: string;
  short_description: string;
  member_since: string;
  created_by: null | string;
  deleted_by: null | string;
  updated_by: null | string;
  created_at: string;
  updated_at: string;
  is_approved: string;
  slug: string;
  salary_range: null | string;
  contact_number: string;
  website: null | string;
  email: string;
  no_of_employees: string;
  start_time: string;
  end_time: string;
  average_wage: string;
  is_top: string;
  rating: string;
  deleted_at: null | string;
  facebook_link: null | string;
  twitter_link: null | string;
  instagram_link: null | string;
  categories: {
    id: number;
    name: string;
  }[];
  languages: {
    id: number;
    name: string;
  }[];
  images: {
    cover: string;
    pic: string;
  };
  social: any[];
  industries: any[];
  location: {
    id: number;
    address_1: string;
    address_2: string;
    city_id: string;
    country_id: string;
    phone: string;
    email: string;
    website: string;
    web_location: string;
    longitude: string;
    latitude: string;
    created_by: string;
    deleted_by: null | string;
    updated_by: null | string;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
    company_id: string;
    google_location: string;
    company_name: string;
    country_name: string;
    city_name: string;
  };
};

type Response = {
  response: {
    data: Company[];
  };

  message: string;
  status: number;
};

export const useCompanies = createQuery<Response, Variables, AxiosError>({
  primaryKey: "company/user",
  queryFn: ({ queryKey: [primaryKey] }) => {
    return NetWorkService.Get({ url: primaryKey }).then(
      //@ts-ignore
      (response) => response.data
    );
  },
});

export const useGetCompanyDetails = createQuery<SingleCompany, CompanyVariables, AxiosError>({
  primaryKey: "company/detail/",
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Get({ url: `${primaryKey}company_id/${variables?.id}` }).then(
      //@ts-ignore
      (response) => response.data
    );
  },
});

export const useEditCompany = createMutation<Response, EditCompanyVariables, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: "company/update-profile",
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});
