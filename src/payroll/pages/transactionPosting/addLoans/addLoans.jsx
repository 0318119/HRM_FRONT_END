import React, { useEffect, useState } from "react";
import Style from './addLoans.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space, Popconfirm, message } from "antd";
import * as AddLoans_Action from "../../../../store/actions/payroll/addLoans/index";
import { connect } from "react-redux";
import AddnewLoans from "./addNewLoans"
import UpdateLoans from "./UpdateLoans"

const AddLoans = ({ ListLoans, addLoans, DeleteLoans, getDeductionList }) => {
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
        ListLoans({
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
            ListLoans({
                pageSize: pageSize,
                pageNo: pageNo,
                search: w
            })
        }
    }

    const onSearchClick = () => {
        ListLoans({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }


    const confirmDelete = async (e) => {
        const isDelete = await DeleteLoans(e)
        if (isDelete?.success == "success") {
            ListLoans({
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
            dataIndex: 'Loan_code',
            key: 'Loan_code',
        },
        {
            title: 'Loan Name',
            dataIndex: 'Loan_name',
            key: 'Loan_name',
        },
        {
            title: 'Abbreviation',
            dataIndex: 'Loan_abbr',
            key: 'Loan_abbr',
        },
        {
            title: 'Deduction Name',
            dataIndex: 'deduction_name',
            key: 'deduction_name',
        },
        {
            title: 'PF Flag',
            dataIndex: 'PF_Flag',
            key: 'PF_Flag',
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
                        setIsUpdate(_?.Loan_code)
                    }
                    } className={Style.editButton}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirmDelete(_?.Loan_code)}
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
                <SecondaryHeader isAddNew={isTable ? true : false} isTable={setIsTable} addNewFunction={setAddnew} onSearchClick={onSearchClick} searchParam={uniSearch} title={'Transaction - Loans'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                {isTable ?
                    <Table pagination={{
                        defaultCurrent: pageNo,
                        onChange: (p) => {
                            setPageNo(p);
                        },
                        pageSize: pageSize,
                    }} loading={addLoans?.loading} columns={columns} dataSource={addLoans?.data} />
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


function mapStateToProps({ addLoans }) {
    return { addLoans };
}
export default connect(mapStateToProps, AddLoans_Action)(AddLoans);