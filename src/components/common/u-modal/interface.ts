import { ModalProps } from 'antd/lib/modal';
import { FormInstance } from 'antd/lib/form/hooks/useForm';

export interface IModalProps extends Omit<ModalProps, 'onOk' | 'footer'> {
    loading?: boolean;
    children?: React.ReactNode;
    triggerDom?: React.ReactNode;
    form?: FormInstance;
    render?: (onCancel: Function, onOk: (e?: any) => Promise<unknown> | void) => React.ReactNode;
    onOk?: (e?: any) => Promise<unknown> | void;
    beforeShow?: boolean | (() => boolean | Promise<any> | void);
    footer?: null | React.ReactNode | ((onCancel: Function, onOk: (e?: any) => Promise<unknown> | void) => React.ReactNode);
}
