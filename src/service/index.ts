import axios from 'axios'
import type {AxiosInstance, AxiosRequestConfig} from 'axios'

class Request {
    instance: AxiosInstance  // axios 实例
    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)

        // 请求拦截器（全局）
        this.instance.interceptors.request.use(
            (res: AxiosRequestConfig) => {
                /* 实例的全局请求拦截器 */
                return res
            },
            (err: any) => err,
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
})
export default service
