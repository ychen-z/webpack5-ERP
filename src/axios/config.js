// 当前的接口联调环境
export const isDev = process.env.NODE_ENV === 'development';
export const isMock = false;
export const isTest = true;

export const rootURL = isDev ? (isMock ? '/mock' : isTest ? '/test' : '/dev') : '/';

// TODO: 未完成
export const ServerCode = {
    WRONG_PARAM: 401,
    WRONG_REQUEST: 402
};

// TODO: 未完成
export const ServerCodeMap = {
    [ServerCode.WRONG_PARAM]: '参数格式出错',
    [ServerCode.WRONG_REQUEST]: '请求出错'
};
