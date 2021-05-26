import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { makeSourceData } from '@/utils/tools';
import { SiderProps } from './interface';
import './index.less';

interface Props extends SiderProps {
    menus: any;
    className?: string;
    style?: React.CSSProperties;
    logo?: React.Component;
}
const { Sider } = Layout;

const renderMenuItem = (p: any) => {
    return (
        <Menu.Item key={p.code}>
            <Link to={p.link}>
                <i className={`${'icon iconfont ' + p.icon}`} style={{ marginRight: 10 }} />
                <span className="nav-text f-usn">{p.name}</span>
            </Link>
        </Menu.Item>
    );
};

const renderSubMenu = (p: any) => {
    return (
        <Menu.SubMenu
            key={p.code}
            title={
                <>
                    <i className={`${'icon iconfont ' + p.icon}`} style={{ marginRight: 10 }} />
                    <span className="nav-text f-usn">{p.name}</span>
                </>
            }
        >
            {p.children && p.children.map((item: any) => renderMenuItem(item))}
        </Menu.SubMenu>
    );
};

function SiderCustom(props: Props) {
    const { history } = props;
    const [selectedKey, setSelectedKey] = useState(location.pathname);
    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {
        setSelectedKey(location.pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const onClick = (e: any) => {
        history.push(e.key);
    };

    return (
        <Sider
            className={props.className ? 'm-sider ' + props.className : 'm-sider'}
            style={props.style}
            width={176}
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
            collapsedWidth={80}
        >
            {props.logo}
            <Menu mode="inline" selectedKeys={[selectedKey]} onClick={onClick} defaultOpenKeys={['/mng/course', '/mng/camp']}>
                {makeSourceData(props.menus || []).map((item: { children: string | any[] }) =>
                    item.children.length ? renderSubMenu(item) : renderMenuItem(item)
                )}
            </Menu>
        </Sider>
    );
}
export default withRouter(SiderCustom);
