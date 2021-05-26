/**
 * 试例：
 * <QuestionIcon text="专业级别、管理级别至少选一个">职级</QuestionIcon>
 **/
import React, { Component } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default class QuestionIcon extends Component {
    render() {
        const { text, children, style = {}, icon, hideIcon, ...rest } = this.props;
        return (
            <span>
                {hideIcon ? (
                    <Tooltip title={text} overlayStyle={{ maxWidth: '600px', wordBreak: 'break-all', ...style }} {...rest}>
                        {children}
                    </Tooltip>
                ) : (
                    <span>
                        {children}
                        <Tooltip title={text} overlayStyle={{ maxWidth: '600px', wordBreak: 'break-all', ...style }} {...rest}>
                            {icon ? icon : <QuestionCircleOutlined className="f-cp" style={{ marginLeft: '5px' }} />}
                        </Tooltip>
                    </span>
                )}
            </span>
        );
    }
}
