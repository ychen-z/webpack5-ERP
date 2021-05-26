/**
 * 搜索项配置文件
 * @param {string | ReactNode} label 搜索项名称
 * @param {string} key 搜索时传给后端的参数名
 * @param {string} alias 别名，适用于”搜索项可复用，但搜索名称不同时的场景“；有别名时取别名传给后端
 * @param {number} span 栅格布局下筛选单元在搜索模块占比，默认为8（整个搜索项模块划分为24块）
 * @param {obj} initialValue 搜索单元默认值
 * @param {obj} API 搜索单元依赖的组件所支持的所有属性集合
 * @param {function} beforeShow 搜索单元渲染前的钩子函数（适用场景：搜索单元B只在搜索单元A的值为某个特定值时才出现）
 * @param {ReactNode} content 搜索单元所依赖的组件
 */
import { getCourseClassList, getRoleListSimple} from '@/axios';
import DepartmentItem from './module/DepartmentItem';
import InputItem from './module/InputItem';
import SelectItem from './module/SelectItem';
import RadioItem from './module/RadioItem';
import CascaderItem from './module/CascaderItem';
import { ISearchUnitProps, IInputProps, ICascaderProps, IRadioGroupProps, ISelectProps } from './interface';

// ---------------------------------------------------InputItem类-----------------------------------------------------------

// 外部讲师姓名
let Name4OuterTeacher: ISearchUnitProps<IInputProps> = {
    label: '讲师姓名',
    key: 'name',
    API: {
        placeholder: '请输入学员姓名或工号'
    },
    content: InputItem
};

// ---------------------------------------------------SelectItem类-----------------------------------------------------------
let Role: ISearchUnitProps<ISelectProps> = {
    label: '角色',
    key: 'roleId',
    API: {
        searchFn: getRoleListSimple
    },
    content: SelectItem
};


console.log(Role);


// ---------------------------------------------------RadioItem类-----------------------------------------------------------

let DepartmentPerm: ISearchUnitProps<IRadioGroupProps> = {
    label: '权限范围',
    key: 'departmentPerm',
    API: {
        list: []
    },
    content: RadioItem
};


console.log(DepartmentPerm);

// ---------------------------------------------------CasecaderItem类-----------------------------------------------------------

// 课程类别
let CourseClass: ISearchUnitProps<ICascaderProps> = {
    label: '课程类别',
    key: 'courseClass',
    API: {
        searchFn: getCourseClassList,
        changeOnSelect: true,
        fieldNames: { value: 'classCode' }
    },
    content: CascaderItem
};

// ---------------------------------------------------私有类-----------------------------------------------------------


// 目标部门
let TargetDepartment: ISearchUnitProps<ICascaderProps> = {
    label: '目标部门',
    key: 'departmentId',
    content: DepartmentItem
};


// 各页面搜索配置项
export const SearchItem: IObject<ISearchUnitProps[]> = {
    'aa': [Name4OuterTeacher, CourseClass, TargetDepartment], // 多媒体
};

// 格式化组件返回参数
export const formatData = (values: IObject, type: string): IObject => {
    let data = { ...values };

    data.courseClass && (data.courseClass = data.courseClass[data.courseClass.length - 1]); // 课程类别ID
    data.departmentId && (data.departmentId = data.departmentId[data.departmentId.length - 1]); // 末级部门ID
    data.projectIds && (data.projectIds = data.projectIds[data.projectIds.length - 1]); // 项目ID

    if (type === 'relateWork' && !data.type) delete data.type; // 关联作业临时解决方案

    return data;
};
