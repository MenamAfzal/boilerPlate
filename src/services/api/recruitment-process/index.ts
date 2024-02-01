import type { AxiosError } from "axios";
import { createMutation, createQuery } from "react-query-kit";

import { NetWorkService } from "@/services/apinetworkservice";

type Variables = { id: number };

type StepsBody = { processId: number; companyId: number };

type AddProcessBody = {
  process_name: string;
  department_id: number;
  company_id: number;
  is_default: "0" | "1";
  description: string;
  process_owner: number; //string;
};

type AddStepBody = {
  step_name: string;
  sort_order: number;
  company_recruitment_process_id: number;
  description: string;
  responsible_person_id: number;
};

export type User = {
  company_name: string;
  short_description: string;
  company_user_id: string;
  user_id: string;
  role_id: string;
  person_name: string;
  isactive: string;
  user_image: string;
  user_type: string;
  email: string;
  role: string;
  is_email_verify: string;
};

export type Process = {
  id: number;
  process_name: string;
  company_id: string;
  description: null | string;
  department_id: null | string;
  process_owner: null | string;
  created_by: string;
  deleted_by: null | string;
  updated_by: null | string;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
  is_default: string;
};

export type Step = {
  process_name: string;
  name: string;
  id: number;
  company_recruitment_process_id: number;
  step_name: string;
  description: null | string;
  sort_order: string;
  responsible_person_id: string;
  created_by: string;
  deleted_by: null | string;
  updated_by: null | string;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
};

type Response = {
  response: {
    data: Process[];
  };
  status: number;
  message: string;
};

type Response2 = {
  response: {
    status: number;
    message: string;
  };
};

type Response3 = {
  response: {
    data: Step[];
  };
  status: number;
  message: string;
};

export const useGetUser = createQuery<Response, Variables, AxiosError>({
  primaryKey: "company/users",
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Get({
      url: `${primaryKey}/company_id/${variables?.id}`,
      //@ts-ignore
    }).then((response) => response.data);
  },
});

export const useRecruitMentProcess = createQuery<Response, Variables, AxiosError>({
  primaryKey: "company",
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Get({
      url: `${primaryKey}/company_recruitment_processes?company_id=${variables?.id}`,
      //@ts-ignore
    }).then((response) => response.data);
  },
});

export const useAddProcess = createMutation<Response2, AddProcessBody, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: "company/company_recruitment_processes",
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});

export const useSteps = createQuery<Response3, StepsBody, AxiosError>({
  primaryKey: "company/company_recruitment_process_steps",
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Get({
      url: `${primaryKey}/company_recruitment_process_id/${variables?.processId}/company_id/${variables?.companyId}`,
      //@ts-ignore
    }).then((response) => response.data);
  },
});

export const useAddStep = createMutation<Response2, AddStepBody, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: "company/company_recruitment_process_steps",
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});
