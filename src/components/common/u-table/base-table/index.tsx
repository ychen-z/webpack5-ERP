/**
 * @description
 * 作为业务层与antd Table组件之间的封装层，我们可以在这里根据系统内业务场景定制化一些需求，比如：
 * 1、场景1：列表内容默认单行展示，展示不下时溢出省略，故每个字段默认添加 ellipsis: true 属性；
 * 2、场景2：列表字段通过接口数据渲染时，往往字段为null，此时需要有一个字段为空时的占位符显示，默认为’-‘；
 * 3、场景3：当列表分页器显示“最小”版时，默认不展示快速跳转、条数控制属性；
 * 4、场景4：系统层面需要每次table刷新时勾选状态清空，那我们可以在这一层处理选中状态的受控逻辑，而不需要在业务层重复劳动；
 */
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { ITableProps } from '../interface';
import Resizeable from '../resizeable'; // 可拖拽控制列宽table
import Dragable from '../dragable'; // 可拖拽排序table
import Radio from '../radio-table'; // 单选table

const PLACEHOLDER = '-'; // 当数据为空时的占位符
const RefTable = (props: ITableProps) => {
    const { columns = [], placeholder = PLACEHOLDER, pagination, rowSelection, style, loading, ...rest } = props;

    /**
     * 为columns添加一些公共属性，避免在业务层每次使用时都要添加
     * 1、场景1：列表内容单行展示，展示不下时溢出省略，故每个字段默认添加 ellipsis: true 属性；
     * 2、场景2：列表字段通过接口数据渲染时，往往字段为null，此时需要有一个字段为空时的占位符显示，默认为’-‘；
     */
    const newColumns = columns.map(col => ({
        ellipsis: true,
        render: (text: any) => text ?? placeholder,
        ...col
    }));

    /**
     * 对于可选择table，系统层面需要每次table刷新时勾选状态清空
     * 以loading字段作为依据，通过状态来判断列表是否刷新（若业务层列表刷新未传入loading字段时则需要在上层手动处理列表选中状态的受控逻辑）
     */
    const { selectedRowKeys, onChange } = rowSelection || {};
    const [rowKeys, setRowKeys] = useState(selectedRowKeys);

    const _rowSelection = rowSelection
        ? {
              ...rowSelection,
              ...(rowKeys ? { selectedRowKeys: rowKeys } : {}),
              onChange: (selectedRowKeys: any, selectedRows: any) => {
                  setRowKeys(selectedRowKeys);
                  onChange && onChange(selectedRowKeys, selectedRows);
              }
          }
        : undefined;

    useEffect(() => {
        setRowKeys(selectedRowKeys);
    }, [selectedRowKeys]);

    useEffect(() => {
        if (loading) {
            setRowKeys([]);
            onChange && onChange([], []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    // 当分页器显示“最小”版时，默认不展示快速跳转、条数控制属性
    const _pagination = pagination
        ? pagination.size === 'small'
            ? {
                  ...pagination,
                  showQuickJumper: false,
                  showSizeChanger: false
              }
            : pagination
        : false;

    return (
        <Table
            rowKey="id"
            showSorterTooltip={false}
            getPopupContainer={triggerNode => document.getElementsByClassName('salon-table')[0] as HTMLElement}
            loading={loading}
            rowSelection={_rowSelection}
            {...rest}
            style={{ ...style, transform: 'scale(1)' }} // HACK: chrome浏览器89.0.4389.90（正式版本） (arm64)导致table列表在100%缩放比例下有些列不显示
            columns={newColumns}
            pagination={_pagination}
        />
    );
};

RefTable.Resizeable = Resizeable;
RefTable.Dragable = Dragable;
RefTable.Radio = Radio;
export default RefTable;
