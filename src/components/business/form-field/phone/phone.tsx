import React from 'react';
import { Input, Select } from 'antd';
import { IFieldProps } from './interface';

// 手机号码Id
export const PhoneTypeId = {
    MAIN_LAND: 'MAINLAND_CHINA',
    OTHER: 'OTHER'
};

// 手机号码名称
export const PhoneTypeName = {
    [PhoneTypeId.MAIN_LAND]: '大陆地区',
    [PhoneTypeId.OTHER]: '其它地区'
};

// 手机号码列表
export const PhoneTypeList = [
    {
        id: PhoneTypeId.MAIN_LAND,
        name: PhoneTypeName[PhoneTypeId.MAIN_LAND]
    },
    {
        id: PhoneTypeId.OTHER,
        name: PhoneTypeName[PhoneTypeId.OTHER]
    }
];

export const DEFAULT_VALUE = {
    phoneType: PhoneTypeId.MAIN_LAND,
    phone: undefined
};

function Phone(props: IFieldProps) {
    const { onChange, value = DEFAULT_VALUE } = props;

    const onMobileTypeChange = (phoneType: string) => {
        onChange && onChange({ ...value, phoneType });
    };

    const onMobileChange = (phone: string) => {
        onChange && onChange({ ...value, phone });
    };

    const MobileTypeCop = (
        <Select onChange={onMobileTypeChange} value={value.phoneType} style={{ width: 100 }}>
            {PhoneTypeList.map(item => (
                <Select.Option key={item.id} value={item.id}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    );

    return (
        <Input
            addonBefore={MobileTypeCop}
            placeholder="请填写手机号码"
            maxLength={100}
            value={value.phone}
            onChange={e => onMobileChange(e.target.value.trim())}
        />
    );
}

export default Phone;
