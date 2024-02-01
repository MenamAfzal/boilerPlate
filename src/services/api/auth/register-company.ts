import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { NetWorkService } from '@/services/apinetworkservice';

type Variables = {
  email: string;
  password: string;
  password_confirmation: string;
  full_name: string;
};

type Response = {
  response: {
    message: string;
    status: number;
  };
};

export const useRegisterCompany = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'applicant/register',
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});
