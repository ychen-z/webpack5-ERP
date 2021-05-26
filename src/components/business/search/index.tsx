/**
 * @param {string} mode 模式；simple-简单模式 button-操作按钮模式；默认是简单模式
 * @param {number} itemSpan 搜索项页面占比，默认值为8（默认一行展示三个搜索项）, 为保证不同占比label对齐，只支持6,8,16,24四个值；
 * @param {bool} expand 搜索项是否展开，默认展开；
 * @param {number} maxRows 搜索项最大展示行数；
 * @param {number} minRows 搜索项最小行数；
 * @param {string} type 搜索项匹配类型，必须在config文件配置中存在，用于标记某个页面的搜索项；
 * @param {object} config 自定义配置项，用于父组件配置搜索项；{[key]: {}}
 * @param {function} evSearch 搜索时触发，参数为搜索项填写的值；(params :{}) => void
 * @param {function} evReset 清空搜索项时触发；
 */
import React, { Component, useState, useRef } from 'react';
import { Form, Row, Col, Button } from 'antd';
import { isObject } from '@/utils/tools';
import { useDebounce, useForceUpdate } from '@/hooks';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { SearchItem, formatData } from './config';
import { ISearchProps } from './interface';
import './index.less';

// 搜索项封装（这里不能是无状态组件，form内部通过ref去实现的，无状态组件没有ref）
class SearchItemCop extends Component<any> {
    render() {
        const { component: Component, ...rest } = this.props;
        return <Component {...rest} />;
    }
}

const Search = (props: ISearchProps) => {
    const { type, itemSpan = 6, config = {}, minRows = 1, onValuesChange, evReset, evSearch } = props;
    const forceUpdate = useForceUpdate();
    const [form] = Form.useForm();
    const list = SearchItem[type] || []; // 搜索单元列表
    const [expand, setExpand] = useState(true); // 展开、收起
    const [rowCount, setRowCount] = useState(minRows); // 搜索项行数
    const [mode, setMode] = useState(''); // 搜索栏模式：single-单行  multiple-多行
    const searchParams = useRef<IObject>({}); // 经过数据处理，返回给业务层的筛选项表单值集合
    const searchValues = useRef<IObject>({}); // 未经过数据处理，实时记录整个搜索项模块的表单值集合

    // 搜索
    const handleSearch = () => {
        form.validateFields().then(values => {
            let formatValue = formatData(values, type);
            searchParams.current = formatValue;
            evSearch && evSearch(formatValue);
        });
    };

    // 重置
    const handleReset = () => {
        /**
         * 1、form.resetFields() 方法会导致子表单组件 卸载 =》挂载（内部包含数据请求的组件会再次触发请求） https://github.com/ant-design/ant-design/issues/23137
         * 2、故采用form.setFieldsValue() 方法手动赋值
         */
        let obj = {} as IObject;
        for (let key in searchValues.current) {
            obj[key] = undefined;
        }
        form.setFieldsValue(obj);
        searchParams.current = {};
        searchValues.current = {};
        evReset && evReset();
        onValuesChange && onValuesChange({});
    };

    // 表单值改变
    const _onValuesChange = useDebounce((changedValues: IObject, allValues: IObject) => {
        searchValues.current = allValues;
        forceUpdate();
        onValuesChange && onValuesChange(allValues);
    });

    // 展开收缩
    const toggle = () => {
        setExpand(prev => !prev);
    };

    // 动态渲染搜索项
    const getFields = () => {
        let children: React.ReactNode[] = [],
            count = 0;

        list.forEach(item => {
            let newProps: IObject = {
                ...item,
                handleSearch,
                handleReset,
                searchValues // 整个搜索项模块的表单值集合
            };

            // 页面中自定义搜索组件属性(合并配置参数)
            if (config[item.key]) {
                for (let cKey in config[item.key]) {
                    // @ts-ignore
                    let cValue = config[item.key][cKey];
                    if (isObject(cValue)) {
                        newProps[cKey] = { ...newProps[cKey], ...cValue };
                    } else {
                        newProps = { ...newProps, ...config[item.key] };
                    }
                }
            }

            const { span = itemSpan, alias, key, label, initialValue, beforeShow } = newProps;

            if (beforeShow && !beforeShow(searchValues.current)) return; // 搜索单元组件渲染前的钩子函数，return false 则不渲染

            // 存在初始值需要将初始值添加到搜索参数集合中
            if (initialValue !== undefined) {
                searchValues.current = { ...searchValues.current, [alias ? alias : key]: initialValue };
            }

            count += span; // 记录搜索项页面占比总和，从而计算得出搜索项的行数

            children.push(
                <Col span={span} key={alias ? alias : key} className="search-item">
                    <Form.Item label={label} name={alias ? alias : key} initialValue={initialValue} colon={false}>
                        <SearchItemCop component={item.content} {...newProps} />
                    </Form.Item>
                </Col>
            );
        });

        // react render函数实际是纯函数，不能在这个阶段去改变组件的props、state;启用定时器人为制造异步事件，避免warning
        setTimeout(() => {
            setRowCount(Math.ceil(count / 24));
            setMode(Math.ceil((count + itemSpan) / 24) > 1 ? 'multiple' : 'single');
        });

        return children;
    };

    return (
        <div className="m-search" id="m-search">
            <Form autoComplete="off" form={form} onValuesChange={_onValuesChange}>
                <Row className="search-section" gutter={15} style={{ height: expand ? 'auto' : 50 * minRows }}>
                    {getFields()}

                    {mode === 'single' && (
                        <Col span={itemSpan} className="search-item-expand">
                            <Button type="primary" onClick={handleSearch}>
                                搜索
                            </Button>
                            <Button style={{ margin: '0 8px' }} onClick={handleReset}>
                                重置
                            </Button>
                        </Col>
                    )}
                </Row>
            </Form>
            {mode === 'multiple' && (
                <div className="expand">
                    <Button type="primary" onClick={handleSearch}>
                        搜索
                    </Button>
                    <Button style={{ margin: '0 8px' }} onClick={handleReset}>
                        重置
                    </Button>
                    {rowCount > minRows && (
                        <a onClick={toggle} style={{ marginLeft: 10 }}>
                            {expand ? '收起' : '展开'}
                            {expand ? <UpOutlined /> : <DownOutlined />}
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
