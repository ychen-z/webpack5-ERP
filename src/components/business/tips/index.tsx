import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import { TooltipProps } from 'antd/lib/tooltip';
import './index.less';

const Tips = (props: TooltipProps) => {
    const { title, children } = props;
    return title ? (
        <Tooltip className="m-tips" {...props}>
            {children ? children : <QuestionCircleFilled />}
        </Tooltip>
    ) : null;
};

export default Tips;
