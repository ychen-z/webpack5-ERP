/**
 * 可伸缩table
 * @description
 * 1、如果传入column在某些场景下会变动，但是table没有更新，请同时传入唯一标识key(https://codesandbox.io/s/zrj8xvyzxx?file=/src/index.js)
 * 2、组件内部会将column中每一项自动添加ellipsis属性，溢出省略保证只展示一行内容
 */
import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import { useUpdateEffect } from '@/hooks';
import { ITableProps } from '../interface';
import Table from '../base-table';
import './index.less';

const COL_MAX_WIDTH = Infinity;
const COL_MIN_WIDTH = 80;

// 可升缩节点生成器
const genaration = (Node: (props: any) => JSX.Element) => (props: any) => {
    const { onResize, width = COL_MIN_WIDTH, ...restProps } = props;

    // 列表可展开、可选择列不可伸缩
    if (['salon-table-cell salon-table-row-expand-icon-cell', 'salon-table-cell salon-table-selection-column'].includes(restProps.className)) {
        return <Node {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            handle={<span className="react-resizable-handle" onClick={e => e.stopPropagation()} />}
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <Node {...restProps} />
        </Resizable>
    );
};

const ResizableHeader = genaration((props: any) => <th {...props} />);
const ResizableBody = genaration((props: any) => <td {...props} />);

// 计算列宽
const calculateCol = (width: number) => {
    if (width < COL_MIN_WIDTH) {
        return COL_MIN_WIDTH;
    }

    if (width > COL_MAX_WIDTH) {
        return COL_MAX_WIDTH;
    }

    return width;
};

export default (props: ITableProps) => {
    const { columns, ...rest } = props;
    const [_columns, setColumns] = useState(columns);

    const handleResize = (index: number) => (e: any, { size }: { size: IObject }) => {
        setColumns(prev => {
            const nextColumns = prev ? [...prev] : [];
            nextColumns[index] = {
                ...nextColumns[index],
                width: calculateCol(size.width)
            };
            return nextColumns;
        });
    };

    const components = {
        header: {
            cell: ResizableHeader
        },
        body: {
            cell: ResizableBody
        }
    };

    useUpdateEffect(() => {
        setColumns(columns);
    }, [columns]);

    const newColumns = _columns?.map((col, index) => ({
        ellipsis: true,
        onCell: () => ({
            width: col.width,
            onResize: handleResize(index)
        }),
        onHeaderCell: () => ({
            width: col.width,
            onResize: handleResize(index)
        }),
        ...col
    }));

    // @ts-ignore
    return <Table bordered {...rest} className="m-resize-table" components={components} columns={newColumns} />;
};
