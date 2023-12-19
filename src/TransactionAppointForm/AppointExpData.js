import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import TAExperienceForm2 from "../TransactionAppointForm/TAExperienceForm2";
import * as AppointExp_Actions from "../store/actions/Appointments/AppointmentExprience/index"
import "./assets/css/AppointExpData.css";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import baseUrl from '../../src/config.json'
import { message } from 'antd';



const AppointExpData = ({ Red_AppointExprience, GetEmployer, page, isCode, mode, cancel }) => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [page2, setPage2] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isCode2, setCode2] = useState(isCode)
    const [mode2, setMode2] = useState('read')
    const [isSearchVal, setSearchVal] = useState('')

    const EditPage = (mode2, code2) => {
        setCode2(code2)
        setMode2(mode2)
    }
    const EditBack = () => {
        cancel('read')
    }

    useEffect(() => {
        GetEmployer(isCode)
    }, [])

    console.log(isCode,'isCode')
    

    // useEffect(() => {
    //     if (isSearchVal == '') {
    //         getExprience({
    //             pageSize: pageSize,
    //             pageNo: page,
    //             search: null
    //         })
    //     } else {
    //         getExprience({
    //             pageSize: pageSize,
    //             pageNo: 1,
    //             search: isSearchVal
    //         })
    //     }
    // }, [page, isSearchVal])

    console.log(Red_AppointExprience, 'Red_AppointExprience')



    const columns = [
        {
            title: 'Code',
            dataIndex: 'Desig_code',
            key: 'Desig_code',
        },
        {
            title: 'Desig Name',
            dataIndex: 'Desig_name',
            key: 'Desig_name',
        },
        {
            title: 'Desig Abbreviation',
            dataIndex: 'Desig_abbr',
            key: 'Desig_abbr',
        },
        {
            title: 'Sort Key',
            dataIndex: 'Sort_key',
            key: 'Sort_key',
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button onClick={() => EditPage('Edit', data?.Desig_code)} className="editBtn">
                        <FaEdit />
                    </button>
                    <Popconfirm
                        title="Delete the Designation"
                        description="Are you sure to delete the Designation?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            // handleConfirmDelete(data?.Desig_code)
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


    // DESIGNATION FORM DATA DELETE API CALL ===========================
    // async function handleConfirmDelete(id) {
    //     await fetch(
    //         `${baseUrl.baseUrl}/employment_desig/DeleteEmploymentDesignation`, {
    //         method: "POST",
    //         headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
    //         body: JSON.stringify({
    //             "Desig_code": id,
    //         }),
    //     }
    //     ).then((response) => {
    //         return response.json();
    //     }).then(async (response) => {
    //         if (response.success) {
    //             messageApi.open({
    //                 type: 'success',
    //                 content: "You have successfully deleted",
    //             });
    //             setTimeout(() => {
    //                 GetDataDesignation({
    //                     pageSize: pageSize,
    //                     pageNo: 1,
    //                     search: null
    //                 })
    //             }, 5000);
    //         }
    //         else {
    //             messageApi.open({
    //                 type: 'error',
    //                 content: response?.message || response?.messsage,
    //             });
    //         }
    //     }).catch((error) => {
    //         messageApi.open({
    //             type: 'error',
    //             content: error?.message || error?.messsage,
    //         });
    //     });
    // }

    return (
        <>
            
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass2">

                        {mode2 == "read" && (
                            <>
                                <div className="AppointExpFlexBox">
                                    <h4 className="text-dark">Exprience List</h4>
                                    <div className="AppointExpSearchBox">
                                        <Input placeholder={'Search Here...'} type="search"
                                            onChange={(e) => { setSearchVal(e.target.value) }}
                                        />
                                        <Button title="Create" onClick={() => setMode2("create")} />
                                        <Button title="Cancel" onClick={EditBack} />

                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <Table columns={columns}
                                    loading={Red_AppointExprience?.loading}
                                    dataSource={Red_AppointExprience?.data?.[0]?.res?.data1}
                                    scroll={{ x: 10 }}
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_AppointExprience?.data?.[0]?.res?.data3,
                                        onChange: (p) => {
                                            setPage2(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                />
                            )}
                            {mode == "create" && (
                                <TAExperienceForm2 cancel={setMode2} mode={mode2} isCode={null} page2={page2} />
                            )}
                            {mode == "Edit" && (
                                <TAExperienceForm2 cancel={setMode2} isCode={isCode2} page2={page2} />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

function mapStateToProps({ Red_AppointExprience }) {
    return { Red_AppointExprience };
}
export default connect(mapStateToProps, AppointExp_Actions)(AppointExpData)
