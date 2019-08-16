import React, { Component } from 'react';

/**
 * use :  <NIcon type="logout"  />
 * @export
 * @class NIcon
 * @params className 非必传
 * @extends {Component}
 */
export default class NIcon extends Component {
    render() {
        const { type, children, className = '', style, ...res } = this.props;
        return (
            <span className={className + ' net-icon icon iconfont icon-' + type} style={style} {...res}>
                {children || ''}
            </span>
        );
    }
}
