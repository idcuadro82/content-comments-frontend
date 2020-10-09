import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> { }
}

abstract class HttpClientBase {
  protected readonly axiosInstance: AxiosInstance;

  public constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.axiosInstance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _initializeResponseInterceptor = () => {
    this.axiosInstance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
  };

  private _handleResponse = (response: AxiosResponse) => response;

  protected _handleError = (error: any) => Promise.reject(error);
}

export default HttpClientBase;
