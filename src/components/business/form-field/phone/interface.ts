export interface IFormItemProps extends IFieldProps {
    label?: React.ReactNode;
    name: string;
    required?: boolean;
}

interface FieldValue {
    phoneType?: string;
    phone?: string;
}

export interface IFieldProps {
    value?: FieldValue;
    onChange?: (value: FieldValue) => void;
}
