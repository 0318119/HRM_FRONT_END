import React, { useEffect, useState } from "react";
import Style from './addAllowance.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space, Popconfirm, message } from "antd";
import * as AddAllowance_Action from "../../../../store/actions/payroll/addAllowance/index";
import { connect } from "react-redux";
import AddnewLoans from "./addNewAllowance"
import UpdateLoans from "./UpdateAllownace"

const AddAllowance = ({ ListAllownace, addAllowance, DeleteAllowance, getAllowanceList }) => {
    const [search, setSearch] = useState(null)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [addNew, setAddnew] = useState()
    const [isTable, setIsTable] = useState(true)
    const [isUpdate, setIsUpdate] = useState('')

    useEffect(() => {
        setIsUpdate('')
    }, [addNew])

    useEffect(() => {
        ListAllownace({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }, [isTable])

    const uniSearch = (w) => {
        if (w == "") {
            setSearch(null)
        }
        else {
            setSearch(w)
            ListAllownace({
                pageSize: pageSize,
                pageNo: pageNo,
                search: w
            })
        }
    }

    const onSearchClick = () => {
        ListAllownace({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }


    const confirmDelete = async (e) => {
        const isDelete = await DeleteAllowance(e)
        if (isDelete?.success == "success") {
            ListAllownace({
                pageSize: pageSize,
                pageNo: pageNo,
                search: search
            })
        }
        else {
            message.error('something went wrong')
        }
    };
    const columns = [
        {
            title: 'Code',
            dataIndex: 'Allowance_code',
            key: 'Allowance_code',
        },
        {
            title: 'Allowance Name',
            dataIndex: 'Allowance_name',
            key: 'Allowance_name',
        },
        {
            title: 'Abbreviation',
            dataIndex: 'Allowance_abbr',
            key: 'Allowance_abbr',
        },
        {
            title: 'Sort Key',
            dataIndex: 'Sort_key',
            key: 'Sort_key',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={() => {
                        setAddnew(false)
                        setIsTable(false)
                        setIsUpdate(_?.Allowance_code)
                    }
                    } className={Style.editButton}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirmDelete(_?.Allowance_code)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className={Style.deleteButton}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <SecondaryHeader isAddNew={isTable ? true : false} isTable={setIsTable} addNewFunction={setAddnew} onSearchClick={onSearchClick} searchParam={uniSearch} title={'Transaction - Allowance'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                {isTable ?
                    <Table pagination={{
                        defaultCurrent: pageNo,
                        onChange: (p) => {
                            setPageNo(p);
                        },
                        pageSize: pageSize,
                    }} loading={addAllowance?.loading} columns={columns} dataSource={addAllowance?.data} />
                    :
                    <>
                        {addNew == false?
                            <UpdateLoans update={isUpdate} addNewFunction={setIsTable} />
                        :
                            <AddnewLoans addNewFunction={setIsTable} />
                        }
                    </>
                }
            </div>
        </>
    )

}


function mapStateToProps({ addAllowance }) {
    return { addAllowance };
}
export default connect(mapStateToProps, AddAllowance_Action)(AddAllowance);