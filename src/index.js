import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import '@/iconfont/iconfont.css';
import 'core-js'; // 兼容IE处理
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from '@/store/reducer';
import Page from './Page';

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
