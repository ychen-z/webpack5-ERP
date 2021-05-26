import React from 'react';
import { Card, Tag } from 'antd';
import { BraftEditor } from '@/components/common';
import { FilePreview } from '@netease-ehr/base';
import ResizeTable from './module/resize-table'; // 可缩放行大小table
import DragTable from './module/drag-table'; // 可拖拽排序table
import RadioTable from './module/radio-table'; // 单选table
import Modal from './module/modal';
import Form from './module/form';

import './index.less';

function Demo() {
    return (
        <div className="m-demo">
            <Card title="可缩放行大小列表Demo">
                <ResizeTable />
            </Card>

            <Card title="单选、反选列表Demo">
                <RadioTable />
            </Card>

            <Card title="可拖拽排序列表Demo">
                <DragTable />
            </Card>

            <Card title="富文本编辑Demo">
                <BraftEditor defaultValue="<p>Hello <b>World!</b></p>" onChange={value => console.log(value)} />
            </Card>

            <FilePreview file={{ name: '这是一个pdf' }} className="aa" />

            <Card title="弹框Demo">
                <Modal />
            </Card>

            <Card title="表单Demo">
                <Form />
            </Card>

            {/* <Card title="溢出隐藏Demo">
                <div style={{ width: 200, height: 200, backgroundColor: 'red', marginBottom: 20 }}>
                    <Ellipsis>根据父元素宽度自动溢出隐藏 根据父元素宽度自动溢出隐藏 根据父元素宽度自动溢出隐藏 根据父元素宽度自动溢出隐藏</Ellipsis>
                </div>

                <div style={{ width: 200, height: 200, backgroundColor: 'red' }}>
                    <Ellipsis width={100}>自定义溢出长度-自定义溢出长度-自定义溢出长度-自定义溢出长度-自定义溢出长度</Ellipsis>
                    <Tag color="#108ee9">同行标签</Tag>
                </div>
            </Card> */}
        </div>
    );
}

export default Demo;
