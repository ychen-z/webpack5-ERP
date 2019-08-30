import React, { Component } from 'react';
import { Layout, LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import HeaderCustom from '@/components/header/Index';
import { receiveData, fetchData } from '@/store/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from '@/routes';
// 全局组件“中文”配置
import moment from 'moment';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import zh_CN from '@/locales/zh-CN';
import en_US from '@/locales/en-US';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Content, Footer } = Layout;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en'
        };
    }

    render() {
        const { user } = this.props;
        const { language } = this.state;

        let locale;
        let messages;
        if (language === 'zh') {
            locale = 'zh';
            messages = zh_CN;
        } else if (language === 'en') {
            locale = 'en';
            messages = en_US;
        }

        return (
            <Layout>
                <IntlProvider locale={locale} messages={messages.locale}>
                    <HeaderCustom user={user || {}} />
                    <Content>
                        <LocaleProvider locale={zhCN || messages.antd}>
                            <Routes user={user} />
                        </LocaleProvider>
                    </Content>
                    <Footer className="center">2019 @react.16.8</Footer>
                </IntlProvider>
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
