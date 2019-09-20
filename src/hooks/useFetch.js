/**
 * 数据请求hooks
 * @author 施阳 2019-9-20
 * @return {data, isLoading, dispatch}
 * data： 请求结果
 * isLoading：true-请求中 false-请求结束
 * dispatch：手动触发请求
 */
import { useState, useEffect } from 'react';

/**
 * @param {fuction} url 请求方法
 * @param {*} params 请求参数
 * @param {*} isImmediately 是否立即执行
 */
const useFetch = (url, params, isImmediately = true) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // 接口请求
    const fetch = (url, params) => {
        setIsLoading(true);

        return new Promise((resolve, reject) => {
            url(params)
                .then(data => {
                    setData(data);
                    resolve(data);
                })
                .catch(err => {
                    setData(err);
                    reject(err);
                })
                .finally(() => setIsLoading(false));
        });
    };

    /**
     * 手动触发接口请求
     * @param {obj} value 手动触发请求时可直接传入请求参数，否则取默认参数
     */
    const dispatch = (value = params) => fetch(url, value);

    useEffect(() => {
        isImmediately && fetch(url, params);
    }, [params, url, isImmediately]);

    return { data, isLoading, dispatch };
};

export default useFetch;
