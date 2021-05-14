import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { receiveData, fetchData } from '@/store/action';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderCustom from '@/components/header/Index';
import { useLanguage } from '@/hooks/common/useLanguage';
import Routes from './routes';
// 全局组件“中文”配置
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const { Content, Footer } = Layout;

function App(props) {
    const { user } = props;
    const [locale, messages] = useLanguage('zh');

    return (
        <ConfigProvider locale={messages.antd} prefixCls="pre">
            <Layout>
                <IntlProvider locale={locale} messages={messages.locale}>
                    <HeaderCustom user={user || {}} />
                    <Content>
                        <Routes user={user} />
                    </Content>
                    <Footer className="center">2019 @react 16.9.0</Footer>
                </IntlProvider>
            </Layout>
        </ConfigProvider>
    );
}

const mapStateToProps = state => {
    const { user = {} } = state.httpData;
    return { user };
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(hot(App));
