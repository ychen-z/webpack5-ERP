/**
 * 数据请求hooks
 * @return {data, isLoading, dispatch}
 * data： 请求结果
 * isLoading：true-请求中 false-请求结束
 * dispatch：手动触发请求
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { ResponseConfig } from '@/axios/interface';

export interface UseFetchResult<R> {
    data: R | undefined;
    error: ResponseConfig<R> | undefined;
    isLoading: boolean;
    dispatch: (params?: any) => Promise<R>;
}
/**
 * @param {function} url 请求方法
 * @param {obj} params 请求参数
 * @param {bool} isImmediately 是否立即执行
 */
function useFetch<R>(url: IFetch<R>, params?: any, isImmediately = true): UseFetchResult<R> {
    const [data, setData] = useState<R | undefined>();
    const [error, setError] = useState<ResponseConfig<R>>();
    const [isLoading, setIsLoading] = useState(false);
    const cacheParams = useRef(params);

    // 缓存参数
    useEffect(() => {
        cacheParams.current = params;
    }, [params]);

    // 接口请求
    const fetch = (url: IFetch<R>, params?: any): Promise<R> => {
        setIsLoading(true);
        return new Promise((resolve, reject) => {
            url &&
                url(params)
                    .then((data: R) => {
                        setData(data);
                        resolve(data);
                    })
                    .catch((err: ResponseConfig<R>) => {
                        setData(undefined);
                        setError(err);
                        err && reject(err);
                    })
                    .finally(() => setIsLoading(false));
        });
    };

    /**
     * 手动触发接口请求
     * @param {obj} value 手动触发请求时可直接传入请求参数，否则取默认参数
     */
    const dispatch = useCallback((value = cacheParams.current) => fetch(url, value), [url]);

    useEffect(() => {
        isImmediately && fetch(url, cacheParams.current);
    }, [isImmediately, url]);

    return { data, error, isLoading, dispatch };
}

export default useFetch;
