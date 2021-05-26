/**
 * 文本溢出hover时toolTip提示 施阳 2018-10-10
 * 支持antd 中 toolTip组件所支持的所有api
 * @param {number} line 最大展示行数，默认单行溢出(多行溢出时tooltip常显，目前无法解决)
 * @param {string} className
 * @param {obj} style
 */

/**
 * 示例：
 * <Ellipsis placement="topCenter" style={{width: "200px"}}>{text}</Ellipsis>
 */

import React, { Component } from 'react';
import { Tooltip } from 'antd';

export default class Ellipsis extends Component {
    state = {
        showTip: false, // 是否显示tip
        maxWidth: 200 // 提示框最小宽度
    };

    componentDidMount() {
        this.isOverflow();
    }

    componentDidUpdate() {
        this.isOverflow();
    }

    // 判断是否溢出
    isOverflow = () => {
        const { line = 1 } = this.props;
        let condition = line === 1 ? this.boxEle.clientWidth < this.boxEle.scrollWidth : true;
        if (condition && (this.boxEle.clientWidth !== this.state.maxWidth || !this.state.showTip)) {
            this.setState({ showTip: true, maxWidth: this.boxEle.clientWidth });
        }
    };

    getEllipsisStyle = line => ({
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: line,
        WebkitBoxOrient: 'vertical'
    });

    render() {
        const { className = '', style, children, line = 1, title, ...rest } = this.props;
        const { maxWidth, showTip } = this.state;
        return (
            <div className={`${className} ${line === 1 ? 'f-ellipsis' : ''} u-ellipsis`} style={style} ref={dom => (this.boxEle = dom)}>
                {showTip ? (
                    <Tooltip placement="topLeft" {...rest} title={title || children} overlayStyle={{ maxWidth }}>
                        <span style={line > 1 ? this.getEllipsisStyle(line) : {}}>{children}</span>
                    </Tooltip>
                ) : (
                    children
                )}
            </div>
        );
    }
}
