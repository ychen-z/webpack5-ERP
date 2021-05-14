import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { message } from 'antd';
import { createStore, applyMiddleware } from 'redux';
import reducer from '@/store/reducer';
import Page from './Page';
import '@/iconfont/iconfont.css';
import './assets/style/index.less';

message.config({ prefixCls: 'pre-message' });

const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Component store={store} />
        </Provider>,
        document.getElementById('root')
    );
};

render(Page);
