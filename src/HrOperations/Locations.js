import React, { useState, useEffect } from 'react'
import Header from '../components/Includes/Header';
import Input from "../components/basic/input";
import { Button } from "../components/basic/button";
import { Space, Table, Tag, Tooltip } from 'antd';
import LocationForm from './form/LocationForm';
import './assets/css/LocationList.css'
import * as LOCATION_ACTIONS from "../store/actions/HrOperations/Location/index"
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';




const Locations = ({ Red_Location, getLocationData }) => {
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

console.log(Red_Location , 'Red_Location')
    const columns = [
        {
            title: 'Location code',
            dataIndex: 'Loc_code',
            key: 'Loc_code',
        },
        {
            title: 'Location Name',
            dataIndex: 'Loc_name',
            key: 'Loc_name',

        },
        {
            title: 'Loc_address_line1',
            dataIndex: 'Loc_address_line1',
            key: 'Loc_address_line1',
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
                    <button onClick={() => EditPage('Edit', data)} className="editBtn"><FaEdit /></button>
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
                    getLocationData({
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
            getLocationData({
                pageSize: pageSize,
                pageNo: page,
                search: null
            })
        } else {
            getLocationData({
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
                                <div className="LocationlexBox">
                                    <h4 className="text-dark">Location</h4>
                                    <div className="LocationsearchBox">
                                        <Input placeholder={'Search Here...'} type="search" />
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
                                    scroll={{ x: 10 }}
                                    loading={Red_Location?.loading}
                                    dataSource={Red_Location?.data?.[0]?.res?.data1}
                                    pagination={{
                                        defaultCurrent: page,
                                        total: Red_Location?.data?.[0]?.res?.data3,
                                        onChange: (p) => {
                                            setPage(p);
                                        },
                                        pageSize: pageSize,
                                    }}
                                />
                            )}
                            {mode == "create" && (
                                <LocationForm cancel={setMode} />
                            )}
                            {mode == "Edit" && (
                                <LocationForm cancel={setMode} />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
function mapStateToProps({ Red_Location }) {
    return { Red_Location };
}

export default connect(mapStateToProps, LOCATION_ACTIONS)(Locations)