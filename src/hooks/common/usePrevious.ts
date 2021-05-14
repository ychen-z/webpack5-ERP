/**
 * 缓存上一次状态hooks
 * @param { any } state 初始状态
 * @return prevState
 */
import { useRef } from 'react';

const usePrevious = <T>(state: T): T | undefined => {
    const prevState = useRef<T>();
    prevState.current = state;

    return prevState.current;
};

export default usePrevious;
