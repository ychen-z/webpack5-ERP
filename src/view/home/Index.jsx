import React, { Component } from 'react';
import { Button } from 'antd';
import { getUserInfo } from '@/axios/api';
import styles from './index.module.less';

export default class Home extends Component {
    getData = () => {
        let param = { name: '123' };
        getUserInfo(param)
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
                <span className={styles.title}>1111111</span>
                首页
                <Button type="primary" onClick={this.getData}>
                    首页按钮
                </Button>
                <div className={styles.content}>content</div>
            </div>
        );
    }
}
