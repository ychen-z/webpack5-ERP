/**
 * 时间表单组件  施阳  2020-09-15
 */
import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { IFormItemProps } from './interface';
import RangePicker from './RangePicker';

export default (props: IFormItemProps) => {
    const { label = '时间', extra, validate = true, name, required, ...rest } = props;

    return (
        <Form.Item
            label={label}
            name={name}
            required={required}
            extra={extra}
            rules={[
                form => ({
                    validator(rule, value = {}) {
                        if (validate) {
                            if (required && !value.startTime && !value.endTime) {
                                return Promise.reject(`请选择${label}`);
                            }

                            if ((!value.startTime && value.endTime) || (value.startTime && !value.endTime)) {
                                return Promise.reject(`请完善${label}`);
                            }

                            if (value.startTime && value.endTime && moment(value.startTime).diff(value.endTime) >= 0) {
                                return Promise.reject('开始时间要小于结束时间');
                            }
                        }

                        return Promise.resolve();
                    }
                })
            ]}
        >
            <RangePicker {...rest} />
        </Form.Item>
    );
};
