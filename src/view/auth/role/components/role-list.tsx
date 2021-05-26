import React from 'react';
import { Table } from '@/components/common';
import { useTable } from '@/hooks';
import moment from 'moment';
import { getRoleList } from '@/axios';
import HandleRole from './handle-role';
import Del from './del-icon';
import '../index.less';

// 角色列表
const RoleList = () => {
    const { tableProps, dispatch } = useTable(getRoleList, {});
    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            width: 200,
            render: (text: string) => (
                <span className="f-fwb" title={text}>
                    {text || '-'}
                </span>
            )
        },
        {
            title: '用户数',
            dataIndex: 'userCount',
            width: 100,
            sorter: true
        },
        {
            title: '角色描述',
            key: 'description',
            dataIndex: 'description',
            render: (text: string) => (
                <span title={text} className="f-toe">
                    {text || '-'}
                </span>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 180,
            sorter: true,
            render: (text: string, record: IObject) => <div>{record.createTime ? moment(record.createTime).format('YYYY-MM-DD HH:mm') : '-'}</div>
        },
        {
            title: '更新时间',
            width: 180,
            sorter: true,
            dataIndex: 'updateTime',
            render: (text: string, record: IObject) => <div>{record.updateTime ? moment(record.updateTime).format('YYYY-MM-DD HH:mm') : '-'}</div>
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            render: (text: any, record: { userCount: number; id: any; roleType: number; systemRole: boolean }) => (
                <div>
                    {!record.systemRole && <HandleRole action="edit" roleId={record.id} callback={dispatch} />}
                    {!record.systemRole && record.userCount == 0 && <Del {...record} callback={dispatch} />}
                </div>
            )
        }
    ];

    return (
        <>
            <HandleRole action="add" callback={dispatch} />
            <Table {...tableProps} columns={columns as any} />
        </>
    );
};

export default React.memo(RoleList);
