import { AxiosRequestConfig } from "axios";

export type ResponseBase<T = any, TStatus = boolean> = {
  code: number;
  message?: string | null;
} & (TStatus extends true
  ? {
      data: T;
      status: true;
    }
  : {
      isSuccess: false;
      message?: string | null;
    });

export type BaseUrl = "PRODUCT_API_URL";

export interface ParamsNetwork extends AxiosRequestConfig {
  url: string;
  params?: Record<string, string | number>;
  path?: Record<string, string | number>;
  body?: Record<string, unknown>;
  controller?: AbortController;
  apiBaseUrl?: BaseUrl;
}
