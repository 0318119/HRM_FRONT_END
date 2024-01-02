import React, { useEffect, useState } from "react";
import Style from './addDeduction.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space, Popconfirm, message } from "antd";
import * as AddDeduction_Action from "../../../../store/actions/payroll/addDeduction/index";
import { connect } from "react-redux";
import AddnewLoans from "./addNewDeduction"
import UpdateLoans from "./UpdateDeduction"

const AddDeduction = ({ ListDeduction, addDeduction, DeleteDeduction, getDeductionList }) => {
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
        ListDeduction({
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
            ListDeduction({
                pageSize: pageSize,
                pageNo: pageNo,
                search: w
            })
        }
    }

    const onSearchClick = () => {
        ListDeduction({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }


    const confirmDelete = async (e) => {
        const isDelete = await DeleteDeduction(e)
        if (isDelete?.success == "success") {
            ListDeduction({
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
            dataIndex: 'Deduction_code',
            key: 'Deduction_code',
        },
        {
            title: 'Deduction Name',
            dataIndex: 'Deduction_name',
            key: 'Deduction_name',
        },
        {
            title: 'Abbreviation',
            dataIndex: 'Deduction_abbr',
            key: 'Deduction_abbr',
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
                        setIsUpdate(_?.Deduction_code)
                    }
                    } className={Style.editButton}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirmDelete(_?.Deduction_code)}
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
                <SecondaryHeader isAddNew={isTable ? true : false} isTable={setIsTable} addNewFunction={setAddnew} onSearchClick={onSearchClick} searchParam={uniSearch} title={'Transaction - Deduction'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                {isTable ?
                    <Table pagination={{
                        defaultCurrent: pageNo,
                        onChange: (p) => {
                            setPageNo(p);
                        },
                        pageSize: pageSize,
                    }} loading={addDeduction?.loading} columns={columns} dataSource={addDeduction?.data} />
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


function mapStateToProps({ addDeduction }) {
    return { addDeduction };
}
export default connect(mapStateToProps, AddDeduction_Action)(AddDeduction);