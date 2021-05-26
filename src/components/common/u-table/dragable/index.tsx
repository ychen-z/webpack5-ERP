/**
 * 可拖拽table
 */
import React, { useState, useEffect } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { TableProps } from 'antd/lib/table';
import IconFont from '@/components/business/iconfont';
import Table from '../base-table';
import './index.less';

interface ITableProps extends TableProps<IObject> {
    onSort?: (from: number, to: number) => void;
}

const DragHandle = SortableHandle(() => <IconFont type="icon-drag" style={{ cursor: 'move', color: '#999' }} />);
const SortableItem = SortableElement((props: any) => <tr {...props} />);
const Container = SortableContainer((props: any) => <tbody {...props} />);

const DragTable = (props: ITableProps) => {
    const { columns = [], dataSource: originData = [], rowKey = 'id', onSort, ...rest } = props;

    const [dataSource, setDataSource] = useState<IObject[]>(originData);

    useEffect(() => {
        setDataSource(originData);
    }, [originData]);

    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
        if (oldIndex !== newIndex) {
            let list = [...dataSource];
            const [item] = list.splice(oldIndex, 1); // 截取移动项
            list.splice(newIndex, 0, item); // 将移动项插入到新位置
            setDataSource(list);
            onSort && onSort(oldIndex, newIndex);
        }
    };

    const DraggableContainer = (props: any) => <Container useDragHandle helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />;

    const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
        const index = dataSource.findIndex(x => x[typeof rowKey === 'string' ? rowKey : rowKey(x)] === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };

    const newColumns = [
        {
            title: '',
            dataIndex: 'sort',
            width: 30,
            className: 'drag-visible',
            render: () => <DragHandle />
        },
        ...columns
    ];

    return (
        <Table
            {...rest}
            rowKey={rowKey}
            dataSource={dataSource}
            columns={newColumns}
            components={{
                body: {
                    wrapper: DraggableContainer,
                    row: DraggableBodyRow
                }
            }}
        />
    );
};

export default DragTable;
