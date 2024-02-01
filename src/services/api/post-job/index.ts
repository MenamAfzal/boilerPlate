import type { AxiosError } from "axios";
import { createMutation, createQuery } from "react-query-kit";

import { NetWorkService } from "@/services/apinetworkservice";

type DescriptionListVariables = void;

type Variables = {
  job_description_id: number;
  job_title_id: string;
  education_levels: string;
  job_description: string;
  short_description: string;
  company_id: number;
  skills: string[];
  deadline_date: string;
  experience_levels: string;
  city_id: number;
  country_id: number;
  google_location: string;
  company_recruitment_process_id: number;
  job_status: string;
  job_type_id: number;
  job_category_id: number;
};

type Response = {
  response: {
    message: string;
    status: number;
  };
};

type Response2 = {
  response: {
    data: any;
    message: string;
    status: number;
  };
};

export const usePostJobMutation = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: "job/post/step_all",
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});

export const useJobTitles = createQuery<Response2, DescriptionListVariables, AxiosError>({
  primaryKey: "job-descriptions",
  queryFn: ({ queryKey: [primaryKey] }) => {
    return NetWorkService.Get({
      url: `${primaryKey}`,
      //@ts-ignore
    }).then((response) => response.data);
  },
});
