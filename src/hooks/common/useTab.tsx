/**
 * 根据路由参数定位指定tab使用hooks
 * @param { string } defaultTab 默认值
 * @param { string } navigateMode 路由跳转方式
 */
import { useState } from 'react';
import { useHistory, useUpdateEffect } from '@/hooks/index';
import { getUrlParams } from '@/utils/tools';

const Tab = 'tab'; // url参数名称
const useTab = (defaultTab: string, navigateMode?: 'push' | 'replace') => {
    const history = useHistory();
    const urlParams = getUrlParams() as IObject;
    const [currTab, setCurrTab] = useState(urlParams[Tab] || defaultTab);

    useUpdateEffect(() => {
        urlParams[Tab] && setCurrTab(urlParams[Tab]);
    }, [urlParams]);

    const onChange = (key: string) => {
        setCurrTab(key);
        let { pathname, search } = location,
            path = '';

        // url不存在参数
        if (!search) {
            path = `${pathname}?${Tab}=${key}`;
        }

        // url存在参数，但不包含参数Tab
        if (search && !search.includes(Tab)) {
            path = `${pathname}${search}&${Tab}=${key}`;
        }

        // url存在参数，且包含参数Tab
        if (search && search.includes(Tab)) {
            path = `${pathname}${search.replace(new RegExp(`${Tab}=([^&]+)`), Tab + '=' + key)}`;
        }

        history[(navigateMode = 'replace')](path);
    };

    return [currTab, onChange] as const;
};

export default useTab;
