import React, { useEffect, useState } from "react";
import Style from './salaryHold.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space } from "antd";
import SalaryHoldForm from "../../../form/transactionPosting/salaryHold";
import * as salaryHold_Action from "../../../../store/actions/payroll/salaryHold/index";
import { connect } from "react-redux";



const SalaryHoldMain = ({getFixedAllowance,salaryHold}) => {
    const [mode,setMode] = useState('read')
    const [current,setCurrent] = useState()
    const [search, setSearch] = useState(null)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)


    const uniSearch = (w) => {
        console.log(w)
        if (w == "") {
            setSearch(null)
        }
        else {
            setSearch(w)
            getFixedAllowance({
                pageSize: pageSize,
                pageNo: pageNo,
                search: w
            })
        }
    }


    const onSearchClick = () => {
        getFixedAllowance({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }

    useEffect(() => {
        getFixedAllowance({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }, [])

    const converter=(w,e)=>{
        setMode(w)
        setCurrent(e)
    }
    const columns = [
        {
            title: 'Code',
            dataIndex: 'Emp_code',
            key: 'code',
        },
        {
            title: 'Name',
            dataIndex: 'Emp_name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={()=>{converter('edit',_?.Emp_code)}} className={Style.editButton}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
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
                <SecondaryHeader isSearch={mode == 'read'?true:false} onSearchClick={onSearchClick} searchParam={uniSearch} title={'Transaction - Salary Hold'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                {mode=='read'?
                <Table pagination={{
                    defaultCurrent: pageNo,
                    onChange: (p) => {
                        setPageNo(p);
                    },
                    pageSize: pageSize,
                }} loading={salaryHold?.loading} columns={columns} dataSource={salaryHold?.data} />
                :
                <SalaryHoldForm cancel={setMode} currentUser={current}/>
                }
            </div>
        </>
    )

}


function mapStateToProps({ salaryHold }) {
    return { salaryHold };
}
export default connect(mapStateToProps, salaryHold_Action)(SalaryHoldMain);