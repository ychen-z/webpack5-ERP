import { DatePickerProps } from 'antd/lib/date-picker';

// 组件输入输出值
export type RecordProps =
    | undefined
    | {
          startTime?: string;
          endTime?: string;
      };

export interface IFormItemProps extends IFieldProps {
    label?: React.ReactNode;
    name: string;
    required?: boolean;
    wrapperCol?: IObject;
    extra?: React.ReactNode;
    validate?: boolean;
}

export interface IFieldProps extends Omit<DatePickerProps, 'placeholder' | 'picker' | 'disabled' | 'value' | 'onChange'> {
    placeholder?: string[];
    disabled?: boolean[];
    value?: RecordProps;
    format?: string;
    onChange?: (value: RecordProps) => void;
}
