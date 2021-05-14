declare module '*.png';

declare module '*.jpg';

declare module '*.jpeg';

declare module '*.md';

declare module 'react-resizable';

declare module '@netease-ehr/base';

interface IObject<T = any> {
    [key: string]: T;
}

// 接口请求方法
type IFetch<T = any> = ((req?: any) => Promise<T>) | undefined;

// 分页列表
interface IPaginationList<T = any> {
    totalPages: number;
    total: number;
    page?: number;
    items: T[];
}

// 文件
interface IFile {
    name: string;
    nosKey: string;
    url: string;
}

// 部门信息
interface Idepartment {
    departmentId: string;
    name: string;
}

// 内部人员信息
interface IPerson {
    jobNumber: string;
    name: string;
    email: string;
    stationName: string;
    departmentList: Idepartment[];
}
