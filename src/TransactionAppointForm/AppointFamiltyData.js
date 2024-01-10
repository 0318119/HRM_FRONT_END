import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import TAFamilyForm from "./TAFamilyForm";
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
    const [isLoading, setLoading] = useState(false)
    const [mode2, setMode2] = useState('read')
    const [isSearchVal, setSearchVal] = useState('')
    const [update, setUpdate] = useState('')
    const [updateChlid, setUpdateChlid] = useState('')

    const EditPage = (mode2, code2) => {
        setCode2(code2)
        setMode2(mode2)
    }
    const EditBack = () => {
        cancel('read')
    }

    useEffect(() => {
        if(mode2 == 'read'){
            GetMarriage(isCode)
            GetChildren(isCode)
        }else{
            GetMarriage(isCode)
            GetChildren(isCode)
        }
    }, [mode2])



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
                    <button onClick={() => EditPage('Edit', data?.Sequence_no, setUpdate(data?.Sequence_no))} className="editBtn">
                        <FaEdit />
                    </button>
                    <Popconfirm
                        title="Delete the Marriage"
                        description="Are you sure to delete the Marriage?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleMarriageDelete(data?.Sequence_no)
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
                    <button onClick={() => EditPage('Edit2', data?.Sequence_no, setUpdateChlid({Sequence_no: data?.Sequence_no,S_no: data?.S_no}))} className="editBtn">
                        <FaEdit />
                    </button>
                    <Popconfirm
                        title="Delete the Child"
                        description="Are you sure to delete the Child?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleChlidDelete(data?.S_no, data?.Sequence_no)
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

    async function handleMarriageDelete(Sequence_no) {
        // console.log(Sequence_no, 'Sequence_no')
        await fetch(
            `${baseUrl.baseUrl}/marriages/DeleteTranMarriages`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Sequenceno": Sequence_no,
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
                // cancel('read')
                setTimeout(() => {

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
    async function handleChlidDelete(S_no, Sequence_no) {
        console.log(S_no, Sequence_no , 'asdfasdfef')
        await fetch(
            `${baseUrl.baseUrl}/families/DeleteTranFamilies`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Sequenceno": Sequence_no,
                "Sno": S_no
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
                // cancel('read')
                setTimeout(() => {
                    
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
                                <TAFamilyForm cancel={setMode2} mode2={mode2} isCode2={isCode2} page2={page2} />
                            )}
                            {mode2 == "Edit" && (
                                <TAFamilyForm cancel={setMode2} update={update}  isCode2={isCode2} page2={page2} />
                            )}
                            {mode2 == "Edit2" && (
                                <TAFamilyForm cancel={setMode2} updateChlid={updateChlid} isCode2={isCode2} page2={page2} />
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
