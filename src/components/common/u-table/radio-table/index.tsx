// 单选弹框，支持反选，默认点击行也会触发选中事件
import React, { ReactText, useState } from 'react';
import { TableProps } from 'antd/lib/table';
import Table from '../base-table';

const RadioTable = (props: TableProps<IObject>) => {
    const { rowKey = 'id', rowSelection = {}, ...rest } = props;

    const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);

    const selectRow = (selectedKey: string | number, record: IObject[]) => {
        let selectKey = selectedKey === undefined || selectedRowKeys.includes(selectedKey) ? [] : [selectedKey];
        rowSelection.onChange && rowSelection.onChange(selectKey, record);
        setSelectedRowKeys(selectKey);
    };

    return (
        <Table
            rowKey={rowKey}
            onRow={record => ({
                onClick: () => {
                    selectRow(record[typeof rowKey === 'string' ? rowKey : rowKey(record)], [record]);
                }
            })}
            {...rest}
            rowSelection={{
                ...rowSelection,
                hideSelectAll: true,
                selectedRowKeys,
                onChange: (selectedKeys, selectedRows) => selectRow(selectedKeys[selectedKeys.length - 1], selectedRows)
            }}
        />
    );
};

export default RadioTable;
