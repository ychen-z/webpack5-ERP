import { DatePickerProps } from 'antd/lib/date-picker';

export type RecordProps = string | number | null;

export interface IFormItemProps extends IFieldProps {
    label?: React.ReactNode;
    name: string;
    required?: boolean;
    wrapperCol?: IObject;
}

export interface IFieldProps extends Omit<DatePickerProps, 'value' | 'onChange' | 'format'> {
    timestamp?: boolean; // 输出结果转成时间戳，默认为format格式的字符串
    format?: string;
    value?: RecordProps;
    onChange?: (value: RecordProps) => void;
}
