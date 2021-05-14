/**
 * 前端分页hooks
 * @param { object } defaultPagination 默认分页信息
 * @param { object } dataSource 数据源
 *
 * @return { currentData, pagination, search }
 * currentData: 当前分页数据
 * pagination: 分页信息 包含totalPages, total, page, pageSize
 * search: function 触发修改分页信息方法
 */

import { useRef, useEffect, useState } from 'react';

interface PageInfo {
    page: number;
    pageSize: number;
}

interface AllPageInfo extends PageInfo {
    totalPages: number;
    total: number;
}

const usePagination = (dataSource: IObject[] = [], defaultPagination: PageInfo = { page: 1, pageSize: 8 }) => {
    const [currentData, setCurrentData] = useState<IObject[]>([]);
    let pageInfo = useRef<AllPageInfo>({
        ...defaultPagination,
        totalPages: Math.ceil(dataSource.length / defaultPagination.pageSize),
        total: dataSource.length
    });
    const search = (info?: IObject) => {
        info &&
            (pageInfo.current = {
                ...pageInfo.current,
                ...info,
                totalPages: Math.ceil(dataSource.length / pageInfo.current.pageSize)
            });
        const { page, pageSize } = pageInfo.current;
        setCurrentData(dataSource.slice((page - 1) * pageSize, page * pageSize));
    };
    useEffect(() => {
        pageInfo.current = {
            ...pageInfo.current,
            page: 1,
            total: dataSource.length,
            totalPages: Math.ceil(dataSource.length / pageInfo.current.pageSize)
        };
        search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(dataSource)]);

    const pagination = pageInfo.current;

    return { currentData, pagination, search };
};

export default usePagination;
