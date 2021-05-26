interface FieldValue {
    identityTypeEnum?: string;
    identityNo?: string;
}

export interface IFieldProps {
    value?: FieldValue;
    onChange?: (value: FieldValue) => void;
}

export interface IFormItemProps extends IFieldProps {
    label?: React.ReactNode;
    name: string;
    required?: boolean;
}
