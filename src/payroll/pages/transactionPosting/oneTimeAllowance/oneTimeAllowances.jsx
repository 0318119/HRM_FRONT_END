import React, { useEffect, useState } from "react";
import Style from './onetimeAllowance.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space } from "antd";
import OneTimeAllowanceForm from "../../../form/transactionPosting/oneTimeAllowanceForm";
import * as oneTimeAllowance_Action from "../../../../store/actions/payroll/oneTimeAllowance/index";
import { connect } from "react-redux";



const OneTimeAllowanceS = ({getOneTimeAllowance,oneTimeAllowance}) => {
    const [mode,setMode] = useState('read')
    const [current,setCurrent] = useState()
    useEffect(()=>{
        getOneTimeAllowance()
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
                <Table loading={oneTimeAllowance?.loading} columns={columns} dataSource={oneTimeAllowance?.data[0]} />
                :
                <OneTimeAllowanceForm cancel={setMode} currentUser={current}/>
                }
            </div>
        </>
    )

}


function mapStateToProps({ oneTimeAllowance }) {
    return { oneTimeAllowance };
}
export default connect(mapStateToProps, oneTimeAllowance_Action)(OneTimeAllowanceS);