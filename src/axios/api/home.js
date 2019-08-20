import { get, post, del } from '../tools';

export const a = data => post({ url: '/', data });
export const b = data => get({ url: '/', data });
export const c = id => del({ url: `/c/${id}` });
export const getLoginInfo = data => get({ url: `/api/campusManage/auth/findEmployeeRelatedProjects`, data });
