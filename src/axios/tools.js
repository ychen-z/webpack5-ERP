import axios from 'axios';
import { message } from 'antd';
import { rootURL, isMock, ServerCode, ServerCodeMap, RedirectMap } from './config';

const service = axios.create({
    baseURL: rootURL, // api的base_url
    timeout: 200000, // 请求超时时间
    withCredentials: !isMock // 允许携带cookie
});

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
        if ([ServerCode.SUCCESS, ServerCode.CONTINUE].includes(res.code)) return response;

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
export const get = ({ url, data, headers }) => response(service.get(url, { params: data }, headers));
export const post = ({ url, data, headers }) => response(service.post(url, data, headers));
export const put = ({ url, data, headers }) => response(service.put(url, data, headers));
export const del = ({ url, data, headers }) => response(service.delete(url, { data }, headers));

const response = axiosObj => axiosObj.then(res => res.data).catch(err => errHandle(err));

const errHandle = err => {
    // 判断上下文是“接口状态码”还是“HTTP状态码”
    let code = err.data ? err.data.code : err.response.status;
    // 是否需要重定向到指定页
    RedirectMap.hasOwnProperty(code) && window.location.replace(RedirectMap[code]);
    err.message = ServerCodeMap[code] || '接口异常';
    message.error(err.message);
    return Promise.reject(err);
};

export default service;
