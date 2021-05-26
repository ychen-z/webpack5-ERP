import React from 'react';
import { message } from 'antd';
import AddSection from './add-section';
import TableSection from './table-section';
import { RecordProps, IFieldProps } from './interface';

function Section(props: IFieldProps) {
    const { value = [], onChange } = props;

    // 添加
    const onAdd = (record: RecordProps) => {
        message.success('添加成功');
        onChange && onChange([...value, record]);
    };

    // 编辑
    const onEdit = (record: RecordProps) => {
        let list = value.map(item => (item.sort === record.sort ? { ...item, ...record } : item));
        message.success('修改成功');
        onChange && onChange(list);
    };

    // 删除
    const onDelete = (sort: number) => {
        let list = value.filter(item => item.sort !== sort);
        list = list.map((item, index) => ({ ...item, sort: index })); // 重新计算sort值
        message.success('删除成功');
        onChange && onChange(list);
    };

    // 排序(sortType: true升序、false降序)
    const onSort = (sort: number, sortType: boolean) => {
        value[sort] = value.splice(sortType ? sort - 1 : sort + 1, 1, value[sort])[0];
        let list = value.map((item, index) => ({ ...item, sort: index })); // 重新计算sort值
        onChange && onChange(list);
    };

    return (
        <>
            <AddSection onOk={onAdd} totalCount={value.length} />
            {!!value.length && <TableSection onEdit={onEdit} onDelete={onDelete} onSort={onSort} list={value} />}
        </>
    );
}

export default Section;
