import React, { useState, useEffect } from 'react'
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import TAEducationForm from './TAEducationForm';
import "../HrOperations/assets/css/Positions.css"
import { message } from 'antd';
import { Popconfirm } from 'antd';
import { connect } from "react-redux";
import * as AppointmentEducation_Actions from "../store/actions/Appointments/AppointEducationForm/index";
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import baseUrl from '../config.json'




const AppointEduData = ({ Red_AppointEducation, GetEducationSavedData, isCode, cancel, GetAppointStatusCall }) => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isCode2, setCode2] = useState(isCode)
    const [isUpdate, setUpdate] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [isSearchVal, setSearchVal] = useState('')
    const [mode2, setMode2] = useState('read')

    const EditPage = (mode2, code2) => {
        setCode2(code2)
        setMode2(mode2)
    }
    const EditBack = () => {
        cancel('read')
    }


    const columns = [
        {
            title: 'Education',
            dataIndex: 'Edu_Code',
            key: 'Edu_Code'
        },
        {
            title: 'Institute',
            dataIndex: 'institute_code',
            key: 'institute_code',
        },
        {
            title: 'Top Flag',
            dataIndex: 'Top_flag',
            key: 'Top_flag',
        },
        {
            title: 'Year',
            dataIndex: 'Edu_Year',
            key: 'Edu_Year',
        },
        {
            title: 'Grade',
            dataIndex: 'Edu_Grade',
            key: 'Edu_Grade',
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button onClick={() => EditPage('Edit', data?.Emp_Code, setUpdate(data?.Sr_No))} className="editBtn">
                        <FaEdit />
                    </button>
                    <Popconfirm
                        title="Delete the Education"
                        description="Are you sure to delete the Education?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleConfirmDelete(data?.Sr_No)
                        }}
                    >
                        <button className="deleteBtn">
                            <MdDeleteOutline />
                        </button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    async function handleConfirmDelete(id) {
        await fetch(
            `${baseUrl.baseUrl}/eduation_code/deleteTranEducation`, {
            method: "POST",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Sr_No": id,
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
                    messageApi.destroy()
                    GetEducationSavedData(isCode)
                }, 3000);
            }
            else {
                messageApi.open({
                    type: 'error',
                    content: response?.message || response?.messsage,
                });
                setTimeout(() => {
                    messageApi.destroy()
                }, 5000);
            }
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
            setTimeout(() => {
                messageApi.destroy()
            }, 5000);
        });
    }

    useEffect(() => {
        if (isSearchVal == '') {
            GetEducationSavedData({
                pageSize: pageSize,
                pageNo: page,
                search: null
            })
        } else {
            GetEducationSavedData({
                pageSize: pageSize,
                pageNo: 1,
                search: isSearchVal
            })
        }
    }, [page, isSearchVal])
    useEffect(() => {
        if (mode2 == "read") {
            GetEducationSavedData(isCode)
        } else {
            GetEducationSavedData(isCode)
        }
    }, [mode2])


    return (
        <>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass2">

                        {mode2 == "read" && (
                            <>
                                <div className="PositionsFlexBox">
                                    <h4 className="text-dark">Education Information</h4>
                                    <div className="PositionssearchBox">
                                        {/* <Input placeholder={'Search Here...'} type="search"
                                            onChange={(e) => { setSearchVal(e.target.value) }}
                                        /> */}
                                        <Button title="Create" onClick={() => setMode2("create")} />
                                        <Button title="Cancel" onClick={EditBack} />
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode2 == "read" && (
                                <Table
                                    columns={columns}
                                    loading={Red_AppointEducation?.loading}
                                    dataSource={Red_AppointEducation?.getSavedData?.[0]?.res?.data}
                                    scroll={{ x: 10 }}
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_AppointEducation?.data?.[0]?.res?.data3,
                                        onChange: (p) => {
                                            setPage(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                />
                            )}
                            {mode2 == "create" && (
                                <TAEducationForm cancel={setMode2} mode2={mode2} isCode2={isCode2} page={page} />
                            )}
                            {mode2 == "Edit" && (
                                <TAEducationForm cancel={setMode2} isUpdate={isUpdate} mode2={mode2} isCode2={isCode2} page={page} />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

function mapStateToProps({ Red_AppointEducation }) {
    return { Red_AppointEducation };
}

export default connect(mapStateToProps, AppointmentEducation_Actions)(AppointEduData)