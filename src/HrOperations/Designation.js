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
import baseUrl from '../../src/config.json'
import { message } from 'antd';



const HR_Designations = ({Red_Designation, GetDataDesignation}) => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [isCode, setCode] = useState(null)
    const [mode, setMode] = useState('read')
    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode)
      }

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
                    <button onClick={() => EditPage('Edit', data?.Desig_code)} className="editBtn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <Popconfirm
                        title="Delete the Department"
                        description="Are you sure to delete the Department?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            // handleConfirmDelete(data?.Desig_code)
                            console.log("data?.Desig_code",data?.Desig_code)
                        }}
                    >
                        <button className="deleteBtn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        GetDataDesignation()
    }, [])

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
                    GetDataDesignation()
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
                                        <Input placeholder={'Search Here...'} type="search" />
                                        <Button title="Create" onClick={() => setMode("create")} />
                                    </div>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode == "read" && (
                                <Table columns={columns} loading={Red_Designation?.loading} dataSource={Red_Designation?.data?.[0]?.res?.data?.[0]} scroll={{ x: 10 }} />
                            )}
                            {mode == "create" && (
                                <DesignationForm cancel={setMode} mode={mode} isCode={null} />
                            )}
                            {mode == "Edit" && (
                                <DesignationForm cancel={setMode} isCode={isCode} />
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
