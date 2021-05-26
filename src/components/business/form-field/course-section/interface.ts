export interface IFormItemProps extends IFieldProps {
    label?: React.ReactNode;
    name: string;
    required?: boolean;
    wrapperCol?: IObject;
}

export interface IFieldProps {
    value?: RecordProps[];
    onChange?: (value: RecordProps[]) => void;
}

export interface RecordProps {
    id?: number; // 章节主键ID
    name: string;
    type: string;
    duration: string;
    description: string;
    sort: number;
    cover: IFile;
    file: IFile;
}
