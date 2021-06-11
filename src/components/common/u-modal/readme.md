### 使用demo

```

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


```


### 场景使用

```
import React from 'react';
import { Form } from 'antd';
import { Modal, Select } from '@/components/common';
import { useFetch } from '@/hooks';
import { postIdpTutors } from '@/axios';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
};

interface Props {
    homeworkConfigId: number;
    record: IObject; 
    onOk: Function;
    children?: React.ReactNode;
}

const ArrangeTutors = (props: Props) => {
    const { homeworkConfigId, record = {}, children, onOk } = props;
    const { id, name, jobNumber, tutorList } = record;
    const { dispatch, isLoading } = useFetch(postIdpTutors, null, false);
    const [form] = Form.useForm();

    // 提交表单信息
    const onSubmit = (values: IObject) =>
        dispatch({ enrollId: id, homeworkConfigId, jobNumberList: values.jobNumberList?.map((item: IObject) => item.jobNumber) }).then(() => onOk());

    return (
        <Modal
            title={tutorList?.length ? '更换导师' : '安排导师'}
            triggerDom={children ? children : tutorList?.length ? <a>更换导师</a> : <a>安排导师</a>}
            form={form}
            onOk={onSubmit}
            confirmLoading={isLoading}
        >
            <Form form={form} autoComplete="off" {...layout}>
                <Form.Item label="学员">
                    <span>
                        {name}({jobNumber})
                    </span>
                </Form.Item>
                <Form.Item
                    name="jobNumberList"
                    label="导师姓名/工号"
                    rules={[{ required: true, message: '请输入导师姓名/工号' }]}
                    initialValue={tutorList}
                >
                    <Select.Employee mode="multiple" placeholder="请输入导师姓名/工号" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ArrangeTutors;

```



