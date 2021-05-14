/**
 * 定时器 
 * @param {Function} fn 执行函数
 * @param {Number} delay 间隔时长
 * @param {Boolean} isImmediately 是否立即执行
 */
import { useEffect, useRef } from 'react';

function useInterval(fn: () => void, delay?: number | null, isImmediately?: boolean): void {
    const fnRef = useRef<() => void>();
    fnRef.current = fn;

    useEffect(() => {
        // 当延迟时间为undefined或null时，定时器不开启
        if (delay === undefined || delay === null) return;

        isImmediately && fnRef.current?.();

        const timer = setInterval(() => {
            fnRef.current?.();
        }, delay);

        // 组件卸载时，清空定时器
        return () => {
            clearInterval(timer);
        };
    }, [delay, isImmediately]);
}

export default useInterval;
