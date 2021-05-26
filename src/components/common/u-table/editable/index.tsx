// @ts-nocheck
import React from 'react';
import { Form } from 'antd';
import { ITableProps } from '../interface';
import Table from '../base-table';

export default (props: ITableProps) => {
    let { columns, form, prefix } = props;

    return (
        <Form.List name="123">
            {(fields, { add, remove }) => {
                columns = columns?.map(item =>
                    item.editable
                        ? {
                              ...item,
                              render: (_: any, field: IObject) => {
                                  const record = form.getFieldValue([prefix, field.name]) || {}; // 单条数据
                                  return (
                                      <Form.Item
                                          {...field}
                                          name={[field.name, item.dataIndex || item.key]}
                                          rules={item.rules}
                                          className="in-cell-field"
                                      >
                                          {item.render && item.render(record[item.dataIndex || item.key], record, field.name)}
                                      </Form.Item>
                                  );
                              }
                          }
                        : {
                              ...item,
                              render: (_: any, field: IObject) => {
                                  const record = form.getFieldValue([prefix, field.name]); // 单条数据
                                  return record[item.dataIndex || item.key] ?? '-';
                              }
                          }
                );

                return <Table dataSource={fields} columns={columns} />;
            }}
        </Form.List>
    );
};
