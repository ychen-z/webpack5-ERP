import axios, { AxiosError, AxiosInstance } from 'axios';
import { message } from 'antd';
import { rootURL, isMock, ServerCode, ServerCodeMap, RedirectMap } from './config';
import { RequestConfig, ResponseConfig, ResponseError } from './interface';


const service: AxiosInstance = axios.create({
    baseURL: rootURL, // api的base_url
    timeout: 200000, // 请求超时时间
    withCredentials: !isMock // 允许携带cookie
});

function isResponseError<R>(x: any): x is ResponseError<R> {
    return x.data;
}
function isAxiosError<R>(x: any): x is AxiosError<R> {
    return x.response;
}
// 错误处理
const errHandle: <R>(err: AxiosError<R> | ResponseError<R>) => Promise<R> = err => {
    // 判断上下文是“接口状态码”还是“HTTP状态码”
    let errResult = {};
    let code = -1,
        msg = null;
    if (isAxiosError(err) && err.response) {
        code = err.response.status;
    }
    if (isResponseError(err)) {
        code = err.data.code;
        msg = err.data.msg;
    }
    // 是否需要重定向到指定页
    RedirectMap.hasOwnProperty(code) && window.location.replace(RedirectMap[code]);
    const ERR_MESSAGE = msg || ServerCodeMap[code] || '接口异常';
    // 若code是400，则不会弹出message
    code != ServerCode.CONTINUE ? message.error(ERR_MESSAGE) : console.info({ ...err, message: ERR_MESSAGE });
    if (isResponseError(err)) {
        errResult = err.data;
    }
    return Promise.reject(errResult);
};

const response: <R>(axiosObj: Promise<ResponseConfig<R>>) => Promise<R> = axiosObj => {
    return axiosObj.then(res => res.data).catch(err => errHandle(err));
};

// request拦截器
service.interceptors.request.use(
    config => {
        //在发送请求之前做某事，比如说 设置loading动画显示
        return config;
    },
    error => {
        //请求错误时做些事
        return Promise.reject(error);
    }
);

// response拦截器
service.interceptors.response.use(
    // HTTP的状态码(只有200才走这里)
    response => {
        // 以下判断的是：接口状态码（data.code）
        const res = response.data;
        if (res.code === ServerCode.SUCCESS) return response.data;

        return Promise.reject({ data: res, response });
    },
    err => {
        // 统一错误拦截
        return Promise.reject(err);
    }
);

/**
 * 四种请求方式
 * @param url       接口地址
 * @param data      接口参数（注：get后续将放入“含有params的对象”才能接到url；delete后续将放入“含有data属性的对象”才能通过payload传输）
 * @param headers   接口所需header配置
 */
 export const get: <R>(req: RequestConfig) => Promise<R> = ({ url, data, headers }) => response(service.get(url, { params: data, headers }));
 export const post: <R>(req: RequestConfig) => Promise<R> = ({ url, data, headers }) => response(service.post(url, data, { headers }));
 export const put: <R>(req: RequestConfig) => Promise<R> = ({ url, data, headers }) => response(service.put(url, data, { headers }));
 export const del: <R>(req: RequestConfig) => Promise<R> = ({ url, data, headers }) => response(service.delete(url, { data, headers }));
 

export default service;
