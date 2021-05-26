/**
 * 部门表单组件
 */
import React from 'react';
import { Form } from 'antd';
import Department from './department';
import MulDepartment from './mul-department';
import { IFormItemProps } from './interface';

export default (props: IFormItemProps) => {
    const { label = '目标部门', name, required, multiple, ...rest } = props;

    return (
        <Form.Item label={label} name={name} rules={[{ required, message: `请选择${label}` }]}>
            {multiple ? <MulDepartment {...rest} /> : <Department {...rest} />}
        </Form.Item>
    );
};
