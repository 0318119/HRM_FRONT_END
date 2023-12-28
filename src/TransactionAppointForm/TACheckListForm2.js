import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Space, Table, Pagination, Tag, Tooltip, Radio } from 'antd';
import { Button } from "../components/basic/button";
import { PrimaryButton, SimpleButton } from "../components/basic/button";
import * as Appoint_Checklist from "../store/actions/Appointments/AppointChecklist/index"
=======
import Header from "../components/Includes/Header";
import Input from "../components/basic/input";
import { Space, Table, Pagination, Tag, Tooltip,  Radio  } from 'antd';
import { PrimaryButton, SimpleButton } from "../components/basic/button";
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
import { connect } from "react-redux";
import { Popconfirm } from 'antd';
import baseUrl from '../../src/config.json'
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { message } from 'antd';
<<<<<<< HEAD
import { Check, Undo } from "@mui/icons-material";


const TACheckListForm2 = ({ Red_AppointChecklist, getCheckList, isCode, mode, cancel, getCheckedList, CheckList }) => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [isCode2, setCode2] = useState(null)
    const [mode2, setMode2] = useState('read')
=======


const TACheckListForm2 = ({ Red_Cost_centre }) => {
    const [messageApi, contextHolder] = message.useMessage();
    var get_access_token = localStorage.getItem("access_token");
    const [isCode, setCode] = useState(null)
    const [mode, setMode] = useState('read')
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isSearchVal, setSearchVal] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

<<<<<<< HEAD
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

=======

    //   useEffect(() => {
    //     if (isSearchVal == '') {
    //       GetCostCentreData({
    //         pageSize: pageSize,
    //         pageNo: page,
    //         search: null
    //       })
    //     } else {
    //       GetCostCentreData({
    //         pageSize: pageSize,
    //         pageNo: 1,
    //         search: isSearchVal
    //       })
    //     }
    //   }, [page, isSearchVal])

    const EditPage = (mode, code) => {
        setCode(code)
        setMode(mode)
    }

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23

    const columns = [
        {
            title: 'Check',
<<<<<<< HEAD
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
=======
            dataIndex: 'Cost_Centre_code',
            key: 'Cost_Centre_code',
            render: (text, record) => (
                <Radio
                    onChange={() => onSelectChange([record.key])}
                    checked={selectedRowKeys.includes(record.key)}
                />
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
            ),
        },
        {
            title: 'Serial NO',
<<<<<<< HEAD
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
=======
            dataIndex: 'Cost_Centre_name',
            key: 'Cost_Centre_name',
        },
        {
            title: 'Name',
            dataIndex: 'Cost_Centre_abbr',
            key: 'Cost_Centre_abbr',
        },
    ];

    // COST CENTRE FORM DATA DELETE API CALL =========================== 
    async function handleConfirmDelete(id) {
        await fetch(
            `${baseUrl.baseUrl}/employment_cost_center/DeleteCostCenter`, {
            method: "POST",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Cost_Centre_code": id,
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
                    //   GetCostCentreData({
                    //     pageSize: pageSize,
                    //     pageNo: page,
                    //     search: null
                    //   })
                }, 5000);
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
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
                            <>
                                <div className="coslistFlexBox">
                                    <h4 className="text-dark">Transaction - Check List</h4>
                                </div>
                                <hr />
                            </>
                        )}

                        <div>
<<<<<<< HEAD
                            {mode2 == "read" && (
                                <>
                                    <Table
                                        columns={columns}
                                        loading={Red_AppointChecklist?.loading}
                                        dataSource={Red_AppointChecklist?.data?.[0]?.res?.data?.[0]}
                                        scroll={{ x: 10 }}
                                        pagination={false}
=======
                            {mode == "read" && (
                                <>
                                    <Table
                                        columns={columns} loading={Red_Cost_centre?.loading}
                                        dataSource={Red_Cost_centre?.data?.[0]?.res?.data1}
                                        scroll={{ x: 10 }}
                                        pagination={{
                                            defaultCurrent: page,
                                            total: Red_Cost_centre?.data?.[0]?.res?.data3,
                                            onChange: (p) => {
                                                setPage(p);
                                            },
                                            pageSize: pageSize,
                                        }}
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
                                    />
                                </>
                            )}
                        </div>
                        <div className='CountryBtnBox'>
<<<<<<< HEAD
                            <Button onClick={EditBack} title="Cancel" />
                            <Button title="Submit" onClick={SaveCheckList}  />
=======
                            <SimpleButton type={'submit'} title="Submit" />
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

<<<<<<< HEAD
function mapStateToProps({ Red_AppointChecklist }) {
    return { Red_AppointChecklist };
}
export default connect(mapStateToProps, Appoint_Checklist)(TACheckListForm2)

=======
export default TACheckListForm2;
>>>>>>> b892415902efac44d0608bbc5812b9e1830a1e23
