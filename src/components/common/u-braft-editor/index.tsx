/**
 * 富文本编辑器
 * 具体api参考  https://braft.margox.cn/
 */
import React, { useState, useMemo } from 'react';
import BraftEditor, { BraftEditorProps, ControlType, EditorState, ExtendControlType, HooksType } from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import MaxLength from 'braft-extensions/dist/max-length';
import { message, Tag } from 'antd';
import { PictureFilled } from '@ant-design/icons';
import { Modal } from '@/components/common';
import { Upload } from '@netease-ehr/base';
import 'braft-editor/dist/index.css';
import { useDebounce, useUpdateEffect } from '@/hooks';
import Preview from './Preview';
import './index.less';

message.config({
    duration: 2,
    maxCount: 1 // 最多显示个数
});

// 可选字段标签
const entityTags = {
    // 指定扩展类型
    type: 'entity',
    // 指定扩展的entity名称，推荐使用全部大写，内部也会将小写转换为大写
    name: 'KEYWORD-ITEM',
    // 在编辑器工具栏中增加一个控制按钮，点击时会将所选文字转换为该entity
    // control: {
    // 	text: '标签'
    // },
    // 指定entity的mutability属性，可选值为MUTABLE和IMMUTABLE，表明该entity是否可编辑，默认为MUTABLE
    mutability: 'IMMUTABLE',
    // 指定通过上面新增的按钮创建entity时的默认附加数据
    // data: {},
    // 指定entity在编辑器中的渲染组件
    component: (props: any) => {
        return <span className="keyword-item">{props.children}</span>;
    },
    // 指定html转换为editorState时，何种规则的内容将会转换成该entity
    importer: (nodeName: string, node: any) => {
        // source属性表明输入来源，可能值为create、paste或undefined
        // console.log(node)
        if (nodeName.toLowerCase() === 'span' && node.classList && node.classList.contains('keyword-item')) {
            // 此处可以返回true或者一个包含mutability和data属性的对象
            return {
                mutability: 'IMMUTABLE',
                data: {}
            };
        }
        return;
    },
    // 指定输出该entity在输出的html中的呈现方式
    exporter: (entityObject: any, originalText: string) => {
        // 注意此处的entityObject并不是一个entity实例，而是一个包含type、mutability和data属性的对象
        return <span className="keyword-item">{originalText}</span>;
    }
};

BraftEditor.use([MaxLength({}), entityTags]);

const CONTROLS: ControlType[] = [
    'undo',
    'redo',
    'separator',
    'font-size',
    'separator',
    'text-align',
    'separator',
    'text-color',
    'bold',
    'italic',
    'underline',
    'separator',
    'link',
    'separator'
]; // 编辑器工具栏

interface TagProps {
    id: number;
    fieldName: string;
    htmlValue: string;
}

interface IHooksType extends HooksType {
    'before-preview': (editorState: EditorState) => string;
}

interface Props extends Omit<BraftEditorProps, 'onChange' | 'hooks'> {
    maxLength?: number;
    className?: string;
    tagList?: TagProps[];
    simple?: boolean; // 精简版
    hooks?: IHooksType; // 钩子函数
    onChange?: (html: string, editorState: EditorState) => void;
}

interface KeyProps {
    tagList: TagProps[];
    onClick: Function;
}

// 可选字段组件
const Keywords = (props: KeyProps) => {
    return (
        <div className="u-keyWords">
            <span>可选字段：</span>
            {(props.tagList || []).map(item => (
                <Tag onClick={() => props.onClick(item.htmlValue)} key={item.id}>
                    {item.fieldName}
                </Tag>
            ))}
        </div>
    );
};

