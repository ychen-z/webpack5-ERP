import React, { useState } from 'react';
import { Tooltip, Modal, Form, Input, message, Select, InputNumber, Button, Radio } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import useFetch from '@/hooks/common/useFetch';
import { addMenu, editMenu } from '@/axios';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import QuestionIcon from '@/components/common/QuestionIcon';

const { Item } = Form;
const { Option } = Select;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

function Edit(props: any) {
    const [visible, setVisible] = useState(false);
    const [linkStatus, setLinkStatus] = useState(false);
    const [linkVisible, setLinkVisible] = useState(false);
    const { dispatch: dispatchAddMenu } = useFetch(addMenu, null, false);
    const { dispatch: disPatchEditMenu } = useFetch(editMenu, null, false);
    const [form] = Form.useForm();

    // 弹框关闭的回调
    const close = (isOk: boolean, data?: number) => {
        setVisible(false);
        form.resetFields();
        isOk && props.callback(data);
    };

    const add = (data: any) => {
        dispatchAddMenu({ status: false, ...data, parentId: Number(props.parentId) }).then((data: any) => {
            close(true);
            message.success('增加成功');
        });
    };

    const edit = (data: any) => {
        // 初始化
        disPatchEditMenu({
            link: '',
            icon: '',
            sort: 0,
            status: false,
            ...data,
            id: props.id,
            parentId: Number(props.parentId)
        }).then((data: any) => {
            close(true);
            message.success('编辑成功');
        });
    };

    // 关闭弹窗
    const beforeClose = () => {
        close(false);
    };

    // 提交
    const onFinish = (values: any) => {
        switch (props.action) {
            case 'add':
                add(values);
                break; //可选
            case 'edit':
                edit(values);
                break; //可选
            default:
                beforeClose();
                break; //可选
        }
    };

    /**
     * 展示弹窗
     */
    const showModal = () => {
        setVisible(true);
        if (['MENU', 'MODEL'].includes(props.type)) {
            setLinkVisible(true);
        }
        if (props.status) {
            setLinkStatus(true);
        }
        form.setFieldsValue(props); // 设置值
    };

    const showLink = (v: string) => {
        if (['MENU', 'MODEL'].includes(v)) {
            setLinkVisible(true);
            if (props.status) {
                setLinkStatus(true);
            }
        } else {
            setLinkVisible(false);
            setLinkStatus(false);
        }
    };

    const setLink = (v: RadioChangeEvent) => {
        if (v.target.value) {
            setLinkStatus(true);
        } else {
            setLinkStatus(false);
        }
    };

    return (
        <span>
            <Tooltip placement="top" title={props.title + '(交由开发同学添加~)'}>
                <span>
                    {props.action === 'edit' && <EditOutlined onClick={showModal} style={{ color: '#1782e6' }} />}
                    {props.action === 'priview' && <EyeOutlined onClick={showModal} />}
                    {props.action === 'add' && (
                        <Button onClick={showModal} type="primary">
                            {props.title}
                        </Button>
                    )}
                </span>
            </Tooltip>
            <Modal visible={visible} onOk={form.submit} onCancel={beforeClose} width="600px" title={props.title}>
                <Form {...layout} form={form} onFinish={onFinish}>
                    <Item
                        name="name"
                        label="名称"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: '必填'
                            },
                            { max: 12, message: '最多输入12位字符' }
                        ]}
                    >
                        <Input placeholder="请输入名称" disabled={props.action === 'priview'} />
                    </Item>

                    <Item
                        name="code"
                        label="code"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: '必填'
                            },
                            { max: 24, message: '最多输入24位字符' }
                        ]}
                    >
                        <Input placeholder="请输入标识符号code" disabled={props.action === 'priview'} maxLength={50} />
                    </Item>

                    <Item name="type" label="类型" rules={[{ required: true, message: '请选择类型' }]}>
                        <Select disabled={props.action === 'priview'} placeholder="请选择类型" onChange={showLink}>
                            <Option key={2} value="MENU">
                                导航
                            </Option>
                            <Option key={1} value="MODEL">
                                模块
                            </Option>
                            <Option key={3} value="BUTTON">
                                按钮
                            </Option>
                            <Option key={4} value="OTHER">
                                其他
                            </Option>
                        </Select>
                    </Item>

                    {linkVisible && (
                        <Item name="status" label="是否有效链接" rules={[{ required: true, message: '请选择类型' }]}>
                            <Radio.Group disabled={props.action === 'priview'} onChange={v => setLink(v)}>
                                <Radio value>有效</Radio>
                                <Radio value={false}>无效</Radio>
                            </Radio.Group>
                        </Item>
                    )}

                    {linkStatus && (
                        <Item name="link" label="链接" rules={[{ required: true, message: '必填' }]}>
                            <Input placeholder="请输入名称" disabled={props.action === 'priview'} maxLength={50} />
                        </Item>
                    )}

                    <Item
                        name="icon"
                        label={
                            <QuestionIcon text="新增图标，请前往 https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=2362004&keyword=&project_type=&page=">
                                图标
                            </QuestionIcon>
                        }
                    >
                        <Input placeholder="请输入图标名称" disabled={props.action === 'priview'} maxLength={50} />
                    </Item>

                    <Item name="sort" label="排序">
                        <InputNumber min={0} max={99999} disabled={props.action === 'priview'} type="number" placeholder="请输入排序" />
                    </Item>
                </Form>
            </Modal>
        </span>
    );
}
export default Edit;
