import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { NetWorkService } from "@/services/apinetworkservice";

type Variables = void;

type Variables2 = {
  id: number;
};

type Setting = {
  id: string;
  name: string;
};

type Response = Setting[];

type Response2 = {
  response: {
    data: Setting[];
  };

  message: string;
  status: number;
};

export const useExperienceLevels = createQuery<Response, Variables, AxiosError>({
  primaryKey: "experience-levels",
  queryFn: ({ queryKey: [primaryKey] }) => {
    //@ts-ignore
    return NetWorkService.Get({ url: primaryKey }).then(
      //@ts-ignore
      (response) => response.data
    );
  },
});

export const useEducationLevels = createQuery<Response, Variables, AxiosError>({
  primaryKey: "education-levels",
  queryFn: ({ queryKey: [primaryKey] }) => {
    //@ts-ignore
    return NetWorkService.Get({ url: primaryKey }).then(
      // @ts-ignore
      (response) => response.data
    );
  },
});

export const useJobTypes = createQuery<Response2, Variables, AxiosError>({
  primaryKey: "job-types",
  queryFn: ({ queryKey: [primaryKey] }) => {
    //@ts-ignore
    return NetWorkService.Get({ url: primaryKey }).then(
      //@ts-ignore
      (response) => response.data
    );
  },
});

export const useJobCategories = createQuery<Response, Variables, AxiosError>({
  primaryKey: "job-categories",
  queryFn: ({ queryKey: [primaryKey] }) => {
    //@ts-ignore
    return NetWorkService.Post({ url: primaryKey }).then((response) => {
      //@ts-ignore
      return response.data;
    });
  },
});

export const useDepartments = createQuery<Response2, Variables2, AxiosError>({
  primaryKey: "company-department",
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Get({ url: `${primaryKey}?company_id=${variables?.id}` }).then(
      //@ts-ignore
      (response) => response.data
    );
  },
});

export const useIndustries = createQuery<Response2, Variables, AxiosError>({
  primaryKey: "industries",
  queryFn: ({ queryKey: [primaryKey] }) => {
    return NetWorkService.Get({ url: `${primaryKey}` }).then(
      //@ts-ignore
      (response) => response.data
    );
  },
});

export const useSkills = createQuery<Response2, Variables, AxiosError>({
  primaryKey: "job-skills",
  queryFn: ({ queryKey: [primaryKey] }) => {
    return NetWorkService.Post({ url: `${primaryKey}` }).then(
      //@ts-ignore
      (response) => response.data
    );
  },
});
