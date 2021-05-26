import { get, post, del } from '../http';

export const a = data => post({ url: '/', data });
export const b = data => get({ url: '/', data });
export const c = id => del({ url: `/c/${id}` });
export const getLoginInfo = data => get({ url: `/api/ats/sys/user/getLoginInfo`, data });
export const getUserInfo = data => get({ url: `/api/ats/sys/user/userCard`, data });
