import React, { useState, useEffect } from 'react';
import { useWindowSize } from '@/components/hooks/windowSize';
import { Modal, Button } from 'antd';

function Example() {
    const [count, setCount] = useState(200);
    const [open, setOpen] = useState(false);
    const windowSize = useWindowSize();

    // 类似于componentDidMount 和 componentDidUpdate:
    useEffect(() => {
        // 更新文档的标题
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <p>
                You clicked {count}
                times
            </p>

            <div>页面高度 {windowSize.innerHeight}</div>

            <Button type="primary" onClick={() => setOpen(true)}>
                Open Modal
            </Button>
            <button onClick={() => setCount(count + 1)}>Click me</button>

            <Modal title="new" content="bb" visible={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
}

export default Example;
