import { useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import { getUserInfo, getUserMenus } from '@/axios';

// 获取用户权限信息
function useAuthInfo() {
    const [user, setUser] = useState(null);
    const [menus, setMenus] = useState(null);
    const { data: userInfo = {} } = useFetch(getUserInfo); // 1、发起请求，获取权限信息 + 用户信息
    const { data: menusInfo = [] } = useFetch(getUserMenus); // 2、获取菜单:主要看后端如何定义，是当做一个接口

    useEffect(() => {
        if (userInfo.name) {
            setUser(userInfo);
        }
    }, [userInfo]);

    useEffect(() => {
        if (menusInfo.length) {
            setMenus(menusInfo);
        }
    }, [menusInfo]);

    return { user, menus };
}
export default useAuthInfo;
