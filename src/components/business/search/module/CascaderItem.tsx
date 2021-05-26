// 级联类型搜索项的公共组件
import React, { Component } from 'react';
import Cascader from '@/components/common/u-cascader';

export default class CascaderItem extends Component<any> {
    render() {
        const { API = {}, value, onChange } = this.props;
        return <Cascader getPopupContainer={() => document.getElementById('m-search') as HTMLElement} value={value} onChange={onChange} {...API} />;
    }
}
