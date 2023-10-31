import React, { useEffect, useState } from "react";
import Style from './onetimeDeduction.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space } from "antd";
import OneTimeDeductionForm from "../../../form/transactionPosting/oneTimeDeduction";
import * as oneTimeDeduction_Action from "../../../../store/actions/payroll/oneTimeDeduction/index";
import { connect } from "react-redux";



const OneTimeDeduction = ({getOneTimeDeduction,oneTimeDeduction}) => {
    const [mode,setMode] = useState('read')
    const [current,setCurrent] = useState()
    useEffect(()=>{
        getOneTimeDeduction()
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
                <SecondaryHeader title={'Transaction - Onetime Deduciton'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                {mode=='read'?
                <Table loading={oneTimeDeduction?.loading} columns={columns} dataSource={oneTimeDeduction?.data[0]} />
                :
                <OneTimeDeductionForm cancel={setMode} currentUser={current}/>
                }
            </div>
        </>
    )

}


function mapStateToProps({ oneTimeDeduction }) {
    return { oneTimeDeduction };
}
export default connect(mapStateToProps, oneTimeDeduction_Action)(OneTimeDeduction);