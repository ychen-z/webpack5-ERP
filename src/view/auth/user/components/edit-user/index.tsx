// TODO: 这里要优化
import React from 'react';
import { Form, Button, Select, Radio, message } from 'antd';
import { Modal } from '@/components/common';
import useFetch from '@/hooks/common/useFetch';
import { editUser, getRoleListSimple, getUserByUserId } from '@/axios';
import Department from '@/components/business/form-field/department/mul-department';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
};

const TriggerDom = () => <Button type="link">编辑权限</Button>;

interface Props {
    userId?: any; // 编辑时传入表单参数
    isEdit?: boolean; // 是否为编辑
    onOk?: (record: any) => void;
    children?: React.ReactNode;
}

// :TODO
// 1、获取角色
// 2、获取部门
const UserModal = (props: Props) => {
    const { onOk, children = <TriggerDom />, userId } = props;
    const [form] = Form.useForm();
    const { data: roleList = [], dispatch } = useFetch<any>(getRoleListSimple, null, false); // 获取所有角色
    const { data: userInfo = {}, dispatch: dispatchGetUserInfo } = useFetch<any>(getUserByUserId, null, false); // 获取所有角色
    const { dispatch: disPatchEditUser } = useFetch(editUser, null, false);

    // 表单提交
    const onSubmit = (values: any) =>
        disPatchEditUser({
            ...values,
            departmentIdList: values.departmentIdList && values.departmentIdList.map((item: IObject) => item.departmentId),
            id: userId
        }).then((data: any) => {
            onOk && onOk(data);
            message.success('编辑成功');
        });

    // 获取用户信息
    const beforeShow = () => {
        dispatch();
        dispatchGetUserInfo(userId).then(res => {
            form.setFieldsValue({
                ...res,
                roleId: res?.role?.id,
                departmentIdList: res?.departmentPermList || []
            });
        });
    };

    return (
        <Modal className="u-edit-modal" title="编辑权限" form={form} beforeShow={beforeShow} triggerDom={children} onOk={onSubmit}>
            <Form {...layout} form={form} name="user" autoComplete="off">
                <Form.Item label="用户">
                    <span className="f-fwb">
                        {userInfo.name} | {userInfo.jobNumber}
                    </span>
                </Form.Item>

                <Form.Item label="角色" name="roleId" rules={[{ required: true, message: '请选择角色' }]}>
                    <Select placeholder="请选择">
                        {roleList.length > 0 &&
                            roleList.map((item: any) => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>

                <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.roleId !== currentValues.roleId}>
                    {({ getFieldValue }) => {
                        const currentRoleId = getFieldValue('roleId');
                        const filterRoleArr = roleList.filter((item: IObject) => item.id == currentRoleId);
                        return (
                            !!filterRoleArr.length &&
                            !filterRoleArr[0].systemRole && (
                                <>
                                    <Form.Item name="departmentPerm" label="权限范围" rules={[{ required: true, message: '请选择权限范围' }]}>
                                        <Radio.Group>
                                            <Radio value="ALL" key={1}>
                                                公司级
                                            </Radio>
                                            <Radio value="PART" key={0}>
                                                部门级
                                            </Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                        noStyle
                                        shouldUpdate={(prevValues, currentValues) => prevValues.departmentPerm !== currentValues.departmentPerm}
                                    >
                                        {({ getFieldValue }) =>
                                            getFieldValue('departmentPerm') === 'PART' && (
                                                <Form.Item
                                                    name="departmentIdList"
                                                    label="部门范围"
                                                    rules={[{ required: true, message: '请选择部门范围' }]}
                                                >
                                                    <Department />
                                                </Form.Item>
                                            )
                                        }
                                    </Form.Item>
                                </>
                            )
                        );
                    }}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;
