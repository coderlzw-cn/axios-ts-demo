import axios from 'axios'
import type {AxiosInstance, AxiosRequestConfig} from 'axios'
import type {RequestConfig, RequestInterceptors} from './type'

class Request {
    instance: AxiosInstance  // axios 实例
    interceptorsObj?: RequestInterceptors

    constructor(config: RequestConfig) {
        this.instance = axios.create(config)
        this.interceptorsObj = config.interceptors
        // 请求拦截器（全局）
        this.instance.interceptors.request.use(
            (res: AxiosRequestConfig) => {
                /* 实例的全局请求拦截器 */
                return res
            },
            (err: any) => err,
        )

        // 实例拦截器
        this.instance.interceptors.request.use(
            this.interceptorsObj?.requestInterceptors,  // 请求成功拦截器
            this.interceptorsObj?.requestInterceptorsCatch, // 请求失败拦截器
        )
        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,     // 响应成功拦截器
            this.interceptorsObj?.responseInterceptorsCatch,    // 响应失败拦截器
        )

        // 全局响应拦截器对象
        this.instance.interceptors.response.use(
            (res: AxiosRequestConfig) => {
                /* 实例的全局响应拦截器 */
                return res.data
            },
            (err: any) => {
                return Promise.reject(err.message)
            }
        )
    }

    request(config: AxiosRequestConfig) {
        return this.instance.request(config)
    }
}

const service = new Request({
    baseURL: "http://localhost:4000",
    timeout: 5 * 1000,
    interceptors: {
        requestInterceptors: (config) => {
            return config
        },
        requestInterceptorsCatch: (err => {
            return Promise.reject(err.message)
        }),
        responseInterceptors: (res => {
            // 这里的值就已经是后端返回的数据，不需要res.data获取
            return res
        }),
        responseInterceptorsCatch: (err => {
            return Promise.reject(err.message)
        })
    }
})
export default service
