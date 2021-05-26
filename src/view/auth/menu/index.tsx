import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Tree, Table, Tag, Divider } from 'antd';
import QuestionIcon from '@/components/common/QuestionIcon';
import useFetch from '@/hooks/common/useFetch';
import { MenuItem } from '@/axios/interface';
import { getMenus } from '@/axios';
import { sortData } from '@/utils/tools';
import Del from './components/del-icon';
import Edit from './components/edit-icon';
import './index.less';

const { TreeNode } = Tree;

function Menu() {
    const [menusData, setMenusData] = useState<MenuItem[]>([]);
    const [sourceData, setSourceData] = useState([]);
    const [treeSelect, setTreeSelect] = useState({
        title: '根目录',
        id: '0'
    });
    const { dispatch: dispatchMenus } = useFetch<MenuItem[]>(getMenus, null, false);

    /** 工具 - 递归将扁平数据转换为层级数据 **/
    const dataToJson = useCallback((one: any, data: any) => {
        let kids;
        if (!one) {
            // 第1次递归
            kids = data.filter((item: { parentId: any }) => !item.parentId);
        } else {
            kids = data.filter((item: { parentId: any }) => item.parentId === one.id);
        }
        kids.forEach((item: { children: any }) => (item.children = dataToJson(item, data)));
        return kids.length ? kids : null;
    }, []);

    /** 处理原始数据，将原始数据处理为层级关系 **/
    const makeSourceData = useCallback(
        (data: MenuItem[] | undefined) => {
            const sourceData = dataToJson(null, sortData(data)) || [];
            setSourceData(sourceData);
        },
        [dataToJson]
    );

    /** 递归构建树结构 **/
    const makeTreeDom = (data: any[]) => {
        return data.map(item => {
            if (item.children) {
                return (
                    item.type != 'BUTTON' && (
                        <TreeNode title={item.name} key={`${item.id}`}>
                            {makeTreeDom(item.children)}
                        </TreeNode>
                    )
                );
            } else {
                return item.type != 'BUTTON' && <TreeNode title={item.name} key={`${item.id}`} />;
            }
        });
    };

    /** 点击树目录时触发 **/
    const onTreeSelect = (selectedKeys: any, e: any) => {
        // console.log("选中：", keys, e);
        let treeSelect = { title: '根目录', id: '0' };
        if (e.selected) {
            // 选中
            const p = e.node.props;
            treeSelect = { title: p.title, id: p.eventKey };
        }
        setTreeSelect(treeSelect);
        // setTableData(menusData.filter(item => item.parentId === (Number(treeSelect.id) || 0)));
    };

    // 获取数据
    const getData = useCallback(() => {
        dispatchMenus()
            .then(res => {
                makeSourceData(res); // 结构化数据
                setMenusData(res); // 扁平化数据
            })
            .catch(res => {
                console.log('报错');
            });
    }, [dispatchMenus, makeSourceData]);

    /** 构建表格字段 **/
    const makeColumns = () => {
        const columns = [
            {
                title: '菜单名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '图标',
                dataIndex: 'icon',
                key: 'icon',
                width: '50px',
                render: (text: string) => {
                    return text ? <i className={`${text + ' icon iconfont'}`} /> : '-';
                }
            },
            {
                title: '代码',
                dataIndex: 'code',
                key: 'code',
                render: (text: string, record: any) => {
                    return text ? text : '-';
                }
            },
            {
                title: '链接',
                dataIndex: 'link',
                key: 'link',
                render: (text: string, record: any) => {
                    return text ? `/${text.replace(/^\//, '')}` : '-';
                }
            },
            {
                title: '排序',
                dataIndex: 'sort',
                key: 'sort'
            },
            {
                title: '有效链接',
                dataIndex: 'status',
                key: 'status',
                render: (text: number) => {
                    return text ? '有效' : '无效';
                }
            },
            {
                title: '父级',
                dataIndex: 'parentId',
                key: 'parentId',
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                render: (text: any) => getNameByParentIdId(text)
            },

            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                render: (text: any) => getMenuType(text)
            },
            {
                title: '操作',
                key: 'control',
                width: 180,
                render: (text: any, record: any) => {
                    let controls = [];
                    controls.push(<Edit {...record} callback={getData} action="priview" title="预览" />);
                    controls.push(<Edit {...record} callback={getData} action="edit" title="修改" parentId={treeSelect.id} />);
                    controls.push(<Del {...record} callback={getData} />); // 删除按钮
                    const result: JSX.Element[] = [];
                    controls.forEach((item, index) => {
                        if (index) {
                            // eslint-disable-next-line react/no-array-index-key
                            result.push(<Divider key={`line${index}`} type="vertical" />);
                        }
                        result.push(item);
                    });
                    return result;
                }
            }
        ];
        return columns;
    };

    const getNameByParentIdId = (id: number) => {
        const p = menusData.find(item => item.id === id);
        return p ? p.name : '-';
    };

    const getMenuType = (text: string) => {
        var arr = [
            {
                key: 1,
                type: 'MODEL',
                color: '#87d068',
                name: <QuestionIcon text="模块如果是有效连接则不再菜单上显示。若有疑问咨询:张章">模块</QuestionIcon>
            },
            { key: 2, type: 'MENU', color: '#ff4d4f', name: '导航' },
            {
                key: 3,
                color: '#ccc',
                type: 'BUTTON',
                name: '按钮'
            },
            {
                key: 4,
                color: '#00a6b2',
                type: 'OTHER',
                name: '其他',
                title: '模块是不会在导航上显示的哦！'
            }
        ].filter(item => item.type === text);
        if (!arr) {
            return <span>类型不存在</span>;
        }
        return (
            <Tag color={arr[0].color} title={arr[0].title}>
                {arr[0].name}
            </Tag>
        );
    };

    const tableData = useMemo(() => menusData.filter(item => item.parentId === (Number(treeSelect.id) || 0)), [menusData, treeSelect.id]);

    useEffect(() => {
        setTreeSelect({
            title: '根目录',
            id: '0'
        });
        getData(); // 获取菜单
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="m-menu">
            <div className="m-menu-body">
                <div className="l">
                    <div className="title">目录结构</div>
                    <Tree defaultExpandedKeys={['0']} className="tree" onSelect={onTreeSelect} selectedKeys={[String(treeSelect.id)]}>
                        <TreeNode title="根" key="0">
                            {makeTreeDom(sourceData)}
                        </TreeNode>
                    </Tree>
                </div>
                <div className="r flex-auto">
                    <div className="searchBox">
                        <Edit callback={getData} action="add" title={`+ 添加${treeSelect.title || ''}子菜单`} parentId={treeSelect.id} />
                    </div>
                    <Table
                        rowKey="id"
                        columns={makeColumns()}
                        dataSource={sortData(tableData)}
                        pagination={{
                            pageSize: 10,
                            showQuickJumper: true,
                            showTotal: (total, range) => `共 ${total} 条数据`
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Menu;
