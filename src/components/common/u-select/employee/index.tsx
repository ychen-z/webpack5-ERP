import React from 'react';
import { getEmployeeList } from '@/axios';
import Select from '../index';
import { ISelectProps, ILabeledValue } from '../interface';

interface DeptProps {
    departmentId: number;
    name: string;
}

interface EmployeeProps {
    jobNumber: string;
    name: string;
    departmentList: DeptProps[];
}

interface Props extends Omit<ISelectProps, 'value' | 'defaultValue'> {
    value?: EmployeeProps | EmployeeProps[];
    defaultValue?: EmployeeProps | EmployeeProps[];
}

const Employee = (props: Props) => {
    // 定制回填内容
    const getLableStr = (item: EmployeeProps) => `${item.name} | ${item.jobNumber}`;
    const getShowLableStr = (item: EmployeeProps) =>
        `${item.name} | ${item.jobNumber} | ${(item.departmentList || []).map(key => key.name).join('-')}`;

    // 格式化传入的value值
    const formatInputValue = (value: EmployeeProps | EmployeeProps[] | undefined) => {
        if (!value) return value;
        if (Array.isArray(value)) {
            return value.map(item => ({
                label: getLableStr(item),
                value: item.jobNumber
            }));
        }
        return {
            label: getLableStr(value),
            value: value.jobNumber
        };
    };

    // 格式化传出的value值
    const formatOutputValue = (value: ILabeledValue | ILabeledValue[]) => {
        if (Array.isArray(value)) {
            return value.map(item => ({
                jobNumber: item.value,
                name: (item.label as string).split('|')[0].trim()
            }));
        }
        return {
            jobNumber: value.value,
            name: (value.label as string).split('|')[0].trim()
        };
    };

    const onChange = (value: ILabeledValue | ILabeledValue[], option: any, item: any) => {
        const { onChange } = props;
        // @ts-ignore
        onChange && onChange(formatOutputValue(value), option, item);
    };

    return (
        <Select
            {...props}
            value={formatInputValue(props.value || props.defaultValue)}
            // @ts-ignore
            onChange={onChange}
            labelInValue
            placeholder="请输入员工姓名或工号"
            filterOption={false}
            slurSearchFn={getEmployeeList}
            optionLabelProp="label"
            fieldNames={{ id: 'jobNumber' }}
            render={list =>
                (list as EmployeeProps[]).map(item => (
                    <Select.Option key={item.jobNumber} value={item.jobNumber} label={getLableStr(item)} title={getShowLableStr(item)}>
                        {getShowLableStr(item)}
                    </Select.Option>
                ))
            }
        />
    );
};

export default Employee;
