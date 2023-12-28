import React, { useState, useEffect } from "react";
import Header from "../components/Includes/Header";
import style from "./assets/css/TransactionFamily.module.css"
import Input from "../components/basic/input/index"
import { Table, Tooltip, Space, Popconfirm } from 'antd';
import TransactionFamilyForm from './form/TransactionFamilyForm'
import * as Transaction_Family_Actions from "../store/actions/Transition/transition_family/index";
import { connect } from "react-redux";


const Transaction_Family = ({ Transition_Family_Get_Byid, Transition_Family, Transition_family, Transition_Family_Delete }) => {
    useEffect(() => {
        Transition_Family()
    }, [])
    const [mode, setMode] = useState('Edit')
    const EditPage = (mode, ControlNo, Emp_code) => {
        Transition_Family_Get_Byid({
            ControlNo: ControlNo,
            Emp_code: Emp_code
        })
        setMode(mode)
    }
    const DeletePage = async (ControlNo, Emp_code) => {
        await Transition_Family_Delete({
            ControlNo: ControlNo,
            Emp_code: Emp_code
        })
        Transition_Family()
    }
    const columns = [
        {
            title: 'Control No',
            dataIndex: 'ControlNo',
            key: 'ControlNo',
        },
        {
            title: 'ESS_Sr_No',
            dataIndex: 'ESS_Sr_No',
            key: 'ESS_Sr_No',
        },
        {
            title: 'Emp_code',
            key: 'Emp_code',
            dataIndex: 'Emp_code',
        },
        {
            title: 'Fam_member_DOB',
            key: 'Fam_member_DOB',
            dataIndex: 'Fam_member_DOB',
        },
        {
            title: 'Fam_member_name',
            key: 'Fam_member_name',
            dataIndex: 'Fam_member_name',
        },
        {
            title: 'Fam_member_type',
            key: 'Fam_member_type',
            dataIndex: 'Fam_member_type',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={() => EditPage('Edit', _.ControlNo, _.Emp_code)} className={style.editButton}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <Popconfirm
                        title="Delete the record"
                        description="Are you sure to delete this record?"
                        onConfirm={() => DeletePage(_.ControlNo, _.Emp_code)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className={style.DeleteButton}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
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
            <div className={style.SecondaryMainBody}>
                <div className={style.SecondaryHeader}>
                    <div style={{ display: 'flex', alignItems: 'end' }}>
                        <h2>Transaction Family</h2>
                        {mode == 'Edit' ? null :
                            <p style={{ marginLeft: '10px' }}>Total 1,000</p>}
                    </div>
                    {mode !== 'Edit' && mode !== 'Create' ?
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input placeholder={'Search Here...'} />
                        </div>
                        : <Tooltip title="Currently in edit mode">
                            <div className={style.EditModeTag}>{`${mode} Mode`}</div>
                        </Tooltip>
                    }
                </div>
                <div className={style.TableBody}>
                    {mode !== 'Edit' && mode !== 'Create' ?
                        <Table loading={Transition_family?.loading} columns={columns} dataSource={Transition_family?.data[0]} />
                        :
                        <TransactionFamilyForm mode={mode} cancel={setMode} />
                    }
                </div>
            </div>
        </>
    )
}

function mapStateToProps({ Transition_family }) {
    return { Transition_family };
}
export default connect(mapStateToProps, Transaction_Family_Actions)(Transaction_Family);
