import React from 'react';
import { Form } from 'antd';
import Section from './section';
import { IFormItemProps } from './interface';

export default (props: IFormItemProps) => {
    const { label = '', name, required, wrapperCol, ...rest } = props;

    return (
        <Form.Item label={label} name={name} rules={[{ required, message: '请添加章节' }]} wrapperCol={wrapperCol}>
            <Section {...rest} />
        </Form.Item>
    );
};
