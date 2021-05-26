/**
 * 证件信息表单组件
 * @return { identityTypeEnum, identityNo } identityTypeEnum: 证件信息类型  identityNo: 证件号
 */
import React from 'react';
import { Form } from 'antd';
import { isIdCard } from '@/utils/tools';
import IdCard, { DEFAULT_VALUE, CertificateId } from './idCard';
import { IFormItemProps } from './interface';

export default (props: IFormItemProps) => {
    const { label = '证件信息', name, required, ...rest } = props;

    return (
        <Form.Item
            label={label}
            name={name}
            required={required}
            rules={[
                form => ({
                    validator(rule, value = DEFAULT_VALUE) {
                        if (required && !value.identityNo) {
                            return Promise.reject(`请填写${label}`);
                        }

                        if (value.identityNo && !isIdCard(value.identityNo) && value.identityTypeEnum === CertificateId.ID_CARD) {
                            return Promise.reject('格式错误');
                        }

                        return Promise.resolve();
                    }
                })
            ]}
        >
            <IdCard {...rest} />
        </Form.Item>
    );
};
