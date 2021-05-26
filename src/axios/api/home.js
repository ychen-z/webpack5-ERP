import { get, post, del } from '../http';

export const a = data => post({ url: '/', data });
export const b = data => get({ url: '/', data });
export const c = id => del({ url: `/c/${id}` });
export const getLoginInfo = data => get({ url: `/api`, data });
export const getUserInfo = data => get({ url: `/api`, data });
export const getEmployeeList = data => get({ url: `/api`, data });
export const getAreaList = data => get({ url: `/api`, data });
export const getAllDepartments = data => get({ url: `/api`, data });
export const getCourseClassList = data => get({ url: `/api`, data });
export const getRoleListSimple = data => get({ url: `/api`, data });

// export const delMenu = data => get({ url: `/api`, data });
// export const getUserByUserId = data => get({ url: `/api`, data });
// export const editUser = data => get({ url: `/api`, data });
// export const getUserList = data => get({ url: `/api`, data });
// export const addMenu = data => get({ url: `/api`, data });
// export const editMenu = data => get({ url: `/api`, data });
// export const getMenus = data => get({ url: `/api`, data });
// export const delRole = data => get({ url: `/api`, data });
// export const getRoleByRoleId = data => get({ url: `/api`, data });
// export const getRoleList = data => get({ url: `/api`, data });
// export const addRole = data => get({ url: `/api`, data });
// export const editRole = data => get({ url: `/api`, data });
