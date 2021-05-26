// 输入框类型搜索项的公共组件
import React, { Component } from 'react';
import { Input } from 'antd';

export default class InputItem extends Component<any> {
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange, API = {} } = this.props;
        API.type === 'number' && (e.target.value = e.target.value.replace(/[^\d]+/g, ''));
        onChange && onChange(e.target.value);
    };

    render() {
        const { API = {}, value, handleSearch } = this.props;
        return <Input placeholder="请输入" maxLength={200} {...API} type="text" onChange={this.onChange} value={value} onPressEnter={handleSearch} />;
    }
}
