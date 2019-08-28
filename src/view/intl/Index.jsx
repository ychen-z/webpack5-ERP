import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Table } from 'antd';
import Example from '@/components/example';
import { getLoginInfo } from '@/axios/api';

class Home extends Component {
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
        let { intl } = this.props;
        return (
            <div className="m-home">
                首页
                <Button type="primary" onClick={this.getData}>
                    首页按钮
                </Button>
                <div>{intl.messages['page.localeProvider.react']}</div>
                <div>{intl.formatMessage({ id: 'page.localeProvider.react' }, { name: '2' })}</div>
                <Table />
                <Example />
            </div>
        );
    }
}

export default injectIntl(Home);
