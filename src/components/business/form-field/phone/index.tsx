/**
 * 手机号码表单组件
 * @return { phoneType, phone } phoneType: 手机号码类型  phone: 手机号码
 * @description
 * 手机类型为大陆地区时，需要校验手机号码格式
 */
import React from 'react';
import { Form } from 'antd';
import { isMobile } from '@/utils/tools';
import Phone, { DEFAULT_VALUE, PhoneTypeId } from './phone';
import { IFormItemProps } from './interface';

export default (props: IFormItemProps) => {
    const { label = '手机号码', name, required, ...rest } = props;

    return (
        <Form.Item
            label={label}
            name={name}
            required={required}
            rules={[
                form => ({
                    validator(rule, value = DEFAULT_VALUE) {
                        if (required && !value.phone) {
                            return Promise.reject(`请填写${label}`);
                        }

                        if (value.phone && !isMobile(value.phone) && value.phoneType === PhoneTypeId.MAIN_LAND) {
                            return Promise.reject('格式错误');
                        }

                        return Promise.resolve();
                    }
                })
            ]}
        >
            <Phone {...rest} />
        </Form.Item>
    );
};
