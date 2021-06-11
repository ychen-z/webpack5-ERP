### 使用指南
 
 #### Table.Radio
 
```
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

export default () => <Table.Radio rowKey="key" dataSource={data} columns={_columns} />;

```


#### dragableTable

```
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

```
#### radio-table

```
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

export default () => <Table.Radio rowKey="key" dataSource={data} columns={_columns} />;

```
#### resize-table

```
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

```


