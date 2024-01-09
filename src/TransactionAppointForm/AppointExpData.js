import React, { useEffect, useState } from "react";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import TAExperienceForm from "../TransactionAppointForm/TAExperienceForm";
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
    const [isUpdate ,setUpdate] = useState('')
    const [isLoading, setLoading] = useState(false)
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




    useEffect(() => {
     if(mode2 == 'read'){
         GetEmployer(isCode)
     }else{
         GetEmployer(isCode)

     }
    }, [mode2])



    const columns = [
        {
            title: 'Employee Code',
            dataIndex: 'Emp_Code',
            key: 'Emp_Code',
        },
        {
            title: 'Employer_Code',
            dataIndex: 'Employer_Code',
            key: 'Employer_Code',
        },
        {
            title: 'Designation',
            dataIndex: 'Designation',
            key: 'Designation',
        },
        {
            title: 'Department',
            dataIndex: 'Department',
            key: 'Department',
        },

        {
            title: 'Submit Flag',
            dataIndex: 'Submit_Flag',
            key: 'Submit_Flag',
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button onClick={() => EditPage('Edit', data?.Emp_Code, setUpdate(data?.ID))} className="editBtn">
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
                    cancel('read')
                    GetEmployer({
                        // pageSize: pageSize,
                        // pageNo: 1,
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
                                <Table columns={columns}
                                    loading={Red_AppointExprience?.loading}
                                    dataSource={Red_AppointExprience?.getEmp?.[0]?.res.data?.[0]}
                                    scroll={{ x: 10 }}
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_AppointExprience?.getEmp?.[0]?.res.data,
                                        onChange: (p) => {
                                            setPage2(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                />
                            )}
                            {mode2 == "create" && (
                                <TAExperienceForm cancel={setMode2} mode2={mode2} isCode2={isCode2} page2={page2} />
                            )}
                            {mode2 == "Edit" && (
                                <TAExperienceForm cancel={setMode2} isUpdate={isUpdate} isCode2={isCode2} page2={page2} />
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
