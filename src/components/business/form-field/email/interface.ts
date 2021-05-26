export interface IFormItemProps extends IFieldProps {
    label?: React.ReactNode;
    name: string;
    required?: boolean;
}

export interface IFieldProps {
    disabled?: boolean;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
