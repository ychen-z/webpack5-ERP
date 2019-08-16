import React, { Component } from 'react';
import { Button } from 'antd';
import Example from '@/components/example';

export default class Home extends Component {
    render() {
        return (
            <div>
                首页 <Button type="primary">首页按钮</Button>
                <Example />
            </div>
        );
    }
}
