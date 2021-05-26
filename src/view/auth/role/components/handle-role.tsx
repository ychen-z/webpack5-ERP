import React, { useState, useCallback } from 'react';
import { message, Drawer, Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useFetch } from '@/hooks';
import { getMenus, getRoleByRoleId } from '@/axios';
import { MenuItem } from '@/axios/interface';
import RolePannel from './role-pannel';

interface PannelProps {
    action: 'add' | 'edit'; // 新增 | 编辑
    roleId?: any;
    callback: () => void;
}

const Pannel = (props: PannelProps) => {
    const [visible, setVisible] = useState(false);
    const [menusData, setMenusData] = useState<MenuItem[]>([]);
    const [roleInfo, setRoleInfo] = useState({});

    const { dispatch: dispatchMenus } = useFetch<MenuItem[]>(getMenus, null, false);
    const { dispatch: dispatchGetRoleByRoleId } = useFetch(getRoleByRoleId, null, false);

    const callback = useCallback(
        (isClose: boolean) => {
            isClose && props.callback();
            setVisible(false);
        },
        [props]
    );

    // 获取系统菜单；
    const getTreeData = useCallback(() => {
        dispatchMenus()
            .then((res: any) => {
                setMenusData(res);
            })
            .catch(res => {
                message.warn('getTreeData');
            });
    }, [dispatchMenus]);

    // 根据角色id
    // 获取有权限的菜单
    const getRoleMenus = useCallback(() => {
        dispatchGetRoleByRoleId(props.roleId)
            .then((res: any) => {
                setRoleInfo(res); // 设置角色信息
            })
            .catch((res: any) => {
                message.warn('获取有权限的菜单失败');
            });
    }, [dispatchGetRoleByRoleId, props.roleId]);

    //新增按钮
    const onAdd = useCallback(() => {
        // 获取角色列表
        setVisible(true);
        getTreeData();
    }, [getTreeData]);

    //编辑按钮
    const onEdit = useCallback(() => {
        // 获取角色列表
        setVisible(true);
        getTreeData();
        getRoleMenus();
    }, [getRoleMenus, getTreeData]);

    return (
        <>
            {props.action === 'edit' && (
                <Tooltip placement="top" title="编辑">
                    <EditOutlined onClick={onEdit} style={{ color: '#1782e6' }} />
                </Tooltip>
            )}
            {props.action === 'add' && (
                <Button type="primary" style={{ marginTop: '12px', marginBottom: '12px' }} onClick={onAdd}>
                    + 新建角色
                </Button>
            )}

            {visible && (
                <Drawer maskClosable={false} placement="right" closable={false} width={800} onClose={() => setVisible(false)} visible>
                    <RolePannel treeData={menusData} roleInfo={roleInfo} callback={callback} action={props.action} />
                </Drawer>
            )}
        </>
    );
};

export default Pannel;
