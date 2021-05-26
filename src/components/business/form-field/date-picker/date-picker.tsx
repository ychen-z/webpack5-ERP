import React from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { IFieldProps, RecordProps } from './interface';

const FORMAT = 'YYYY-MM-DD';
function RefDatePicker(props: IFieldProps) {
    const { timestamp, format = FORMAT, value, ...rest } = props;

    // 格式化传入的value值
    const formatInputValue = (value: RecordProps | undefined) => (value ? moment(value) : value);

    // 格式化传出的value值(时间戳、format格式的字符串)
    const formatOutputValue = (value: Moment | null) => (value ? (timestamp ? moment(value.format(format)).valueOf() : value.format(format)) : value);

    const onChange = (value: Moment | null) => {
        const { onChange } = props;
        onChange && onChange(formatOutputValue(value));
    };

    return (
        <DatePicker
            placeholder="请选择"
            style={{ width: 200 }}
            getPopupContainer={trigger => (trigger.parentNode || document.body) as HTMLElement}
            {...rest}
            value={formatInputValue(value) as Moment | undefined}
            onChange={onChange}
        />
    );
}

export default RefDatePicker;
