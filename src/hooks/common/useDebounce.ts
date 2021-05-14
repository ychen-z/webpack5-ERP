/**
 * 防抖hooks
 */
import { useRef } from 'react';

const useDebounce = (fn: Function, ms = 500) => {
    let timer = useRef<NodeJS.Timeout>();

    return function() {
        let arg = arguments;
        timer.current && clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            // @ts-ignore
            fn.apply(this, arg);
        }, ms);
    };
};

export default useDebounce;
