/**
 * 日期选择表单组件
 * @description
 * 避免业务层在使用日期组件时需要对日期格式进行处理；例如：
 * 1、接口返回字符串、时间戳，信息回填时我们需要转换成moment时间格式进行回填；
 * 2、日期组件返回值为moment格式，在接口保存时我们需要手动转成字符串、时间戳格式；
 */
import React from 'react';
import { Form } from 'antd';
import DatePicker from './date-picker';
import { IFormItemProps } from './interface';

export default (props: IFormItemProps) => {
    const { label = '日期', name, required, wrapperCol, ...rest } = props;

    return (
        <Form.Item label={label} name={name} rules={[{ required, message: `请选择${label}` }]} wrapperCol={wrapperCol}>
            <DatePicker {...rest} />
        </Form.Item>
    );
};
