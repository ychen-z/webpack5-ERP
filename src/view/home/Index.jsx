import React, { Component } from 'react';
import { Button } from 'antd';
import Example from '@/components/example';
import { getLoginInfo } from '@/axios/api';

export default class Home extends Component {
    getData = () => {
        let param = { name: '123' };
        getLoginInfo(param)
            .then(data => {
                console.log(data, 456);
            })
            .catch(err => {
                // 原有的“data.code === 400”逻辑改为在此处进行
                if (err.code === 400) {
                    console.log('执行400的逻辑');
                }
            });
    };

    render() {
        return (
            <div className="m-home">
                首页
                <Button type="primary" onClick={this.getData}>
                    首页按钮
                </Button>
                <Example />
            </div>
        );
    }
}
