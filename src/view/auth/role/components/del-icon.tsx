import React from 'react';
import { Tooltip, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useFetch } from '@/hooks';
import { delRole } from '@/axios';

function Del(props: any) {
    const { dispatch: dispatchDeleteRole } = useFetch(delRole, null, false);
    const onDel = () => {
        dispatchDeleteRole(props.id).then((data: any) => {
            props.callback();
            message.success('删除成功');
        });
    };

    return (
        <span style={{ marginLeft: '12px' }}>
            <Popconfirm key="2" title="确定删除吗?" okText="确定" cancelText="取消" onConfirm={onDel}>
                <Tooltip placement="top" title="删除角色">
                    <DeleteOutlined style={{ color: '#e6231f' }} />
                </Tooltip>
            </Popconfirm>
        </span>
    );
}

export default Del;
