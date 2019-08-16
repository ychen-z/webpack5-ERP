// 当前的接口联调环境
export const isDev = process.env.NODE_ENV === 'development';
export const isMock = false;
export const isTest = true;

export const rootURL = isDev ? (isMock ? '/mock' : isTest ? '/test' : '/dev') : '/';
