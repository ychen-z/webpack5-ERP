/**
 * 在某些组件开发时，我们需要组件的状态即可以自己管理，也可以被外部控制，useControllableValue 就是帮你管理这种状态的 Hook
 * 具体demo可参考：https://ahooks.js.org/zh-CN/hooks/state/use-controllable-value
 * 注意这里只针对简单数据类型的value，否则value作为useUpdateEffect依赖项时会造成内存溢出
 */
import { useMemo, useState, useCallback } from 'react';
import useUpdateEffect from './useUpdateEffect';

export interface Options<T> {
    defaultValue?: T;
    defaultValuePropName?: string;
    valuePropName?: string;
    trigger?: string;
}

export interface Props {
    [key: string]: any;
}

export default function useControllableValue<T>(props: Props = {}, options: Options<T> = {}) {
    const { defaultValue, defaultValuePropName = 'defaultValue', valuePropName = 'value', trigger = 'onChange' } = options;

    const value = props[valuePropName];

    const initialValue = useMemo(() => {
        if (valuePropName in props) {
            return value;
        }
        if (defaultValuePropName in props) {
            return props[defaultValuePropName];
        }
        return defaultValue;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [state, setState] = useState<T | undefined>(initialValue);

    /* init 的时候不用执行了 */
    useUpdateEffect(() => {
        if (valuePropName in props) {
            setState(value);
        }
    }, [value]);

    const handleSetState = useCallback(
        (v: T | undefined) => {
            setState(v);
            if (props[trigger]) {
                props[trigger](v);
            }
        },
        [props, trigger]
    );

    return [state, handleSetState] as const;
}
