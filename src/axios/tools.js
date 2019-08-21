import axios from 'axios';
import { message } from 'antd';
import { rootURL, isMock } from './config';

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
    response => {
        const data = response.data;
        switch (data.code) {
            case 200:
                // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
                return response;
            case 400:
                // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
                return response;
            default:
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        //   const err = new Error()
        // let err = {};
        // err.data = data;
        // err.response = response;
        // throw { data, response };
        return Promise.reject({ data, response });
    },
    err => {
        // 非200、400的统一错误拦截
        if (err && err.response) {
            switch (err.response.status) {
                case 401:
                    err.message = `参数格式出错`;
                    break;
                case 402:
                    err.message = `请求出错`;
                    break;
                case 403:
                    window.location.replace('#/403');
                    err.message = '拒绝访问';
                    break;
                case 404:
                    err.message = `请求地址出错`;
                    break;
                case 406:
                    window.location.replace('#/login');
                    break;
                case 408:
                    err.message = '请求超时';
                    break;
                case 410:
                    err.message = '参数错误';
                    break;
                case 500:
                    err.message = '服务器内部错误';
                    break;
                case 501:
                    err.message = '服务未实现';
                    break;
                case 502:
                    err.message = '网关错误';
                    break;
                case 503:
                    err.message = '服务不可用';
                    break;
                case 504:
                    err.message = '网关超时';
                    break;
                case 505:
                    err.message = 'HTTP版本不受支持';
                    break;
                default:
            }
        }
        return Promise.reject(err);
    }
);

/**
 * 四种请求方式
 * @param url       接口地址
 * @param data      接口参数（注：get后续将放入“含有params的对象”才能接到url；delete后续将放入“含有data属性的对象”才能通过payload传输）
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const get = ({ url, data, msg, headers }) => response(service.get(url, { params: data }, headers));
export const post = ({ url, data, msg, headers }) => response(service.post(url, data, headers));
export const put = ({ url, data, msg, headers }) => response(service.put(url, data, headers));
export const del = ({ url, data, msg, headers }) => response(service.delete(url, { data }, headers));

const response = (axiosObj, msg) => axiosObj.then(res => res.data).catch(err => errHandle(err, msg));

const errHandle = (err, msg = '接口异常') => {
    switch (err.data && err.data.code) {
        case 401:
            err.message = err.data.msg || `参数格式出错`;
            break;
        case 402:
            err.message = err.data.msg || `toast error msg`;
            break;
        case 403:
            window.location.replace('#/403');
            err.message = err.data.msg || '拒绝访问';
            break;
        case 404:
            err.message = err.data.msg || `请求地址出错`;
            break;
        case 406:
            window.location.replace('#/login');
            break;
        case 408:
            err.message = err.data.msg || '请求超时';
            break;
        case 410:
            err.message = err.data.msg || '参数错误';
            break;
        case 500:
            err.message = err.data.msg || '服务器内部错误';
            break;
        case 501:
            err.message = err.data.msg || '服务未实现';
            break;
        case 502:
            err.message = err.data.msg || '网关错误';
            break;
        case 503:
            err.message = err.data.msg || '服务不可用';
            break;
        case 504:
            err.message = err.data.msg || '网关超时';
            break;
        case 505:
            err.message = err.data.msg || 'HTTP版本不受支持';
            break;
        default:
    }
    message.error(err.message || msg);
};

export default service;
