import React, { useEffect, useState } from "react";
import Style from './advanceSalaryInstallment.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space } from "antd";
import AdvanceSalaryForm from "../../../form/transactionPosting/advanceSalaryInstallment";
import * as advanceSalaryInstallment_Action from "../../../../store/actions/payroll/advanceSalaryInstallment";
import { connect } from "react-redux";



const AdvanceSalaryInstallmentComp = ({ GetEmployeeList, advanceSalaryInstallment }) => {
    const [mode, setMode] = useState('read')
    const [current, setCurrent] = useState()

    const converter = (w, e) => {
        setMode(w)
        setCurrent(e)
    }

    const [search, setSearch] = useState("")
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)


    const uniSearch = (w) => {
        setSearch(w)
        GetEmployeeList({
            pageSize: pageSize,
            pageNo: pageNo,
            search: w,
            searchType: search == "" ? "C" : "N"
        })
    }


    const onSearchClick = () => {
        GetEmployeeList({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search,
            searchType: search == "" ? "C" : "N"
        })
    }

    useEffect(() => {
        GetEmployeeList({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search,
            searchType: search == "" ? "C" : "N"
        })
    }, [])
    const columns = [
        {
            title: 'Code',
            dataIndex: 'emp_code',
            key: 'code',
        },
        {
            title: 'Name',
            dataIndex: 'emp_name',
            key: 'name',
        },
        {
            title: 'Leave category name',
            dataIndex: 'Leave_Category_name',
            key: 'leave_category_name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={() => { converter('edit', _?.emp_code) }} className={Style.editButton}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
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
                <SecondaryHeader isSearch={mode == 'read' ? true : false} onSearchClick={onSearchClick} searchParam={uniSearch} title={'Transaction - Advance Salary Installment'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                {mode == 'read' ?
                    <Table pagination={{
                        defaultCurrent: pageNo,
                        onChange: (p) => {
                            setPageNo(p);
                        },
                        pageSize: pageSize,
                    }} loading={advanceSalaryInstallment?.loading} columns={columns} dataSource={advanceSalaryInstallment?.data} />
                    :
                    <AdvanceSalaryForm cancel={setMode} currentUser={current} />
                }
            </div>
        </>
    )

}


function mapStateToProps({ advanceSalaryInstallment }) {
    return { advanceSalaryInstallment };
}
export default connect(mapStateToProps, advanceSalaryInstallment_Action)(AdvanceSalaryInstallmentComp);