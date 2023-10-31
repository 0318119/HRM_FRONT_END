import React, { useEffect, useState } from "react";
import Style from './fixedAllowance.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space } from "antd";
import FixedAllowanceForm from "../../../form/transactionPosting/fixedAllowanceForm";
import * as fixedAllowance_Action from "../../../../store/actions/payroll/fixedAllowance/index";
import { connect } from "react-redux";



const FixedAllowance = ({getFixedAllowance,FixedAllowance}) => {
    const [mode,setMode] = useState('read')
    const [current,setCurrent] = useState()
    useEffect(()=>{
        getFixedAllowance()
    },[])

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
                <SecondaryHeader title={'Transaction - Onetime Allowance'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                {mode=='read'?
                <Table loading={FixedAllowance?.loading} columns={columns} dataSource={FixedAllowance?.data[0]} />
                :
                <FixedAllowanceForm cancel={setMode} currentUser={current}/>
                }
            </div>
        </>
    )

}


function mapStateToProps({ FixedAllowance }) {
    return { FixedAllowance };
}
export default connect(mapStateToProps, fixedAllowance_Action)(FixedAllowance);