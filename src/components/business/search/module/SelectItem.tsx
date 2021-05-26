// 下拉框类型搜索项的公共组件
import React, { Component } from 'react';
import Select from '@/components/common/u-select';

export default class SelectItem extends Component<any> {
    render() {
        const { API = {}, value, onChange } = this.props;
        return <Select getPopupContainer={() => document.getElementById('m-search') as HTMLElement} value={value} onChange={onChange} {...API} />;
    }
}
