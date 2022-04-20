import type {AxiosResponse, AxiosRequestConfig} from "axios";

export interface RequestInterceptors {
    // 请求拦截器
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorsCatch?: (err: any) => any
    // 相应拦截器
    responseInterceptors?: (config: AxiosResponse) => AxiosResponse
    responseInterceptorsCatch?: (err: any) => any
}

export interface RequestConfig extends AxiosRequestConfig {
    interceptors?: RequestInterceptors
}
