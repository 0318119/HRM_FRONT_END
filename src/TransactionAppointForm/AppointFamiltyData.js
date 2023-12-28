import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import TAFamilyForm2 from "../TransactionAppointForm/TAFamilyForm2";
import * as AppointFamily_Actions from "../store/actions/Appointments/AppointFamily/index"
import "./assets/css/AppointFamily.css";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import baseUrl from '../../src/config.json'
import { message } from 'antd';



const AppointFamilyData = ({ Red_AppointFamily, GetMarriage, GetChildren, page, isCode, mode, cancel }) => {
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
        GetMarriage(isCode)
        GetChildren(isCode)
    }, [])




    // console.log(Red_AppointFamily?.getChlidren?.[0]?.res?.data?.[0], 'Red_AppointFamily')

    const columns = [
        {
            title: 'Spouse Name',
            dataIndex: 'Spause_name',
            key: 'Spause_name',
        },
        {
            title: 'Spouse DOB',
            dataIndex: 'Spause_DOB',
            key: 'Spause_DOB',
        },
        {
            title: 'Marriage Date',
            dataIndex: 'Marriage_Date',
            key: 'Marriage_Date',
        },

        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button onClick={() => EditPage('Edit', data?.Emp_Code)} className="editBtn">
                        <FaEdit />
                    </button>
                    <Popconfirm
                        title="Delete the Exprience"
                        description="Are you sure to delete the Exprience?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleConfirmDelete(data?.ID)
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

    const columns2 = [
        {
            title: 'Child Name',
            dataIndex: 'Fam_Member_Name',
            key: 'Fam_Member_Name',
        },
        {
            title: 'Child DOB',
            dataIndex: 'Fam_Member_DOB',
            key: 'Fam_Member_DOB',
        },
        {
            title: 'Child Gender',
            dataIndex: 'Fam_Member_Type',
            key: 'Fam_Member_Type',
        },

        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button onClick={() => EditPage('Edit', data?.Emp_Code)} className="editBtn">
                        <FaEdit />
                    </button>
                    <Popconfirm
                        title="Delete the Exprience"
                        description="Are you sure to delete the Exprience?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleConfirmDelete(data?.ID)
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
    async function handleConfirmDelete(id) {
        await fetch(
            `${baseUrl.baseUrl}/employement_experience/deleteTranExperience`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "id": id,
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
                    // GetEmployer({
                    //     // pageSize: pageSize,
                    //     // pageNo: 1,
                    //     search: null
                    // })
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
    return (
        <>

            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass2">

                        {mode2 == "read" && (
                            <>
                                <div className="AppointFamilyFlexBox">
                                    <h4 className="text-dark">Family List</h4>
                                    <div className="AppointFamilySearchBox">
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
                            {mode2 == "read" && (
                                <>
                                    <span>Marriage Details</span>
                                    <Table columns={columns}
                                        loading={Red_AppointFamily?.loading}
                                        dataSource={Red_AppointFamily?.getMarrige?.[0]?.res?.data?.[0]}
                                        pagination={false}
                                    />
                                    <hr className="py-2" />
                                    <span>Children Details</span>
                                    <Table
                                        columns={columns2}
                                        loading={Red_AppointFamily?.loading}
                                        dataSource={Red_AppointFamily?.getChlidren?.[0]?.res?.data?.[0]}
                                        pagination={false}
                                    />
                                </>
                            )}
                            {mode2 == "create" && (
                                <TAFamilyForm2 cancel={setMode2} mode2={mode2} isCode2={isCode2} page2={page2} />
                            )}
                            {mode2 == "Edit" && (
                                <TAFamilyForm2 cancel={setMode2} isCode2={isCode2} page2={page2} />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

function mapStateToProps({ Red_AppointFamily }) {
    return { Red_AppointFamily };
}
export default connect(mapStateToProps, AppointFamily_Actions)(AppointFamilyData)
