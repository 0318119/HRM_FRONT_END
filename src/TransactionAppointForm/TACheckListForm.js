import React, { useEffect, useState } from "react";
import { Space, Table, Pagination, Tag, Tooltip, Radio } from 'antd';
import { Button } from "../components/basic/button";
import { PrimaryButton, SimpleButton } from "../components/basic/button";
import * as Appoint_Checklist from "../store/actions/Appointments/AppointChecklist/index"
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';
import { Check, Undo } from "@mui/icons-material";


const TACheckListForm = ({ Red_AppointChecklist, getCheckList, isCode, mode, cancel, getCheckedList, CheckList }) => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [isCode2, setCode2] = useState(null)
    const [mode2, setMode2] = useState('read')
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const EditPage = (mode2, code2) => {
        setCode2(code2)
        setMode2(mode2)
    }
    const EditBack = () => {
        cancel('read')
    }


    useEffect(() => {
        getCheckedList(isCode)
        getCheckList()
    }, [])

    const [listNO, setListNo] = useState([])
    const [FirstTimeFlag, setFirstTimeFlag] = useState("")
    const CheckedList = Red_AppointChecklist?.dataCheck?.[0]?.res?.data?.[0]


    useEffect(() => {
        if (CheckedList?.length > 0) {
            var temp = CheckedList.map(i => ({ "item": i.List_No }));
            setListNo(temp);
        }
    }, [CheckedList]);


    const columns = [
        {
            title: 'Check',
            render: (data) => (
                
                <>
                    <input type="checkbox"
                        checked={listNO.some((list) => list?.item === data?.List_no)}
                        onChange={(e) => {
                            setFirstTimeFlag(e.target.checked ? "Y" : "N");

                            if (listNO.some((list) => list?.item === data?.List_no)) {
                                // If the item is already in the list, remove it
                                const updatedList = listNO.filter((list) => list?.item !== data?.List_no);
                                setListNo(updatedList);
                            } else {
                                // If the item is not in the list, add it
                                const updatedList = [...listNO, { "item": data?.List_no }];
                                setListNo(updatedList);
                            }
                        }}

                        />

                </>
            ),
        },
        {
            title: 'Serial NO',
            dataIndex: 'List_no',
            key: 'List_no',
        },
        {
            title: 'Name',
            dataIndex: 'Item_Name',
            key: 'Item_Name',
        },
    ];


    const SaveCheckList = async (data) => {
        try {
            const response = await CheckList({
                Sequence_no: isCode,
                FirstTimeFlag: FirstTimeFlag,
                items: listNO,
            });

            if (response && response.success) {
                messageApi.success("Save Checklist");
                setTimeout(() => {
                    cancel('read')
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Save Checklist';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while Save Checklist:", error);
            messageApi.error("An error occurred while Save Checklist");
        }
    };

    return (
        <>

            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 maringClass2">

                        {mode2 == "read" && (
                            <>
                                <div className="coslistFlexBox">
                                    <h4 className="text-dark">Transaction - Check List</h4>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
                            {mode2 == "read" && (
                                <>
                                    <Table
                                        columns={columns}
                                        loading={Red_AppointChecklist?.loading}
                                        dataSource={Red_AppointChecklist?.data?.[0]?.res?.data?.[0]}
                                        scroll={{ x: 10 }}
                                        pagination={false}
                                    />
                                </>
                            )}
                        </div>
                        <div className='CountryBtnBox'>
                            <Button onClick={EditBack} title="Cancel" />
                            <Button title="Submit" onClick={SaveCheckList}  />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function mapStateToProps({ Red_AppointChecklist }) {
    return { Red_AppointChecklist };
}
export default connect(mapStateToProps, Appoint_Checklist)(TACheckListForm)

