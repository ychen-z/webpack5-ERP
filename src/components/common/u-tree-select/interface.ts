import { TreeSelectProps, LabeledValue } from 'antd/lib/tree-select';

export type ILabeledValue = LabeledValue;

// 别名属性
export interface IAlias {
    value: string;
    title: string;
    isLeaf: string;
    children: string;
    disabled: string;
    parentId: string;
}

export interface ITreeSelectProps extends Omit<TreeSelectProps<any>, 'loadData'> {
    maxCount?: number;
    loadData?: boolean;
    params?: IObject | undefined; // 接口查询参数
    fieldNames?: Partial<IAlias>; // 别名
    searchFn?: IFetch; // 普通查询方法;
}
