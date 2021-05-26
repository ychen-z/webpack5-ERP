import { TableProps } from 'antd/lib/table';

export interface ITableProps extends TableProps<IObject> {
    placeholder?: React.ReactNode;
}
