import React from 'react';
import TreeSelect from '@/components/common/u-tree-select';
import { useFetch } from '@/hooks';
import { getAllDepartments } from '@/axios';
import { ITreeSelectFieldProps } from './interface';

function Department(props: ITreeSelectFieldProps) {
    const { isLoading, data } = useFetch(getAllDepartments, null);

    return (
        <TreeSelect
            placeholder={isLoading ? '正在努力加载中...' : '请选择部门'}
            labelInValue
            treeCheckable
            showCheckedStrategy="SHOW_PARENT"
            treeData={data}
            fieldNames={{ value: 'departmentId', disabled: 'noPerm' }}
            {...props}
        />
    );
}

export default Department;
