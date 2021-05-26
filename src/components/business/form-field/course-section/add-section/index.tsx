import React, { useState } from 'react';
import { Form, Button, Input, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from '@/components/common';
import { YXUpload } from '@netease-ehr/base';
import { RecordProps } from '../interface';
import './index.less';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

const { TextArea } = Input;

const videoType = ['wmv', 'asf', 'asx', 'rm', 'rmvb', 'mp4', '3gp', 'mov', 'm4v', 'avi', 'dat', 'mkv', 'flv', 'vob']; // 视频格式
const audioType = ['wav', 'flac', 'ape', 'alac', 'wv', 'mp3', 'aac', 'ogg', 'vorbis', 'opusdeng']; // 音频格式
const documentType = ['pdf']; // 文档格式

const TriggerDom = () => (
    <div>
        <Button type="primary">
            <PlusOutlined />
            添加章节
        </Button>
        <span style={{ fontSize: 12, color: '#AAA', marginLeft: 10 }}>多媒体课程由课程章节组成，单个章节支持视频/音频/PDF文档三种形式</span>
    </div>
);

interface Props {
    totalCount?: number; // 新建时传入总章节数
    data?: RecordProps; // 编辑时传入表单参数
    isEdit?: boolean; // 是否为编辑
    onOk: (record: RecordProps) => void;
    children?: React.ReactNode;
}

// 媒体类型
type MediaTypes = 'YX_VIDEO' | 'YX_AUDIO' | 'KM';

const MEDIA_TYPES = {
    YX_VIDEO: 'VIDEO',
    YX_AUDIO: 'AUDIO',
    KM: 'DOCUMENT'
};

const AddSection = (props: Props) => {
    const { totalCount = 0, data = { sort: 0 } as IObject, isEdit, onOk, children = <TriggerDom /> } = props;
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);

    // 表单提交
    const onSubmit = () =>
        new Promise(resolve => {
            form.validateFields().then((values: any) => {
                let transformType = values.file.transformType as MediaTypes;
                let record = {
                    ...(values as RecordProps),
                    type: MEDIA_TYPES[transformType] || data.type,
                    sort: data.sort || totalCount // 编辑时取传入的sort，新建时根据总章节数手动添加sort
                };
                onOk(record);
                form.resetFields();
                resolve(null);
            });
        });

    // 保存
    const onSave = () => {
        onSubmit().then(() => {
            setVisible(false);
        });
    };

    return (
        <Modal
            className="u-add-section"
            title={isEdit ? '修改章节' : '添加章节'}
            visible={visible}
            onCancel={() => setVisible(false)}
            triggerDom={<span onClick={() => setVisible(true)}>{children}</span>}
            footer={
                <>
                    <Button onClick={() => setVisible(false)}>取消</Button>
                    {!isEdit && (
                        <Button type="primary" ghost onClick={onSubmit}>
                            保存并继续添加
                        </Button>
                    )}
                    <Button type="primary" onClick={onSave}>
                        保存
                    </Button>
                </>
            }
        >
            <Form {...layout} form={form} autoComplete="off" initialValues={data}>
                <Form.Item name="name" label="章节标题" rules={[{ required: true, message: '请输入章节标题' }]}>
                    <Input placeholder="请输入章节标题" maxLength={50} />
                </Form.Item>
                <Form.Item name="file" label="章节文件" valuePropName="fileList" rules={[{ required: true, message: '请上传章节文件' }]}>
                    <YXUpload maxCount={1} validFileType={[...videoType, ...audioType, ...documentType]} />
                </Form.Item>
                <Form.Item label="章节时长" required>
                    <Form.Item name="duration" noStyle rules={[{ required: true, message: '请输入章节时长' }]}>
                        <InputNumber step={1} placeholder="请输入章节时长" min={1} max={6000} style={{ width: 130 }} />
                    </Form.Item>
                    <span style={{ marginLeft: 10 }}>min</span>
                </Form.Item>
                <Form.Item name="description" label="章节说明">
                    <TextArea autoSize={{ minRows: 4, maxRows: 4 }} maxLength={500} placeholder="请输入章节说明供学员参考" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddSection;
