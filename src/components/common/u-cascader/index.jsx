/**
 * 自定义级联组件
 * @param {string} funcName 请求方法名、参数；
 * @param {object} params 请求方法名、参数；
 * @param {bool} loadData 是否需要动态加载数据，默认false，跟antd中字段类型为function有所区别，目的是在业务层上统一数据加载的形式；
 * @param {string} extra 额外项；
 * @param {object} fieldNames 别名；
 */

import React, { Component } from 'react';
import { Cascader } from 'antd';
import { isEqual } from 'lodash';
import { emptyAll } from '@/utils/tools';

const FIELD_NAMES = { label: 'name', value: 'id', children: 'children', parentId: 'parentId', hasSub: 'hasSub' };
class UCascader extends Component {
    constructor(props) {
        super(props);
        this.fieldNames = { ...FIELD_NAMES, ...(props.fieldNames || {}) };
        this.state = {
            list: [],
            currValue: props.value,
            params: props.params // 请求参数
        };
    }

    componentDidMount() {
        this.getData().then(data => this.setState({ list: data }, this.fillData));
    }

    // 获取数据
    getData = (obj = {}) =>
        new Promise(resolve => {
            const { funcName, params = {}, extra, loadData } = this.props;
            funcName &&
                funcName({ ...params, ...obj }).then(data => {
                    let modifiedData = data || [];
                    loadData && modifiedData.forEach(item => (item.isLeaf = !item[this.fieldNames.hasSub]));
                    extra && modifiedData.unshift({ [this.fieldNames.label]: extra, [this.fieldNames.value]: null });
                    return resolve(modifiedData);
                });
        });

    // 信息回填
    fillData = () => {
        const { list } = this.state;
        const { value, loadData } = this.props;
        if (!Array.isArray(value) || !loadData) return;

        let cache = [...value]; // 缓存value

        const findSelectedOptions = (list, key) => {
            list.forEach(item => {
                if (key === item[this.fieldNames.value]) {
                    cache = cache.filter(val => val !== key);
                    item[this.fieldNames.hasSub] && this.loadData([item], data => findSelectedOptions(data, cache[0]));
                    return;
                }
            });
        };
        findSelectedOptions(list, cache[0]);
    };

    // 动态加载
    loadData = (selectedOptions, callback) => {
        if (!this.props.loadData) return;

        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // 这里添加定时器，解决加载数据时立即触发componentWillReceiveProps问题；此时props的value值还未同步
        setTimeout(() =>
            this.getData({ [this.fieldNames.parentId]: targetOption[this.fieldNames.value] }).then(data => {
                targetOption.loading = false;
                if (data.length) {
                    targetOption.children = data;
                } else {
                    targetOption.children = null;
                    targetOption.isLeaf = true;
                }
                this.setState(
                    state => ({ list: [...state.list] }),
                    () => callback && callback(data)
                );
            })
        );
    };

    onChange = (value, selectedOptions) => {
        const { onChange } = this.props;
        this.setState({ currValue: value }, () => onChange && onChange(value, selectedOptions));
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.currValue, nextProps.value)) {
            this.setState({ currValue: nextProps.value }, this.fillData);
        }

        if (!isEqual(this.state.params, nextProps.params)) {
            this.setState({ params: nextProps.params }, () => {
                this.getData().then(list => this.setState({ list }));
            });
        }
    }

    render() {
        const { list } = this.state;
        const { funcName, params, extra, loadData, ...rest } = this.props;

        return (
            <Cascader
                className="u-self-cascader"
                options={list}
                getPopupContainer={triggerNode => triggerNode.parentNode}
                showSearch={{
                    filter: (inputValue, path) => path.some(option => option.name.toLowerCase().includes(emptyAll(inputValue.toLowerCase())))
                }}
                {...rest}
                fieldNames={this.fieldNames}
                loadData={this.loadData}
                onChange={this.onChange}
            />
        );
    }
}

export default UCascader;
