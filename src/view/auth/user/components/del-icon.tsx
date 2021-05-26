import React from 'react';
import { Tooltip, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import useFetch from '@/hooks/common/useFetch';
import { delUser } from '@/axios';

function Del(props: any) {
    const { dispatch: dispatchDeleteUser } = useFetch(delUser, null, false);
    const onDel = () => {
        dispatchDeleteUser(props.userId).then((data: any) => {
            props.callback();
            message.success('删除成功');
        });
    };

    return (
        <Popconfirm key="2" title="确定删除吗?" okText="确定" cancelText="取消" onConfirm={onDel}>
            <Tooltip placement="top" title="删除用户">
                <DeleteOutlined style={{ color: '#e6231f' }} />
            </Tooltip>
        </Popconfirm>
    );
}

export default Del;
