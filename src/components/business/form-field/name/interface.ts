import { InputProps } from 'antd/lib/input';

export interface IFormItemProps extends InputProps {
    label?: React.ReactNode;
    name: string;
    required?: boolean;
}

export type INameProps = InputProps;
