import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

interface Props {
    type: string;
    mode?: 'svg' | 'span';
    style?: React.CSSProperties;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
}

const IconSvg = createFromIconfontCN({
    scriptUrl: ['//at.alicdn.com/t/font_2301218_sww264f2o0s.js']
});

const IconFont = (props: Props) => {
    const { type, mode = 'svg', ...res } = props;
    return mode === 'svg' ? <IconSvg type={type} {...res} /> : <span className={`iconfont ${type}`} {...res} />;
};

export default IconFont;
