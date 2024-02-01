import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";
import { NetWorkService } from "@/services/apinetworkservice";

type Variables = {
  email: string;
};

type Variables2 = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};

type InviteBody = {
  company_id: number;
  emails: { role: number; email: string }[];
  invited_by_id: number;
};

type Response = {
  response: {
    message: string;
    status: number;
    token: string;
  };
};

export const useForgotPassword = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: "reset-password-request",
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});

export const useChangePassword = createMutation<Response, Variables2, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: "change-password",
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});

export const useSendInviteLink = createMutation<Response, InviteBody, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: "company/register-step-3",
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});
