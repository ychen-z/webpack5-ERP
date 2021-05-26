/**
 * @author 施阳 2020-09-05
 * 以下API为在Select组件原有API基础上扩展出的API，方便结合业务使用
 * @param {number} maxCount 多选时最大显示个数，超出toast提示；
 * @param {boolean} loadData 是否为动态加载子级数据；
 * @param {object} params 查询参数
 * @param {function} searchFn 普通查询方法
 * @param {object} fieldNames 别名
 */
import React, { useEffect, useState } from 'react';
import { TreeSelect, message } from 'antd';
import { useFetch } from '@/hooks';
import { ITreeSelectProps, IAlias } from './interface';

const FIELD_NAMES: IAlias = {
    value: 'id',
    title: 'name',
    children: 'children',
    isLeaf: 'hasSub', // 是否有子集
    disabled: 'disabled',
    parentId: 'parentId'
}; // 别名

message.config({
    maxCount: 1
});

const RefTreeSelect = (props: ITreeSelectProps) => {
    const { maxCount, loadData, fieldNames, params, treeData: defaultTreeData, value, searchFn, onChange, ...rest } = props;
    const alias = { ...FIELD_NAMES, ...fieldNames }; // 别名
    const { dispatch } = useFetch(searchFn, params, false);

    // 格式化传入的value值
    const formatInputValue = (value: any) => {
        if (rest.labelInValue) {
            return value?.map((item: IObject) => ({
                label: item[alias.title],
                value: item[alias.value]
            }));
        }

        return value;
    };

    // 格式化传出的value值
    const formatOutputValue = (value: any) => {
        if (rest.labelInValue) {
            return value?.map((item: IObject) => ({
                [alias.value]: item.value,
                [alias.title]: item.label
            }));
        }

        return value;
    };

    // 生成标准的treeData
    const formatTreeData = (list: IObject[]): IObject[] =>
        list.map(item => ({
            value: item[alias.value],
            title: item[alias.title],
            disabled: item[alias.disabled],
            isLeaf: item[alias.children] || item[alias.isLeaf] ? false : true,
            children: item[alias.children] ? formatTreeData(item[alias.children]) : null
        }));

    const [treeData, setTreeData] = useState<IObject[]>(formatTreeData(defaultTreeData || []));

    // 递归查询父节点位置，插入子节点
    const insertChildrenNode = (list: IObject[], id: string | number, children: IObject[]): IObject[] =>
        list.map(item => {
            if (item.value === id) {
                return { ...item, children };
            }

            if (item.children) {
                return { ...item, children: insertChildrenNode(item.children, id, children) };
            }

            return item;
        });

    useEffect(() => {
        searchFn && dispatch(params).then(data => setTreeData(formatTreeData(data)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTreeData(formatTreeData(defaultTreeData || []));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultTreeData]);

    // 动态加载数据
    const onLoadData = (treeNode: IObject) =>
        new Promise(resolve => {
            if (loadData) {
                dispatch({ [alias.parentId]: treeNode.value }).then(data => {
                    setTreeData(insertChildrenNode(treeData, treeNode.value, formatTreeData(data)));
                    resolve(null);
                });
            } else {
                resolve(null);
            }
        });

    const evChange = (value: any, label: any, extra: any) => {
        // 校验最大长度
        if (maxCount && Array.isArray(value) && value.length > maxCount) {
            message.warning(`最多选择${maxCount}个哦~`, 2);
            return;
        }

        onChange && onChange(formatOutputValue(value), label, extra);
    };

    return (
        <TreeSelect
            style={{ width: '100%' }}
            placeholder="请选择"
            getPopupContainer={triggerNode => triggerNode.parentNode}
            filterTreeNode={(inputValue, treeNode) =>
                !!treeNode && typeof treeNode?.title === 'string' && treeNode?.title.toLowerCase().includes(inputValue.toLowerCase())
            }
            {...rest}
            value={formatInputValue(value)}
            onChange={evChange}
            treeData={treeData}
            loadData={onLoadData}
        />
    );
};

export default RefTreeSelect;
