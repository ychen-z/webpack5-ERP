// 单选框框类型搜索项的公共组件
import React, { Component } from 'react';
import { Radio } from 'antd';

export default class RadioItem extends Component<any> {
    render() {
        const { API = {}, value, onChange } = this.props;
        const { list = [], ...rest } = API;
        return (
            <Radio.Group onChange={onChange} value={value} {...rest}>
                {list.map((item: IObject) => (
                    <Radio value={item.id} key={item.id}>
                        {item.name}
                    </Radio>
                ))}
            </Radio.Group>
        );
    }
}
