// 当前的接口联调环境
export const isDev = process.env.NODE_ENV === 'development';
export const isMock = false;
export const isTest = false;

export const rootURL = isDev ? (isMock ? '/mock' : isTest ? '/test' : '/dev') : '/';



// 应用

// import { rootURL } from '@/utils/config';
// /**
//  * 公用get请求
//  * @param url       接口地址
//  * @param msg       接口异常提示
//  * @param headers   接口所需header配置
//  */

// const service = axios.create({
//     baseURL: rootURL, // api的base_url
//     timeout: 200000, // 请求超时时间
//     withCredentials: true // 允许携带cookie
// });
