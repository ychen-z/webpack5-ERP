import React from 'react';
import { Table } from '@/components/common';

const data = [
    {
        key: 0,
        date: '2018-02-11',
        amount: 120,
        type: 'income',
        note: 'transfer'
    },
    {
        key: 1,
        date: '2018-03-11',
        amount: 243,
        type: 'income',
        note: 'transfer'
    },
    {
        key: 2,
        date: '2018-04-11',
        amount: 98,
        type: 'income',
        note: 'transfer'
    }
];

const _columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        width: 200,
        ellipsis: true
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        width: 100
    },
    {
        title: 'Type',
        dataIndex: 'type',
        width: 100
    },
    {
        title: 'Note',
        dataIndex: 'note',
        width: 100
    },
    {
        title: 'Action',
        key: 'action',
        render: () => <a>Delete</a>
    }
];

export default () => <Table.Resizeable rowKey="key" dataSource={data} columns={_columns} />;
