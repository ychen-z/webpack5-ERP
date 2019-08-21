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

const { Content } = Layout;
// const { Content, Footer } = Layout;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user } = this.props;
        return (
            <Layout style={{ flexDirection: 'column' }}>
                <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={user || {}} />
                <Content style={{ overflow: 'initial', flex: '1 1 0' }}>
                    <LocaleProvider locale={zhCN}>
                        <Routes user={user} />
                    </LocaleProvider>
                </Content>
                {/* <Footer
                    style={{
                        textAlign: 'center',
                        background: '#333',
                        height: '120px',
                        color: '#fff'
                    }}
                    className="center"
                ></Footer> */}
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
