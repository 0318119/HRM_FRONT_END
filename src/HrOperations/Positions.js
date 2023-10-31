import React, { useState } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import PositionsForm from './form/PositionsForm';
import './assets/css/Positions.css'
import { message } from 'antd';
import { Popconfirm } from 'antd';
import { connect } from "react-redux";
import * as POSITIONS_DATA_ACTIONS from '../store/actions/HrOperations/Positions/index'
import baseUrl from '../../src/config.json'




const Positions = ({ GetPositionData, Red_Position }) => {
    const [mode, setMode] = useState('read')

    const columns = [
        {
            title: 'Postion Code',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Division Head',
            dataIndex: 'Division Head',
            key: 'Division Head',
        },
        {
            title: 'Short Key',
            dataIndex: 'Short Key',
            key: 'Short Key',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={() => setMode('Edit')} className="editBtn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <button className="deleteBtn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            Abbreviation: 'New York No. 1 Lake Park',
        },
    ];
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass">

                        {mode == "read" && (
                            <>
                                <div className="PositionsFlexBox">
                                    <h4 className="text-dark">Positions</h4>
                                    <div className="PositionssearchBox">
                                        <Input placeholder={'Search Here...'} type="search" />
                                        <Button title="Create" onClick={() => setMode("create")} />
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <Table columns={columns} dataSource={data} scroll={{ x: 10 }} />
                            )}
                            {mode == "create" && (
                                <PositionsForm cancel={setMode} />
                            )}
                            {mode == "Edit" && (
                                <PositionsForm cancel={setMode} />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

function mapStateToProps({ Red_Position }) {
    return { Red_Position };
}

export default connect(mapStateToProps, POSITIONS_DATA_ACTIONS)(Positions)