/**
 * 弹框组件
 * 支持antd Modal组件原有的全部API，以下为扩展API
 * @param {reactNode} triggerDom 触发弹框显示的DOM节点
 * @param {boolean | function} beforeShow 判断是否触发弹框显示
 */
import React, { useEffect } from 'react';
import { Modal, Skeleton } from 'antd';
import { isPromise } from '@/utils/tools';
import { useControllableValue } from '@/hooks';
import { IModalProps } from './interface';

export default (props: IModalProps) => {
    const { onCancel, onOk, render, triggerDom, children, loading, beforeShow, form, footer, ...rest } = props;
    const [visible, setVisible] = useControllableValue<boolean>(props, { valuePropName: 'visible' });

    const isControlabled = 'visible' in props && props.visible !== undefined; // 是否为受控模式

    const onClick = async () => {
        form && form.resetFields(); // 重置表单

        if (typeof beforeShow === 'boolean' && !beforeShow) return;

        /**
         * 1、如果你需要在异步回调函数中控制弹框显隐，beforeShow请使用Promise函数形式
         * 2、如果beforeShow无返回值默认打开弹窗
         */
        if (typeof beforeShow === 'function') {
            setVisible((await beforeShow()) ?? true);
            return;
        }

        !isControlabled && setVisible(true);
    };

    // 受控模式下，当传入visible为true时，触发beforeShow判断逻辑
    useEffect(() => {
        isControlabled && visible && onClick();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isControlabled, visible]);

    const _onOk = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!onOk) return;

        const fn = (values?: IObject) => {
            let res = onOk(values);
            res && isPromise(res) && (res as Promise<void>).then(() => setVisible(false));
        };

        // 若结合form表单，则先校验表单信息
        form
            ? form
                  .validateFields()
                  .then(values => {
                      fn(values);
                  })
                  .catch(errorInfo => {
                      form.scrollToField(errorInfo.errorFields[0]?.name.toString());
                  })
            : fn();
    };

    const _onCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onCancel && onCancel(e);
        !isControlabled && setVisible(false);
    };

    const modalProps = {
        maskClosable: false,
        width: 620,
        destroyOnClose: true,
        ...rest,
        ...{ footer: typeof footer === 'function' ? footer(_onCancel, _onOk) : footer },
        visible,
        onCancel: _onCancel,
        onOk: _onOk
    };

    return (
        <>
            <span className="u-modal-trigger" onClick={() => !isControlabled && onClick()}>
                {triggerDom}
            </span>

            <Modal {...modalProps}>
                <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
                    {render ? render(_onCancel, _onOk) : children}
                </Skeleton>
            </Modal>
        </>
    );
};
