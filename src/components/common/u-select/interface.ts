import { SelectValue, SelectProps, LabeledValue } from 'antd/lib/select';

export type ILabeledValue = LabeledValue;

export type ISelectValue = SelectValue;

// 别名属性
export interface IAlias {
    id: string;
    name: string;
    exactCode: string; // 精确查询入参，默认ids
    slurCode: string; // 模糊查询入参，默认name
    dataCode: string; // 接口返回数据取值名称
}

export interface ISelectProps extends Omit<SelectProps<SelectValue>, 'onChange'> {
    maxCount?: number; // 最大显示个数，超出toast提示；
    params?: any; // 接口查询参数
    fieldNames?: Partial<IAlias>; // 别名
    extra?: string; // 额外项，针对下拉选项中“请选择”、“不限”这种无实际意义的下拉选项；
    list?: IObject[];
    searchFn?: IFetch; // 普通查询方法;
    slurSearchFn?: IFetch; // 模糊查询方法；
    render?: (list: IObject[]) => React.ReactNode; // 自定义渲染下拉列表
    onChange?: (value: SelectValue, option: any, selectItem: IObject | IObject[]) => void;
}
