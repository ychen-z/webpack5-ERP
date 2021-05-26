// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { message, Card, Tree, Button, Input, Form, Radio } from 'antd';
import { cloneDeep } from 'lodash';
import { useFetch } from '@/hooks';
import { addRole, editRole, getCourseClassList } from '@/axios';
import './role-pannel.less';
import { Select } from '@/components/common';

const { Item } = Form;
const { TextArea } = Input;
const layout = {
    labelCol: { span: 20 }
};
const { TreeNode } = Tree;

interface RoleProps {
    callback: (v: boolean) => void;
    action: 'add' | 'edit';
    treeData: any;
    roleInfo: any; // 角色信息
}

const dataToJson = (one: any, data: any) => {
    let kids;
    if (!one) {
        // 第1次递归
        kids = data.filter((item: { parentId: any }) => !item.parentId);
    } else {
        kids = data.filter((item: { parentId: any }) => item.parentId === one.id);
    }
    kids.forEach((item: { children: any }) => (item.children = dataToJson(item, data)));
    return kids.length ? kids : null;
};

/** 处理原始数据，将原始数据处理为层级关系 **/
const makeSourceData = (data: any) => {
    const d = cloneDeep(data);
    // 按照sort排序
    d.sort((a: { sort: number }, b: { sort: number }) => {
        return a.sort - b.sort;
    });
    const sourceData = dataToJson(null, d) || [];
    return sourceData;
};

