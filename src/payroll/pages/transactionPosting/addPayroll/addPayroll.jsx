import React, { useEffect, useState } from "react";
import Style from './addPayroll.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space, Popconfirm, message } from "antd";
import * as AddPayroll_Action from "../../../../store/actions/payroll/addPayroll/index";
import { connect } from "react-redux";
import AddnewLoans from "./addNewPayroll"
import UpdateLoans from "./UpdatePayroll"

const AddPayroll = ({ ListPayroll, addPayroll, DeleteLoans}) => {
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
        ListPayroll({
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
            ListPayroll({
                pageSize: pageSize,
                pageNo: pageNo,
                search: w
            })
        }
    }

    const onSearchClick = () => {
        ListPayroll({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }


    const confirmDelete = async (e) => {
        const isDelete = await DeleteLoans(e)
        if (isDelete?.success == "success") {
            ListPayroll({
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
            dataIndex: 'Payroll_Category_code',
            key: 'Payroll_Category_code',
        },
        {
            title: 'Payroll Category Name',
            dataIndex: 'Payroll_Category_name',
            key: 'Payroll_Category_name',
        },
        {
            title: 'Abbreviation',
            dataIndex: 'Payroll_Category_abbr',
            key: 'Payroll_Category_abbr',
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
                        setIsUpdate(_?.Payroll_Category_code)
                    }
                    } className={Style.editButton}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirmDelete(_?.Payroll_Category_code)}
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
                <SecondaryHeader isAddNew={isTable ? true : false} isTable={setIsTable} addNewFunction={setAddnew} onSearchClick={onSearchClick} searchParam={uniSearch} title={'Transaction - Payroll'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                {isTable ?
                    <Table pagination={{
                        defaultCurrent: pageNo,
                        onChange: (p) => {
                            setPageNo(p);
                        },
                        pageSize: pageSize,
                    }} loading={addPayroll?.loading} columns={columns} dataSource={addPayroll?.data} />
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


function mapStateToProps({ addPayroll }) {
    return { addPayroll };
}
export default connect(mapStateToProps, AddPayroll_Action)(AddPayroll);