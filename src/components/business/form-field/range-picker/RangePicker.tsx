import React, { Component } from 'react';
import { DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import { IFieldProps, RecordProps } from './interface';

const FORMAT = 'YYYY-MM-DD';
class RangePicker extends Component<IFieldProps> {
    // 格式化输入值（将输入值统一转换成moment格式）
    formatA2B = (value: RecordProps) => {
        if (!value) return;
        let startTime = value.startTime ? moment(value.startTime) : undefined;
        let endTime = value.endTime ? moment(value.endTime) : undefined;
        return { startTime, endTime };
    };

    // 格式化输出值（将输出值统一转换成format格式）
    formatB2A = (value: IObject) => {
        const { format = FORMAT } = this.props;
        let startTime = value.startTime ? moment(value.startTime).format(format) : undefined;
        let endTime = value.endTime ? moment(value.endTime).format(format) : undefined;
        return { startTime, endTime };
    };

    onChange = (val: moment.Moment | null, type: 'startTime' | 'endTime') => {
        let { onChange, value } = this.props;
        let obj: IObject = { ...value };
        obj[type] = val;
        onChange && onChange(this.formatB2A(obj));
    };

    render() {
        const { id, placeholder = ['开始时间', '结束时间'], disabled = [], value = {}, format = FORMAT, ...rest } = this.props;
        const formatValue = this.formatA2B(value);
        return (
            <Row align="middle">
                <Col span={11}>
                    <DatePicker
                        style={{ width: '100%' }}
                        placeholder={placeholder[0]}
                        disabled={disabled[0]}
                        format={format}
                        showToday={false}
                        getPopupContainer={trigger => (trigger.parentNode || document.body) as HTMLElement}
                        {...rest}
                        value={formatValue?.startTime}
                        onChange={data => this.onChange(data, 'startTime')}
                    />
                </Col>
                <Col span={2}>
                    <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>至</span>
                </Col>
                <Col span={11}>
                    <DatePicker
                        style={{ width: '100%' }}
                        placeholder={placeholder[1]}
                        disabled={disabled[1]}
                        format={format}
                        showToday={false}
                        getPopupContainer={trigger => (trigger.parentNode || document.body) as HTMLElement}
                        {...rest}
                        value={formatValue?.endTime}
                        onChange={data => this.onChange(data, 'endTime')}
                    />
                </Col>
            </Row>
        );
    }
}

export default RangePicker;
