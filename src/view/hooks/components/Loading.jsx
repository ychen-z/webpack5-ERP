import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { getUserInfo } from '@/axios/api';
import useFetch from '@/hooks/useFetch';

const Loading = () => {
    // 传统数据请求方式
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const onClick = () => {
        setLoading(true);
        setTimeout(() => {
            getUserInfo()
                .then(data => {
                    setLoading(false);
                    setData(data);
                })
                .catch(err => {
                    setLoading(false);
                    setData(err);
                });
        }, 1000);
    };

    // 接口、参数变更自动请求接口（立即执行）
    const [params, setParams] = useState({});
    const { isLoading: isLoading1, data: data1 } = useFetch(getUserInfo, params);

    // 手动触发请求
    const { isLoading: isLoading2, dispatch, data: data2 } = useFetch(getUserInfo, {}, false);
    const onSubmit = () => {
        dispatch({ id: 1 })
            .then(res => console.log(res))
            .catch(res => {
                if (res.code === 400) {
                    Modal.confirm({
                        title: 'Do you Want to delete these items?',
                        content: 'Some descriptions',
                        onOk: () => {
                            dispatch({ id: 2 });
                        }
                    });
                }
            });
    };

    return (
        <>
            <Button onClick={onClick} loading={loading}>
                传统请求方式（用户信息）
            </Button>
            <div>{JSON.stringify(data, null, 4)}</div>

            <Button loading={isLoading1} onClick={() => setParams({ id: Math.random() })}>
                参数变更请求（用户信息）
            </Button>
            <div>{JSON.stringify(data1, null, 4)}</div>

            <Button loading={isLoading2} onClick={onSubmit}>
                手动触发请求（用户信息）
            </Button>
            <div>{JSON.stringify(data2, null, 4)}</div>
        </>
    );
};

export default Loading;
