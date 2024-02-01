import { StyleSheet } from 'react-native';

import BaseConfig from '@/config';

//@ts-ignore
import type { ParamsNetwork } from './type';

export const RESULT_CODE_PUSH_OUT = 401;
const TIME_OUT = 20000;

import type { AxiosRequestConfig } from 'axios';
import Axios from 'axios';

import { getAuthToken } from '@/store/auth';

//@ts-ignore
import { controller, handleParameter } from './helper';
import type { ResponseBase } from './type';

const AxiosInstance = Axios.create({});

//let refreshTokenRequest: Promise<string | null> | null = null;

// AxiosInstance.interceptors.response.use(
//   (response) => response,
//   async function (error) {
//     const originalRequest = error.config;
//     if (
//       error &&
//       error.response &&
//       (error.response.status === 403 || error.response.status === 401) &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       return AxiosInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// AxiosInstance.interceptors.response.use(
//   (response) => response,
//   async function (error) {
//     const originalRequest = error.config;

//     console.log("error.response", error.response);

//     if (
//       error &&
//       error.response &&
//       (error.response.status === 403 || error.response.status === 401) &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : refreshToken();

//       const newToken = await refreshTokenRequest;

//       console.log("newToken", newToken);

//       refreshTokenRequest = null;

//       if (newToken === null) {
//         return Promise.reject(error);
//       }

//       setUserToken(newToken);

//       originalRequest.headers["authorization"] = "Bearer " + newToken ?? "";

//       return AxiosInstance(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );

// Response interceptor for API calls
// AxiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     console.log("error", error);

//     const originalRequest = error.config;
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const access_token = await refreshToken();
//       Axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
//       return AxiosInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// // refresh token
// async function refreshToken(): Promise<any | null> {
//   return new Promise<any | null>((rs) => {
//     AxiosInstance.request({
//       method: "POST",
//       url: "company/refresh",
//       _retry: true,
//       baseURL: Config.API_URL,
//       data: {},
//     } as AxiosRequestConfig)
//       .then((res: AxiosResponse<any>) => rs(res.data))
//       .catch((error) => {
//         console.log("error", error);
//       });
//   });
// }

// base
function Request(config: ParamsNetwork) {
  const token = getAuthToken();

  let headers = {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + token ?? '',
  };

  const defaultConfig: AxiosRequestConfig = {
    baseURL: BaseConfig.API_URL,
    timeout: TIME_OUT,
    headers: headers,
  };

  return new Promise((rs, reject) => {
    AxiosInstance.request(
      StyleSheet.flatten([
        defaultConfig,
        config,
        { signal: config?.controller?.signal || controller.current?.signal },
      ])
    )
      .then((res) => {
        rs(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// get
async function Get(params: ParamsNetwork) {
  return Request(handleParameter(params, 'GET'));
}

// post
//@ts-ignore
async function Post(params: ParamsNetwork) {
  return Request(handleParameter(params, 'POST'));
}

type ParameterPostFormData = AxiosRequestConfig & ParamsNetwork;

// post FormData
//@ts-ignore
async function PostFormData(params: ParamsNetwork) {
  //   const { token }: AppState = getState("app");
  const headers: AxiosRequestConfig['headers'] = {
    // [tokenKeyHeader]: token ?? "",
    'Content-Type': 'multipart/form-data',
  };
  return Request(
    handleParameter<ParameterPostFormData>({ ...params, headers }, 'POST')
  );
}

// put
//@ts-ignore
async function Put(params: ParamsNetwork) {
  return Request(handleParameter(params, 'PUT'));
}

// patch
//@ts-ignore
async function Patch(params: ParamsNetwork) {
  return Request(handleParameter(params, 'PATCH'));
}

// delete
//@ts-ignore
async function Delete(params: ParamsNetwork) {
  return Request(handleParameter(params, 'DELETE'));
}

export type NetWorkResponseType<T> = (
  params: ParamsNetwork
) => Promise<ResponseBase<T> | null>;

export const NetWorkService = {
  Get,
  Post,
  Put,
  Delete,
  PostFormData,
  Request,
  Patch,
};
