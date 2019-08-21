import React, { Component } from 'react';
import { Button } from 'antd';
import Example from '@/components/example';
import { getLoginInfo } from '@/axios/api';

export default class Home extends Component {
    getData = () => {
        let param = { name: '123' };
        getLoginInfo(param)
            .then(data => console.log(data, 456))
            .catch(err => console.log(err, 123));
    };

    render() {
        return (
            <div>
                首页
                <Button type="primary" onClick={this.getData}>
                    首页按钮
                </Button>
                <Example />
            </div>
        );
    }
}
