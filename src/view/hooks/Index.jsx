import React, { Component } from 'react';
import { Card } from 'antd';
import Context from './components/Context';
import Protal from './components/Protal';
import Ref from './components/Ref';
import UseReducer from './components/UseReducer';
import Loading from './components/Loading';
class Index extends Component {
    render() {
        return (
            <>
                <Card title="Context">
                    <Context />
                </Card>
                <Card title="Protals">
                    <Protal />
                </Card>
                <Card title="Ref">
                    <Ref />
                </Card>
                <Card title="useReducer">
                    <UseReducer />
                </Card>
                <Card title="Loading动画统一处理">
                    <Loading />
                </Card>
            </>
        );
    }
}

export default Index;
