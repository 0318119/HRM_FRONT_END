import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import DesignationForm from "./form/DesignationForm";
import * as DESIGNATIONS_ACTIONS from "../store/actions/HrOperations/Designations/index"
import "./assets/css/DesignationsList.css";
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import baseUrl from '../../src/config.json'
import { message } from 'antd';



const HR_Designations = ({Red_Designation, GetDataDesignation}) => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isCode, setCode] = useState(null)
    const [mode, setMode] = useState('read')
    const [isSearchVal,setSearchVal] = useState('')

    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode)
    }

    useEffect(() => {
    if(isSearchVal == ''){
        GetDataDesignation({ 
            pageSize: pageSize,
            pageNo: page,
            search: null
        })
    }else{
        GetDataDesignation({ 
            pageSize: pageSize,
            pageNo: 1,
            search: isSearchVal
        })
    }
    }, [page,isSearchVal])

    const columns = [
        {
            title: 'Code',
            dataIndex: 'Desig_code',
            key: 'Desig_code',
            render: (text) => <a>{text}</a>,
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
                            handleConfirmDelete(data?.Desig_code)
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
            `${baseUrl.baseUrl}/employment_desig/DeleteEmploymentDesignation`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Desig_code": id,
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
                    GetDataDesignation({ 
                        pageSize: pageSize,
                        pageNo: 1,
                        search: null
                    })
                }, 5000);
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
            <div>
                <Header />
            </div>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass">

                        {mode == "read" && (
                            <>
                                <div className="DesignationsFlexBox">
                                    <h4 className="text-dark">Designation List</h4>
                                    <div className="DesignationssearchBox">
                                        <Input placeholder={'Search Here...'} type="search" 
                                            onChange={(e) => {setSearchVal(e.target.value)}}
                                        />
                                        <Button title="Create" onClick={() => setMode("create")} />
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <Table columns={columns} 
                                    loading={Red_Designation?.loading} 
                                    dataSource={Red_Designation?.data?.[0]?.res?.data1} 
                                    scroll={{ x: 10 }} 
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_Designation?.data?.[0]?.res?.data3,
                                        onChange: (p) => {
                                          setPage(p);
                                        },
                                        pageSize: pageSize,
                                      }}
                                />
                            )}
                            {mode == "create" && (
                                <DesignationForm cancel={setMode} mode={mode} isCode={null} page={page}/>
                            )}
                            {mode == "Edit" && (
                                <DesignationForm cancel={setMode} isCode={isCode} page={page}/>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

function mapStateToProps({ Red_Designation }) {
    return { Red_Designation };
}
export default connect(mapStateToProps, DESIGNATIONS_ACTIONS)(HR_Designations)
