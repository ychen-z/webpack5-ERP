import React, { Component } from 'react';
import { Layout, LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import HeaderCustom from '@/components/header/Index';
import { receiveData, fetchData } from '@/store/action';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
// 全局组件“中文”配置
import moment from 'moment';
// import zhCN from 'antd/lib/locale-provider/zh_CN';
import zh_CN from './locales/zh-CN';
import en_US from './locales/en-US';
import 'moment/locale/zh-cn';
// import { TimeRangePicker } from 'ats-antd';

moment.locale('zh-cn');

const { Content, Footer } = Layout;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en',
            value: {
                type: 'CUSTOMIZE',
                ranges: [1533081600000, 1534377600000]
            }
        };
    }

    _handleChange = value => {
        console.log(`You're selection is ${JSON.stringify(value)}`);
        this.setState({
            value
        });
    };

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
                        <LocaleProvider locale={messages.antd}>
                            <Routes user={user} />
                        </LocaleProvider>
                    </Content>
                    {/* <TimeRangePicker
                        value={this.state.value}
                        onChange={this._handleChange}
                        disabledDate={current =>
                            current &&
                            current >
                                moment()
                                    .endOf('day')
                                    .subtract(1, 'days')
                        }
                    /> */}
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
)(hot(App));
