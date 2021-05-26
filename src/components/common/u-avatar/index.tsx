import React from 'react';
import { Upload } from '@netease-ehr/base';
import ImgCrop from 'antd-img-crop';
import { message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/es/slider/style';
import 'antd/es/modal/style';
import { IAvatarProps } from './interface';
import './index.less';

const MAX_COUNT = 1;
const MAX_SIZE = 10 * 1024 * 1024; // 文件大小20M
const ACCEPT_FILE = ['jpeg', 'jpg', 'png', 'gif', 'tif', 'bmp'];

const SHAPE = 'rect'; // 裁剪形状
const ASPECT = 100 / 57; // 裁剪比例

const Avatar = (props: IAvatarProps) => {
    const { children, shape = SHAPE, aspect = ASPECT, ...rest } = props;

    const beforeCrop = (file: any) => {
        // 文件长度校验
        if (file.name.length > 100) {
            message.error('文件名过长（需控制在100字符内）');
            return false;
        }

        return true;
    };

    return (
        <ImgCrop shape={shape} aspect={aspect} beforeCrop={beforeCrop} quality={1}>
            <Upload
                listType="picture-card"
                maxCount={MAX_COUNT}
                maxSize={MAX_SIZE}
                validFileType={ACCEPT_FILE}
                shape={shape}
                aspect={aspect}
                {...rest}
            >
                {children ? (
                    children
                ) : (
                    <>
                        <PlusOutlined />
                        <div>上传</div>
                    </>
                )}
            </Upload>
        </ImgCrop>
    );
};

export default Avatar;
