import { RadioGroupProps } from 'antd/lib/radio';

// 输入框属性
export { InputProps as IInputProps } from 'antd/lib/input';

// 下拉选框属性
export { ISelectProps } from '@/components/common/u-select/interface';

// 级联选框属性
export { ICascaderProps } from '@/components/common/u-cascader/interface';

// 单选框属性
export interface IRadioGroupProps extends RadioGroupProps {
    list: IObject[];
}

// 搜索单元配置项属性
export interface ISearchUnitProps<api = IObject> {
    label?: string;
    key: string;
    content: React.ReactNode;
    alias?: string;
    span?: number;
    initialValue?: any;
    beforeShow?: (value: IObject) => boolean;
    API?: api;
}

type IConfigItemProps = Omit<ISearchUnitProps, 'key' | 'content'>;
// 搜索项组件属性
export interface ISearchProps {
    type: string;
    itemSpan?: number;
    mode?: 'manual' | 'auto';
    layout?: 'horizontal' | 'vertical';
    minRows?: number;
    config?: { [key: string]: IConfigItemProps };
    onValuesChange?: (data: IObject) => void;
    evSearch?: (data: IObject) => void;
    evReset?: () => void;
}
