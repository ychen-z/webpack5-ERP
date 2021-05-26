import React from 'react';
import Cascader from '@/components/common/u-cascader';
import { useFetch } from '@/hooks';
import { getAllDepartments } from '@/axios';
import { ICascaderFieldProps } from './interface';

function Department(props: ICascaderFieldProps) {
    const { isLoading, data } = useFetch(getAllDepartments, null);

    return (
        <Cascader
            placeholder={isLoading ? '正在努力加载中...' : '请选择部门'}
            changeOnSelect
            options={data}
            fieldNames={{ value: 'departmentId' }}
            {...props}
        />
    );
}

export default Department;