const Editor = (props: Props) => {
    const { tagList, maxLength = 5000, simple, className = '', value, defaultValue, onChange = () => null, hooks, ...rest } = props;
    const { 'before-preview': beforePreview, ...restHooks } = hooks || {}; // 预览时的钩子函数
    const _onChange = useDebounce(onChange) as (html: string, editorState: EditorState) => void;
    const [_maxLength, setMaxLength] = useState(maxLength);
    const [visible, setVisible] = useState(false); // 预览弹框显隐

    // 设置初始值
    const initialValue = useMemo(() => {
        if ('value' in props) return BraftEditor.createEditorState(value);
        if ('defaultValue' in props) return BraftEditor.createEditorState(defaultValue);
        return BraftEditor.createEditorState('<p></p>');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [editorState, setEditorState] = useState<EditorState>(initialValue);
    const [html, setHtml] = useState<string>(); // 预览内容

    useUpdateEffect(() => {
        if (BraftEditor.createEditorState(value).toHTML() !== editorState.toHTML()) {
            setEditorState(BraftEditor.createEditorState(value));
        }
    }, [value]);

    // 图片上传
    const onUpload = (_: any, file: any) => {
        if (!file) return;

        if (file.status === 'done') {
            setEditorState(
                ContentUtils.insertMedias(editorState, [
                    {
                        type: 'IMAGE',
                        url: file.response?.url
                    }
                ])
            );
        }
    };

    // 计算最大长度（可选字段不占用长度）
    const calcMaxLength = useDebounce(() => {
        let html = editorState ? editorState.toHTML() : '',
            length = props.maxLength || Infinity;
        tagList &&
            tagList.forEach(item => {
                let len = html.split(item.htmlValue).length; // 同个标签选择多次需要计算多个相同标签的长度
                len > 1 && (length += item.fieldName.length * (len - 1));
            });

        setMaxLength(length);
    });

    // 触发编辑器
    const handleChange = (editorState: EditorState) => {
        calcMaxLength();
        setEditorState(editorState);
        _onChange(editorState.isEmpty() ? '' : editorState.toHTML(), editorState);
    };

    // 字数达到上限的回调
    const onReachMaxLength = () => {
        message.warning(`不能超过${props.maxLength}字哦~`);
    };

    // 选择可选字段
    const onChoseTags = (htmlString: string) => {
        let value = ContentUtils.insertHTML(editorState, htmlString);
        calcMaxLength();
        setEditorState(value);
        _onChange(value.isEmpty() ? '' : value.toHTML(), editorState);
    };

    // 自定义扩展组件
    let uploader: ExtendControlType = {
            key: 'antd-uploader',
            type: 'component',
            component: (
                <Upload accept="image/*" onChange={onUpload} showUploadList={false}>
                    <button type="button" data-title="插入图片" className="control-item button">
                        <PictureFilled />
                    </button>
                </Upload>
            )
        },
        preview: ExtendControlType = {
            className: 'edit-preview',
            key: 'custom-button',
            type: 'button',
            text: '预览',
            onClick: () => {
                setHtml(beforePreview ? beforePreview(editorState) : editorState?.toHTML());
                setVisible(true);
            }
        };
    const extendControls: ExtendControlType[] = simple ? [uploader] : [uploader, 'separator', preview];

    return (
        <div className={`m-braftEditor ${simple ? 'm-braftEditor-simple' : ''} ${className}`}>
            <BraftEditor
                hooks={restHooks}
                componentBelowControlBar={tagList ? <Keywords onClick={onChoseTags} tagList={tagList} /> : null}
                onReachMaxLength={onReachMaxLength}
                controls={simple ? CONTROLS : undefined}
                excludeControls={['media']}
                extendControls={extendControls}
                stripPastedStyles
                {...rest}
                // @ts-ignore
                maxLength={_maxLength}
                value={editorState}
                onChange={handleChange}
            />

            {/* 预览时，若存在预览钩子函数则预览内容取钩子函数返回的内容 */}
            <Modal title="预览" width={850} visible={visible} onCancel={() => setVisible(false)} footer={false}>
                <Editor.Preview html={html} />
            </Modal>
        </div>
    );
};

Editor.Preview = Preview;
Editor.createEditorState = BraftEditor.createEditorState;
export default Editor;
