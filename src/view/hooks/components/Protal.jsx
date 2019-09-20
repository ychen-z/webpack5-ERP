import React from 'react';
import { createPortal } from 'react-dom';

const Protal = props => {
    return <>{createPortal(props.children, document.body)}</>;
};

const Index = () => {
    return (
        <div>
            这里是protal元素位置
            <Protal>我是protal元素包裹的内容</Protal>
        </div>
    );
};

export default Index;
