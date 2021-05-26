/**
 * 姓名表单组件
 * @description
 * 1、姓名长度最多100字符
 * 2、失去焦点时，姓名前后去空格
 */
import React from 'react';
import { Form } from 'antd';
import Name from './name';
import { IFormItemProps } from './interface';

export default (props: IFormItemProps) => {
    const { label = '姓名', name, required, ...rest } = props;

    return (
        <Form.Item label={label} name={name} rules={[{ required, message: '请填写姓名' }]}>
            <Name {...rest} />
        </Form.Item>
    );
};
