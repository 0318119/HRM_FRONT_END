import React, { useState, useEffect } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import HolidaysForm from './form/HolidaysForm';
import './assets/css/Trans_Holidays.css'
import * as HOLIDAYS_ACTIONS from "../store/actions/HrOperations/Holidays/index"
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';



const Holidays = ({ Red_Holidays, getHolidaysData }) => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [isCode, setCode] = useState(null)
    const [mode, setMode] = useState('read')
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState('')
    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode)
    }

    const columns = [
        {
            title: 'Holiday Date',
            dataIndex: 'Calendar_Date',
            key: `Calendar_Date`.slice(0, 10),
        },
        {
            title: 'Holiday Type',
            dataIndex: 'Holiday_Type',
            key: 'Holiday_Type',

        },
        {
            title: 'Reasons',
            dataIndex: 'Reason',
            key: 'Reason',
        },
        {
            title: 'Ramdan flag',
            dataIndex: 'ramdan_flag',
            key: 'ramdan_flag',
        },

        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button onClick={() => EditPage('Edit', data?.Calendar_Date)} className="editBtn"><FaEdit /></button>
                    <Popconfirm
                        title="Delete the Cost Grade"
                        description="Are you sure to delete the Grade?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleConfirmDelete(data?.Calendar_Date)
                        }}
                    >
                        <button className="deleteBtn"><MdDeleteOutline /></button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    // HOLIDAYS DATA DELETE API CALL ===========================
    async function handleConfirmDelete(id) {
        await fetch(
            `${baseUrl.baseUrl}/holiday/DeleteHolidays`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Calendar_Date": id,
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                messageApi.open({
                    type: 'success',
                    content: "You have successfully deleted",
                });
                setTimeout(() => {
                    getHolidaysData({
                        pageSize: pageSize,
                        pageNo: page,
                        search: null
                    })
                }, 3000);
            }
            else {
                messageApi.open({
                    type: 'error',
                    content: response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
        });
    }



    useEffect(() => {
        if (isSearchVal == '') {
            getHolidaysData({
                pageSize: pageSize,
                pageNo: page,
                search: null
            })
        } else {
            getHolidaysData({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal
            })
        }
    }, [page, isSearchVal])

    return (
        <>
            <div>
                <Header />
            </div>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass">

                        {mode == "read" && (
                            <>
                                <div className="HolidaysFlexBox">
                                    <h4 className="text-dark">Holidays</h4>
                                    <div className="HolidaysearchBox">
                                        <Input placeholder={'Search Here...'} type="search"
                                            onChange={(e) => { setSearchVal(e.target.value) }}
                                        />
                                        {/* <Button title="Create" onClick={() => setMode("create")} /> */}
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <Table
                                    columns={columns}
                                    scroll={{ x: 10 }}
                                    loading={Red_Holidays?.loading}
                                    dataSource={Red_Holidays?.data?.[0]?.res?.data1}
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_Holidays?.data?.[0]?.res?.data3,
                                        onChange: (p) => {
                                            setPage(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                />
                            )}
                            {/* {mode == "create" && (
                                <HolidaysForm cancel={setMode} />
                            )} */}
                            {mode == "Edit" && (
                                <HolidaysForm cancel={setMode} mode={mode} isCode={isCode} page={page} />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
function mapStateToProps({ Red_Holidays }) {
    return { Red_Holidays };
}

export default connect(mapStateToProps, HOLIDAYS_ACTIONS)(Holidays)