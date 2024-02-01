import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { NetWorkService } from '@/services/apinetworkservice';

type Variables = {
  company_name: string;
  company_description: string;
  google_location: string;
  country_id: string;
  city_id: string;
};

type Response = {
  response: {
    message: string;
    status: number;
  };
};

export const useCompanyInformation = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    NetWorkService.Post({
      url: 'applicant/company/registration',
      body: variables,
    }).then((response) => {
      // @ts-ignore
      return response?.data;
    }),
  // .catch((error) => {
  //   console.log("error1", error?.response);
  // }),
});
