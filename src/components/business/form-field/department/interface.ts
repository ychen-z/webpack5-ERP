import { ICascaderProps } from '@/components/common/u-cascader/interface';
import { ITreeSelectProps, ILabeledValue } from '@/components/common/u-tree-select/interface';

type Props = ICascaderFieldProps & ITreeSelectFieldProps;
export interface IFormItemProps extends Props {
    label?: React.ReactNode;
    name: string;
    required?: boolean;
    multiple?: boolean;
}

export type ICascaderFieldProps = ICascaderProps;

export interface ITreeSelectFieldProps extends Omit<ITreeSelectProps, 'value' | 'onChange'> {
    value?: RecordProps[];
    onChange?: (value: RecordProps[]) => void;
}

export interface RecordProps {
    departmentId: string | number;
    name: React.ReactNode;
}

export type LabeledValue = ILabeledValue;
