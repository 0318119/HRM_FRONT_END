import React, { useEffect, useState } from "react";
import Style from './fixedDeduction.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space } from "antd";
import FixedDeductionForm from "../../../form/transactionPosting/fixedDeduction";
import * as fixedDeduction_Action from "../../../../store/actions/payroll/FixedDeduction/index";
import { connect } from "react-redux";



const FixedDeduction = ({getFixedDeductionData,FixedDeduction}) => {
    const [mode,setMode] = useState('read')
    const [current,setCurrent] = useState()
    const [search, setSearch] = useState(null)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)


    const uniSearch = (w) => {
        if (w == "") {
            setSearch(null)
        }
        else {
            setSearch(w)
            getFixedDeductionData({
                pageSize: pageSize,
                pageNo: pageNo,
                search: w
            })
        }
    }


    const onSearchClick = () => {
        getFixedDeductionData({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }

    useEffect(() => {
        getFixedDeductionData({
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
                <SecondaryHeader isSearch={mode == 'read'?true:false} onSearchClick={onSearchClick} searchParam={uniSearch} title={'Transaction - Fixed Deduction'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                {mode=='read'?
                <Table pagination={{
                    defaultCurrent: pageNo,
                    onChange: (p) => {
                        setPageNo(p);
                    },
                    pageSize: pageSize,
                }} loading={FixedDeduction?.loading} columns={columns} dataSource={FixedDeduction?.data} />
                :
                <FixedDeductionForm cancel={setMode} currentUser={current}/>
                }
            </div>
        </>
    )

}


function mapStateToProps({ FixedDeduction }) {
    return { FixedDeduction };
}
export default connect(mapStateToProps, fixedDeduction_Action)(FixedDeduction);