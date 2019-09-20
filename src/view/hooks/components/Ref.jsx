import React, { useEffect, createRef } from 'react';
import { Input } from 'antd';

const inputRef = createRef(null);
const Ref = () => {
    useEffect(() => {
        console.log(inputRef);
        inputRef.current.focus();
    });
    return <Input type="text" ref={inputRef} />;
};

export default Ref;
