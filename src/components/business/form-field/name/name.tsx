import React from 'react';
import { Input } from 'antd';
import { INameProps } from './interface';

function Name(props: INameProps) {
    const { onBlur, ...rest } = props;

    const _onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.trim();
        onBlur && onBlur(e);
        rest.onChange && rest.onChange(e);
    };

    return <Input placeholder="请填写姓名" maxLength={100} {...rest} onBlur={_onBlur} />;
}

export default Name;
