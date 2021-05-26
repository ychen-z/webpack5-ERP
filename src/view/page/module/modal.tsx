import React, { useState } from 'react';
import { Button } from 'antd';
import { Modal } from '@/components/common';
import { getAreaList } from '@/axios';

export default () => {
    const [visible, setVisible] = useState(false);
    const onOk = () =>
        new Promise(resolve => {
            setVisible(true);
            resolve(null);
        });

    const beforeShow = async () => {
        await getAreaList().then(() => {
            return Promise.reject();
        });
    };

    return (
        <>
            <Modal title="弹框A" triggerDom={<Button type="primary">普通弹框</Button>} />

            <Modal title="弹框B" triggerDom={<Button type="primary">确定时唤起弹框</Button>} onOk={() => setVisible(true)} />

            <Modal title="弹框C" visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} />

            <Modal title="弹框D" triggerDom={<Button type="primary">确定时唤起弹框并关闭当前弹框</Button>} onOk={onOk} />

            <Modal title="弹框E" triggerDom={<Button type="primary">异步控制弹框显隐</Button>} beforeShow={beforeShow} />

            <Modal title="弹框F" triggerDom={<Button type="primary">同步控制弹框显隐</Button>} beforeShow={() => false} />
        </>
    );
};
