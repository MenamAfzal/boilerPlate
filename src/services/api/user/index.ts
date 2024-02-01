import type { AxiosError } from 'axios';
import { createMutation, createQuery } from 'react-query-kit';

import { NetWorkService } from '@/services/apinetworkservice';

type Variables = { id: number };

type AddUserBody = {
  name: string;
  email: string;
  role_id: number;
  company_id: number;
  user_id: number;
  company_user_id: number;
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

type Response = {
  data: User[];
};

type Response2 = {
  status: number;
  message: string;
};

export const useGetUser = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'company/users',
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Get({
      url: `${primaryKey}/company_id/${variables?.id}`,
      //@ts-ignore
    }).then((response) => response.data);
  },
});

export const useAddUser = createMutation<Response2, AddUserBody, AxiosError>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'company/add-user',
      body: variables,
      // @ts-ignore
    }).then((response) => response?.data),
});
