import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { fetchData } from '@/store/action/index';

const { Header } = Layout;

class HeaderCustom extends Component {
    state = {};

    logout = () => {};

    render() {
        return <Header className="custom-theme"></Header>;
    }
}

const mapStateToProps = state => {
    const { auth } = state.httpData;
    return { auth };
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch)
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(HeaderCustom)
);
