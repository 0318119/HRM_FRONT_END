import React, { useState , useEffect } from 'react'
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
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isCode, setCode] = useState(null)
    const [isSearchVal, setSearchVal] = useState('')
    const [mode, setMode] = useState('read')

    const columns = [
        {
            title: 'Postion Code',
            dataIndex: 'Position_Code',
            key: 'Position_Code'
        },
        {
            title: 'Positon Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Position Active Date',
            dataIndex: 'Division Head',
            key: 'Division Head',
        },
        {
            title: 'Minimum Salary',
            dataIndex: 'Short Key',
            key: 'Short Key',
        },
        {
            title: 'Maximum Salary',
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

    useEffect(() => {
        if (isSearchVal == '') {
            GetPositionData({
                pageSize: pageSize,
                pageNo: page,
                search: null
            })
        } else {
            GetPositionData({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal
            })
        }
    }, [page, isSearchVal])



    return (
        <>
            {contextHolder}
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
                                        <Input placeholder={'Search Here...'} type="search"
                                            onChange={(e) => { setSearchVal(e.target.value) }}
                                        />
                                        <Button title="Create" onClick={() => setMode("create")} />
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <Table 
                                columns={columns}
                                loading={Red_Position?.loading}
                                dataSource={Red_Position?.date} scroll={{ x: 10 }} 
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_Position?.data?.[0]?.res,
                                        onChange: (p) => {
                                            setPage(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                    
                                    />
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