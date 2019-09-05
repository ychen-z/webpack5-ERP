import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

const useWindowSize = () => {
    const getSize = () => ({
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth
    });

    const [windowSize, setSize] = useState(getSize());
    useEffect(() => {
        window.addEventListener('resize', () => setSize(getSize()));
        return () => window.removeEventListener('resize', () => setSize(getSize()));
    }, []);

    return windowSize;
};

const Index = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <div>页面高度：{useWindowSize().innerHeight}</div>
            <Button onClick={() => setCount(count + 1)}>点击了{count}次</Button>
        </>
    );
};

export default Index;
