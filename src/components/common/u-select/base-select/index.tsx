/**
 * 以下API为在Select组件原有API基础上扩展出的API，方便结合业务使用
 * @param {number} maxCount 多选时最大显示个数，超出toast提示；
 * @param {string} extra 额外项，针对下拉选项中“请选择”、“不限”这种无实际意义的下拉选项；
 * @param {function} slurSearchFn 模糊查询方法
 * @param {object} params 查询参数
 * @param {function} searchFn 普通查询方法
 * @param {object} fieldNames 别名
 */
import React, { useEffect, useState } from 'react';
import { Select, Spin, message } from 'antd';
import { useDebounce, useUpdateEffect } from '@/hooks';
import { includeEn, empty, emptyAll, isObject } from '@/utils/tools';
import { IAlias, ISelectProps } from '../interface';
import Employee from '../employee';

message.config({
    maxCount: 1
});

const { Option } = Select;

const FIELD_NAMES: IAlias = {
    id: 'id',
    name: 'name',
    exactCode: 'ids',
    slurCode: 'keyWords',
    dataCode: '' // 接口返回参数取值路径
}; // 别名
const EXTRA_VALUE = ''; // 额外项的默认id

const RefSelect = (props: ISelectProps) => {
    const {
        extra,
        children,
        list,
        fieldNames,
        params,
        maxCount,
        value,
        defaultValue,
        render,
        searchFn,
        slurSearchFn,
        onSearch,
        onChange,
        ...rest
    } = props;
    const alias = { ...FIELD_NAMES, ...fieldNames }; // 别名
    const [currValue, setCurrValue] = useState(value || defaultValue);
    const [optionList, setOptionList] = useState(list || []);
    const [loading, setLoading] = useState(false);

    useUpdateEffect(() => {
        setCurrValue(value);
    }, [value]);

    useUpdateEffect(() => {
        setOptionList(list || []);
    }, [list]);

    // 获取下拉列表
    useEffect(() => {
        if (!searchFn) return;
        setLoading(true);
        searchFn(params)
            .then(list => setOptionList(list))
            .finally(() => setLoading(false));
    }, [params, searchFn]);

    // 模糊查询
    const onSlurSearch = (value: string) => {
        if (!slurSearchFn) return;
        setLoading(true);
        slurSearchFn({ [alias.slurCode]: value, ...params })
            .then(data => setOptionList(alias.dataCode ? data[alias.dataCode] : data))
            .finally(() => setLoading(false));
    };

    const _onSearch = useDebounce((value: string) => {
        value = includeEn(value) ? empty(value) : emptyAll(value);
        if (!value) return;
        onSlurSearch(value);
        onSearch && onSearch(value);
    });

    const _onChange = (value: any, option: any) => {
        const _isArray = Array.isArray(value);
        const _isObject = isObject(value);

        // 校验最大长度
        if (maxCount && _isArray && value.length > maxCount) {
            message.warning(`最多选择${maxCount}个`, 2);
            return;
        }

        // 提取选中项
        let item = (optionList || []).filter((item: IObject) =>
            _isArray ? value.includes(item[alias.id]) : _isObject ? item[alias.id] === value.value : item[alias.id] === value
        );

        setCurrValue(value);
        onChange && onChange(value, option, _isArray ? item : item[0]);
    };

    return (
        <Select
            placeholder="请选择"
            style={{ width: '100%' }}
            notFoundContent={loading ? <Spin size="small" /> : '暂无数据'}
            getPopupContainer={triggerNode => triggerNode.parentNode}
            loading={loading}
            showSearch
            filterOption={(input, option) =>
                !!option && typeof option.children === 'string' && option.children.toLowerCase().includes(input.toLowerCase())
            }
            onSearch={_onSearch}
            {...rest}
            value={currValue}
            onChange={_onChange}
        >
            {extra && (
                <Option value={EXTRA_VALUE} key={extra}>
                    {extra}
                </Option>
            )}

            {children
                ? children
                : render
                ? render(optionList)
                : optionList.map((item: IObject) => (
                      <Option key={item[alias.id]} value={item[alias.id]} title={item[alias.name]}>
                          {item[alias.name]}
                      </Option>
                  ))}
        </Select>
    );
};

RefSelect.Option = Option;
RefSelect.Employee = Employee;

export default RefSelect;
