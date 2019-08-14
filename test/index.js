import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { cube } from './util';
import b from './utils/tool';
import A from './A';
import './index.less';
import './1.less';
import './2.less';

class Index extends Component {
    componentWillMount() {
        console.log(b.a());
        console.log(b.c());
    }
    render() {
        return (
            <div>
                2 {cube(2)} <A />{' '}
            </div>
        );
    }
}

const render = Component => {
    // 增加react-hot-loader保持状态刷新操作，如果不需要可去掉并把下面注释的打开
    ReactDOM.render(<Component />, document.getElementById('root'));
};

render(Index);

// document.getElementById('root').innerHTML = `<div>1111 ${cube(2)} </div>`;
