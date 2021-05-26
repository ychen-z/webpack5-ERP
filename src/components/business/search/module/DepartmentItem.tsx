// 级联类型搜索项的公共组件
import React, { Component } from 'react';
import Department from '@/components/business/form-field/department/department';

export default class DepartmentItem extends Component<any> {
    render() {
        const { API = {}, value, onChange } = this.props;
        return <Department getPopupContainer={() => document.getElementById('m-search') as HTMLElement} value={value} onChange={onChange} {...API} />;
    }
}
