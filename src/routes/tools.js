/**
 * 路由自动化配置
 * @desc 路由自动化配置的使用方法：
 *         1、在路由表（src/router/index.ts）中配好相应的父子路由关系
 *         2、在需要使用渲染出口的父组件中使用<Routes {...props} />。（注：顶层出口需注明origin={true}）
 *
 * 一个内部方法：
 * @function SuspenseComponent 懒加载组件容器Suspense
 *
 * 三个暴露方法：
 * @function getRouteInfo 根据props，查找指定路由及其父路由信息；
 * @function getRouteLine 根据path，查找当前路由在路由表中的层级关系；
 * @function Routes 渲染出口生成
 *
 * @author heshiyu
 * @date 2019-11-25
 * @update 2020-02-27
 */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Skeleton } from 'antd';
import Loadable from 'react-loadable';
import { deepClone } from '@/utils/tools';
import allRoutes from '@/router';

const ULoading = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <Skeleton paragraph={{ rows: 24 }} active />;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    } else {
        return null;
    }
};

export const getRouteInfo = props => {
    // matchPath：当前处理的路由所对应的path（会随渲染层级改变而改变）
    // path：当前浏览器URL地址
    const [matchPath, path] = [props.match.path || '', props.location.pathname];
    const inMatchPath = matchPath === path; // 表示当前URL位于props.match.path（考虑重定向使用）
    let targetParent = { sub: [] },
        target = {};

    const _find = routes => {
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].link === matchPath) {
                targetParent = deepClone({ ...routes[i] });
                target = inMatchPath ? targetParent : (targetParent.sub || []).find(route => route.link === path);
                break;
            }
            // 若当前层不匹配，且当前路由还有下级路由，往下查找
            else if ((routes[i].sub || []).length) {
                _find(routes[i].sub);
            }
        }
    };

    _find(allRoutes);

    return { target, targetParent };
};

export const getRouteLine = path => {
    let navList = [];

    const _get = list => {
        list.forEach(item => {
            if (path.includes(item.link)) {
                navList.push(item);
                (item.sub || []).length && _get(item.sub || []);
            }
        });
    };

    _get(allRoutes);
    return navList;
};

export const Routes = props => {
    const _buildRoutes = () => {
        let routes = [], // 即将要渲染的路由表
            currentRoute, // 当前路由
            hasRedirect, // 当前路由是否带重定向
            fromApp = props.origin; // 是否为顶层App.js渲染

        // 类型1：未指定渲染的路由（用于顶层路由App.js渲染子路由）
        if (fromApp) {
            // 获取整张路由表
            routes = allRoutes;
        }
        // 类型2：已指定渲染的路由（用于组件内渲染子路由）
        else {
            let { targetParent, target } = getRouteInfo(props);

            currentRoute = target; // 取当前路由，用作生成Redirect
            hasRedirect = (currentRoute || {}).redirect;
            routes = targetParent.sub;
        }

        return [routes, currentRoute, hasRedirect];
    };

    /**
     * @author zhangz
     * @param menus 所有权限（路由及按钮）
     * @param path url 路径
     * @returns 返回当前路由菜单属性 1个或者 0 个
     */
    const getAuthMenu = (menus, path) => {
        let authMenu = [];
        authMenu = menus.concat(allRoutes.filter(item => !item.needAuth)).filter(item => item.link && path.includes(item.link) && item.status);
        return authMenu;
    };
    /**
     * @author zhangz
     * @param menus 所有权限（路由及按钮）
     * @param id 当前路由的id
     * @returns 返回当前路径下的按钮
     */
    const getAuthBtns = (menus, id) => {
        let btns = [];
        btns = menus.filter(item => item.parentId === id || item.code.includes('common')); // 约定
        btns = btns.map(item => item.code);
        return btns;
    };
    // 渲染组件
    const _renderComponent = ({ link, redirect, needAuth, component: Component }, routeProps) => {
        const { origin, auth, ...propsFromParent } = props;
        const { menus, user } = auth;
        if (!needAuth) {
            return <Component {...propsFromParent} {...routeProps} auth={auth} />;
        }
        let authMenu = getAuthMenu(menus, link || location.pathname); // 如果没有权限跳转到 403 页面
        if (authMenu.length === 0) {
            return <Redirect to="/mng/403" />;
        }

        let btns = getAuthBtns(menus, authMenu[0].id);
        return <Component {...propsFromParent} {...routeProps} auth={{ ...user, btns: btns }} />;
    };

    // 渲染路由（不设exact，约定父路由路径为子路由的前缀）
    const _renderRoute = r => <Route key={r.link} path={r.link} exact render={routeProps => _renderComponent(r, routeProps)} />;

    let [routes, currentRoute, hasRedirect] = _buildRoutes();
    let myRoutes = <Switch>{routes.map(r => _renderRoute(r))}</Switch>;
    let myRedirect = hasRedirect && <Route exact path={currentRoute.link} render={() => <Redirect to={currentRoute.redirect} push />} />;

    return (
        <Switch>
            {myRedirect}
            {myRoutes}
        </Switch>
    );
};

const _init = routes => {
    const load = loader =>
        Loadable({
            name: '',
            loader: loader,
            loading: ULoading
        });

    for (let i = 0; i < routes.length; i++) {
        // 当前路由组件为动态导入
        if (routes[i].component) {
            routes[i].component = load(routes[i].component);
        }

        // 存在子路由
        const hasChild = (routes[i].sub || []).length;
        hasChild && _init(routes[i].sub);
    }
};

_init(allRoutes);

export default Routes;
