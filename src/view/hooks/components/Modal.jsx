import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const Modals = props => {
    const [visible, setState] = useState(false);
    return (
        <>
            <span onClick={() => setState(true)}>{props.children ? props.children : <Button>点击打开弹窗</Button>}</span>
            <Modal title="Basic Modal" visible={visible} onOk={() => setState(false)} onCancel={() => setState(false)}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default Modals;
