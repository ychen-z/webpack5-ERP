export interface IAvatarProps {
    shape?: 'rect' | 'round';
    aspect?: number; // 裁剪比例: width / height
    children?: React.ReactNode;
    [key: string]: any;
}
