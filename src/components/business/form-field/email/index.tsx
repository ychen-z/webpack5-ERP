/**
 * 邮箱表单组件
 */
import React from 'react';
import { Form } from 'antd';
import { isEmail } from '@/utils/tools';
import Email from './email';
import { IFormItemProps } from './interface';

export default (props: IFormItemProps) => {
    const { label = '邮箱', name, required, ...rest } = props;

    return (
        <Form.Item
            label={label}
            name={name}
            required={required}
            rules={[
                form => ({
                    validator(rule, value) {
                        if (required && !value) {
                            return Promise.reject('请填写邮箱');
                        }

                        if (value && !isEmail(value)) {
                            return Promise.reject('格式错误');
                        }

                        return Promise.resolve();
                    }
                })
            ]}
        >
            <Email {...rest} />
        </Form.Item>
    );
};
