import React from 'react';
import { Input } from 'antd';
import { emptyAll } from '@/utils/tools';
import { IFieldProps } from './interface';

function Email(props: IFieldProps) {
    const { onChange, ...rest } = props;

    const _onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.value = emptyAll(e.target.value).toLocaleLowerCase();
        onChange && onChange(e);
    };

    return <Input placeholder="请填写邮箱" maxLength={100} {...rest} onBlur={_onBlur} onChange={onChange} />;
}

export default Email;
