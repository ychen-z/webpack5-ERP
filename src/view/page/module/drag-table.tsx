import React from 'react';
import { Table } from '@/components/common';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: 200
    }
];

const list = [
    {
        key: '1',
        name: '111',
        age: 32,
        address: 'New York No. 1 Lake Park'
    },
    {
        key: '2',
        name: '222',
        age: 42,
        address: 'London No. 1 Lake Park'
    },
    {
        key: '3',
        name: '333',
        age: 32,
        address: 'Sidney No. 1 Lake Park 1312312312312312331312312312312312'
    }
];

const DragSortingTable: React.FC = () => {
    return <Table.Dragable rowKey="key" columns={columns} dataSource={list} />;
};

export default DragSortingTable;
