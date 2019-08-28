import React, { Component } from 'react';
import { Layout, LocaleProvider } from 'antd';
import HeaderCustom from '@/components/header/Index';
import { receiveData, fetchData } from '@/store/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
// 全局组件“中文”配置
import moment from 'moment';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Content, Footer } = Layout;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user } = this.props;
        return (
            <Layout>
                <HeaderCustom user={user || {}} />
                <Content>
                    <LocaleProvider locale={zhCN}>
                        <Routes user={user} />
                    </LocaleProvider>
                </Content>
                <Footer className="center">2019 @react.16.8</Footer>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const { user = {} } = state.httpData;
    return { user };
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
