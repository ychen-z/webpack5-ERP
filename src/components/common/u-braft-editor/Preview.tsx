/**
 * 预览富文本内容组件
 * @description
 * 1、编辑器生成的html不包含布局样式，例如代码块和引语块样式，需要自行美化；
 * 2、编辑器生成的html中，空段落为一对空的p标签，需要设置最低高度才能正常展示连续的换行；
 * 3、编辑器生成的html中，空格即为普通的空格，需要设置white-space: pre-wrap;才能正常展示连续的空格；
 */

import React from 'react';

const Preview = ({ html = '' }: { html?: string }) => {
    return <div className="m-editor-preview" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Preview;