const RolePannel = (props: RoleProps) => {
    const sourceData = makeSourceData(props.treeData); // 数据源
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]); //  默认选中项目
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['']); //  默认点击的项目
    const [halfCheckedKeys, setHalfCheckedKeys] = useState<string[]>([]); //  默认半选
    const [expandedKeys, setExpandedKeys] = useState<string[]>(['']);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const { dispatch: dispatchAddRole } = useFetch(addRole, null, false);
    const { dispatch: dispatchEditRole } = useFetch(editRole, null, false);

    const [form] = Form.useForm();

    // 渲染节点
    const renderTreeNodes = (data: any) =>
        data.map((item: any) => {
            var className = '';
            className += item.type == '3' ? 'role-btn text-12' : ''; // 如果是按钮
            if (item.children) {
                return (
                    <TreeNode title={<span className={className}>{item.name}</span>} key={item.id}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={<span className={className}>{item.name}</span>} key={item.id} {...item} />;
        });

    const onCheck = (checkedKeys: any, info: any) => {
        setCheckedKeys(checkedKeys);
        setHalfCheckedKeys(info.halfCheckedKeys);
    };

    // 选项点击事件
    const onSelected = (selectedKeys: any, info: any) => {
        setSelectedKeys(selectedKeys);
    };

    const onAdd = (values: any, menuIdList: any) => {
        const data = {
            ...values,
            menuIdList
        };
        dispatchAddRole(data).then((data: any) => {
            props.callback(true);
            message.success('新增成功');
        });
    };

    const onEdit = (values: any, menuIdList: any) => {
        const data = {
            ...values,
            id: props.roleInfo.id,
            menuIdList
        };
        dispatchEditRole(data).then((data: any) => {
            props.callback(true);
            message.success('修改成功');
        });
    };

    // 提交
    const onFinish = (values: any) => {
        const menuIdList = [...new Set([...checkedKeys, ...halfCheckedKeys])];
        if (!menuIdList.length) {
            message.warn('请选择菜单权限');
            return;
        }
        switch (props.action) {
            case 'add':
                onAdd(values, menuIdList);
                break; //可选
            case 'edit':
                onEdit(values, menuIdList);
                break; //可选
        }
    };

    const onExpand = (expandedKeys: any) => {
        // if not set autoExpandParent to false, if sub expanded, parent can not
        // collapse. or, you can remove all expanded sub keys.
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };

    useEffect(() => {
        if (props.roleInfo.name) {
            // 角色名不可能为空
            form.setFieldsValue({ ...props.roleInfo, courseClassCodeList: props.roleInfo.courseClassList.map(item => item.classCode) });
            setCheckedKeys(
                (props.roleInfo.menuList || []).filter((item: { lowest: boolean }) => item.lowest == true).map((item: { id: string }) => item.id + '')
            );
            setHalfCheckedKeys(
                (props.roleInfo.menuList || [])
                    .filter((item: { lowest: boolean }) => !item.lowest == true)
                    .map((item: { id: string }) => item.id + '')
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.roleInfo]);
    return (
        <>
            <Card
                bordered={false}
                title={props.action === 'add' ? '新增角色' : '编辑角色'}
                extra={
                    <div>
                        <Button onClick={() => props.callback(false)} style={{ marginRight: 12 }}>
                            取消
                        </Button>
                        <Button onClick={form.submit} type="primary">
                            保存
                        </Button>
                    </div>
                }
            >
                <section className="base-info">
                    <Form {...layout} form={form} onFinish={onFinish} layout="vertical">
                        <Item
                            name="name"
                            label={<span className="f-fwb">角色名称</span>}
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: '必填'
                                },
                                { max: 50, message: '最多输入50字' }
                            ]}
                        >
                            <Input placeholder="请输入角色名称" maxLength="50" disabled={+props.roleType === 3} />
                        </Item>

                        <Item
                            name="description"
                            label={<span className="f-fwb">描述</span>}
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: '必填'
                                },
                                { max: 500, message: '最多输入500字' }
                            ]}
                        >
                            <TextArea placeholder="请输入描述" maxLength="500" disabled={+props.roleType === 3} />
                        </Item>
                        <Item
                            name="symbolPerm"
                            label={<span className="f-fwb">关联元素数据权限</span>}
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: '必填'
                                }
                            ]}
                        >
                            <Radio.Group>
                                <Radio value="ALL">高级 - 指可在标准配置和关联管理中查看所有考试、作业、问卷模板。</Radio>
                                <Radio value="PART">基础 - 指仅可在标准配置和关联管理中查看和操作自己创建的和系统预置的考试、作业、问卷模板。</Radio>
                            </Radio.Group>
                        </Item>
                        <Item
                            name="courseClassPerm"
                            label={<span className="f-fwb">课程类别权限</span>}
                            rules={[
                                {
                                    required: true,
                                    message: '必填'
                                }
                            ]}
                        >
                            <Radio.Group>
                                <Radio value="ALL">全部</Radio>
                                <Radio value="PART">部分</Radio>
                            </Radio.Group>
                        </Item>
                        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.courseClassPerm !== currentValues.courseClassPerm}>
                            {({ getFieldValue }) =>
                                getFieldValue('courseClassPerm') === 'PART' && (
                                    <Item
                                        name="courseClassCodeList"
                                        rules={[
                                            {
                                                required: true,
                                                message: '课程类别权限'
                                            }
                                        ]}
                                    >
                                        <Select
                                            searchFn={getCourseClassList}
                                            mode="multiple"
                                            maxCount={1000}
                                            maxTagTextLength={8}
                                            maxTagCount={4}
                                            fieldNames={{ id: 'classCode' }}
                                        />
                                    </Item>
                                )
                            }
                        </Form.Item>

                        <div className="base-menus">
                            <p className="f-fwb">菜单权限</p>
                            <Tree
                                checkable
                                onExpand={onExpand}
                                expandedKeys={expandedKeys}
                                autoExpandParent={autoExpandParent}
                                onCheck={onCheck}
                                checkedKeys={checkedKeys}
                                onSelect={onSelected}
                                selectedKeys={selectedKeys}
                            >
                                {renderTreeNodes(sourceData)}
                            </Tree>
                        </div>
                    </Form>
                </section>
            </Card>
        </>
    );
};

export default React.memo(RolePannel);
