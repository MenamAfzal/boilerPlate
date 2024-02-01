import { createRef } from "react";
import { ResponseBase, ParamsNetwork } from "./type";
import { AxiosError, AxiosResponse, Method } from "axios";

export const CODE_DEFAULT = -200;
export const CODE_SUCCESS = 200;
export const ERROR_NETWORK_CODE = -100;
export const RESULT_CODE_PUSH_OUT = 401;
export const TIME_OUT = 10000;
export const STATUS_TIME_OUT = "ECONNABORTED";
export const CODE_TIME_OUT = 408;

export const handleErrorApi = (status: number) => {
  const result = { status: false, code: status, msg: "" };
  if (status > 505) {
    result.msg = "Server Error";
    return result;
  }
  if (status < 500 && status >= 418) {
    result.msg = "An error occurred while sending the request";
    return result;
  }

  return result;
};

const responseDefault: ResponseBase<Record<string, unknown>> = {
  code: -500,
  // @ts-ignore
  status: false,
  msg: "An error occurred. Please try again later",
};

export const controller = createRef<AbortController>();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// init controller
controller.current = new AbortController();

export const cancelAllRequest = () => {
  controller.current?.abort();
  // reset controller, if not. all request cannot execute
  // because old controller was aborted
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  controller.current = new AbortController();
};

export const handleResponseAxios = <T = Record<string, unknown>>(
  res: AxiosResponse<T>
): ResponseBase<T> => {
  if (res.data) {
    return {
      code: CODE_SUCCESS,
      status: true,
      // @ts-ignore
      data: res.data?.body,
      // @ts-ignore
      message: res.data?.message,
    };
  }
  return responseDefault as ResponseBase<T>;
};

export const handleErrorAxios = <T = Record<string, unknown>>(
  error: AxiosError
): ResponseBase<T> => {
  if (error.code === STATUS_TIME_OUT) {
    // timeout
    return handleErrorApi(CODE_TIME_OUT) as unknown as ResponseBase<T>;
  }
  if (error.response) {
    if (error.response.status === RESULT_CODE_PUSH_OUT) {
      return handleErrorApi(RESULT_CODE_PUSH_OUT) as unknown as ResponseBase<T>;
    } else {
      return handleErrorApi(error.response.status) as unknown as ResponseBase<T>;
    }
  }
  return handleErrorApi(ERROR_NETWORK_CODE) as unknown as ResponseBase<T>;
};

export const handlePath = (url: string, path: ParamsNetwork["path"]) => {
  if (!path || Object.keys(path).length <= 0) {
    return url;
  }
  let resUrl = url;
  Object.keys(path).forEach((k) => {
    // @ts-ignore
    resUrl = resUrl.replaceAll(`{${k}}`, String(path[k]));
    // @ts-ignore
    resUrl = resUrl.replaceAll(`:${k}`, String(path[k]));
  });
  return resUrl;
};

export const handleParameter = <T extends ParamsNetwork>(
  props: T,
  method: Method
): ParamsNetwork => {
  const { url, body, path, params, apiBaseUrl } = props;
  return {
    ...props,
    method,
    url: handlePath(url, path),
    data: body,
    params,
    apiBaseUrl,
  };
};
