import React from 'react';
import { Input, Select } from 'antd';
import { IFieldProps } from './interface';

// 证件信息Id
export const CertificateId = {
    ID_CARD: 'ID_CARD', // 身份证
    PASSPORT: 'PASSPORT', // 护照
    OTHER: 'OTHER' // 其他
};

// 证件信息名称
export const CertificateName = {
    [CertificateId.ID_CARD]: '身份证',
    [CertificateId.PASSPORT]: '护照',
    [CertificateId.OTHER]: '其他'
};

// 证件信息列表
export const CertificateList = [
    {
        id: CertificateId.ID_CARD,
        name: CertificateName[CertificateId.ID_CARD]
    },
    {
        id: CertificateId.PASSPORT,
        name: CertificateName[CertificateId.PASSPORT]
    },
    {
        id: CertificateId.OTHER,
        name: CertificateName[CertificateId.OTHER]
    }
];

export const DEFAULT_VALUE = {
    identityTypeEnum: CertificateId.ID_CARD,
    identityNo: undefined
};

function IdCard(props: IFieldProps) {
    const { onChange, value = DEFAULT_VALUE } = props;

    const onIdTypeChange = (identityTypeEnum: string) => {
        onChange && onChange({ ...value, identityTypeEnum });
    };

    const onIdNumberChange = (identityNo: string) => {
        onChange && onChange({ ...value, identityNo });
    };

    // 失去焦点时将小写字母转大写
    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        onChange && onChange({ ...value, identityNo: e.target.value.toLocaleUpperCase() || undefined });
    };

    const PrefixCop = (
        <Select onChange={onIdTypeChange} value={value.identityTypeEnum} style={{ width: 100 }}>
            {CertificateList.map(item => (
                <Select.Option key={item.id} value={item.id}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    );

    return (
        <Input
            addonBefore={PrefixCop}
            placeholder="请填写证件信息"
            maxLength={100}
            value={value.identityNo}
            onChange={e => onIdNumberChange(e.target.value.trim())}
            onBlur={onBlur}
        />
    );
}

export default IdCard;
