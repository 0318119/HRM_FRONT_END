import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import style from "./assets/css/Transaction_Marriage.module.css"
import Input from "../components/basic/input/index"
import { Button } from "../components/basic/button/index"
import { Space, Table, Tag, Tooltip } from 'antd';
import Marriage_Form from './form/marriage_Form'

const Transaction_Education = () => {
    const [mode, setMode] = useState('read')
    const columns = [
        {
            title: 'Code',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Education Level Name',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Sort Key',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={() => setMode('Edit')} className={style.editButton}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <button className={style.DeleteButton}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    return (
        <>
            <div>
                <Header />
            </div>
            <div className={style.SecondaryMainBody}>
                <div className={style.SecondaryHeader}>
                    <div style={{ display: 'flex', alignItems: 'end' }}>
                        <h2>Transaction Marriage</h2>
                        {mode == 'Edit' ? null :
                            <p style={{ marginLeft: '10px' }}>Total 1,000</p>}
                    </div>
                    
                    {mode !== 'Edit' && mode !== 'Create' ?
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input placeholder={'Search Here...'} />
                        </div>
                        : <Tooltip title="Currently in edit mode">
                            <div className={style.EditModeTag}>{`${mode} Mode`}</div>
                        </Tooltip>
                    }
                </div>
                <div className={style.TableBody}>
                    {mode !== 'Edit' && mode !== 'Create' ?
                        <Table columns={columns} dataSource={data} />
                        :
                        <Marriage_Form mode={mode} cancel={setMode} />
                    }
                </div>
            </div>
        </>
    )
}

export default Transaction_Education;