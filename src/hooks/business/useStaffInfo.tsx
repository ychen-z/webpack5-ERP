// table中统一员工信息格式
import React from 'react';
import { Tag, Row } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { Ellipsis } from '@/components/common';

// 员工状态信息
export const StaffStatusId = {
    PROBATION: 'PROBATION',
    IN_SERVICE: 'IN_SERVICE',
    LEAVE: 'LEAVE'
};

export const StaffStatusName = {
    [StaffStatusId.PROBATION]: '试用期',
    [StaffStatusId.IN_SERVICE]: '正式',
    [StaffStatusId.LEAVE]: '离职'
};

const useStaffInfo = (columnItem: IObject = {}): ColumnType<IObject> => {
    return {
        title: '学员',
        fixed: 'left',
        width: 180,
        dataIndex: 'empStatus',
        ...columnItem,
        render: (text: any, record: IObject) => (
            <Row align="middle">
                <Ellipsis style={{ flex: 1 }}>
                    {record.name} | {record.jobNumber}
                </Ellipsis>
                {text === StaffStatusId.LEAVE && (
                    <Tag color="#AAA" style={{ marginRight: 0, padding: '0 4px', lineHeight: '16px' }}>
                        离职
                    </Tag>
                )}
            </Row>
        )
    };
};

export default useStaffInfo;
