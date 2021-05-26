import React from 'react';
import { Table, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, FormOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { CourseSectionName } from '@/constants';
import { formatTime } from '@/utils/tools';
import Edit from '../add-section';
import { RecordProps } from '../interface';

interface Props {
    list: RecordProps[];
    onEdit: (record: RecordProps) => void;
    onDelete: (sort: number) => void;
    onSort: (sort: number, sortType: boolean) => void;
}

const SectionTable = (props: Props) => {
    const { list = [], onDelete, onEdit, onSort } = props;
    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
            width: 150,
            ellipsis: true
        },
        {
            title: '类型',
            dataIndex: 'type',
            width: 80,
            render: (text: string) => CourseSectionName[text]
        },
        {
            title: '时长',
            dataIndex: 'duration',
            width: 80,
            render: (text: number) => formatTime(text)
        },
        {
            title: '章节说明',
            dataIndex: 'description',
            width: 200,
            ellipsis: true,
            render: (text: string) => text || '-'
        },
        {
            title: '排序',
            dataIndex: 'sort',
            width: 80,
            render: (text: number) => (
                <Space>
                    {text === 0 && (
                        <span className="disabled">
                            <ArrowUpOutlined />
                        </span>
                    )}
                    {text !== 0 && (
                        <a>
                            <ArrowUpOutlined onClick={() => onSort(text, true)} />
                        </a>
                    )}
                    {text === list.length - 1 && (
                        <span className="disabled">
                            <ArrowDownOutlined />
                        </span>
                    )}
                    {text !== list.length - 1 && (
                        <a>
                            <ArrowDownOutlined onClick={() => onSort(text, false)} />
                        </a>
                    )}
                </Space>
            )
        },
        {
            title: '操作',
            width: 100,
            render: (text: string, record: RecordProps) => (
                <Space>
                    <Edit data={record} onOk={onEdit} isEdit>
                        <a>
                            <FormOutlined />
                        </a>
                    </Edit>
                    <a href={record.file.url} download target="_blank" rel="noreferrer">
                        <DownloadOutlined />
                    </a>
                    <span onClick={() => onDelete(record.sort)} className="f-danger f-cp">
                        <DeleteOutlined />
                    </span>
                </Space>
            )
        }
    ];

    return <Table style={{ marginTop: 20 }} rowKey="sort" columns={columns} dataSource={list} pagination={false} />;
};

export default SectionTable;
