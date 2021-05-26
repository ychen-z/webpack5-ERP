//@ts-nocheck

import React from 'react';
import { Card } from 'antd';
import { useTable } from '@/hooks';
import moment from 'moment';
import Search from '@/components/business/search';
import { Table } from '@/components/common';
import { getUserList } from '@/axios';
import useStaffInfo from '@/hooks/business/useStaffInfo';
import EditUser from './components/edit-user'; // 编辑用户
import './index.less';

const User = () => {
    const { searchProps, tableProps, dispatch, loading } = useTable<IObject>(getUserList, null, true);

    const columns = [
        useStaffInfo({ title: '用户' }),
        {
            title: '部门',
            dataIndex: 'departmentList',
            render: (text, record) => <span>{(text || []).map(item => item.name).join('-')}</span>
        },
        {
            title: '权限范围',
            dataIndex: 'departmentPerm',
            width: 110,
            render: (text, record) => (text ? <span>{text === 'ALL' ? '公司级' : '部门级'}</span> : '-')
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            width: 130,
            render: text => <span title={text}>{text?.name}</span>
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 160,
            render: (text, record) => <>{record.createTime ? moment(record.createTime).format('YYYY-MM-DD HH:mm') : '-'}</>
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            width: 160,
            sorter: true,
            render: (text, record) => <>{record.updateTime ? moment(record.updateTime).format('YYYY-MM-DD HH:mm') : '-'}</>
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: 130,
            render: (text, record) => (
                <EditUser
                    isEdit
                    userId={record.id} // 用户信息
                    onOk={() => dispatch()}
                />
            )
        }
    ];

    return (
        <div className="m-user">
            <Search type="xx" {...searchProps} itemSpan={6} />
            <Card bordered={false}>
                <Table columns={columns} {...tableProps} loading={loading} />
            </Card>
        </div>
    );
};

export default User;
