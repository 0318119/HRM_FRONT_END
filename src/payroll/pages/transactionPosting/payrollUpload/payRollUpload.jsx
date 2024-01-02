import React, { useEffect, useState } from "react";
import Style from './payRollUpload.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space } from "antd";
import PayrollUploadDataForm from "../../../form/transactionPosting/payrollUpload";
import * as PayrollUpload_Action from "../../../../store/actions/payroll/payrollUpload/index";
import { connect } from "react-redux";



const PayrollUploadData = ({ getOneTimeAllowance, PayRollUpload }) => {
    const [mode, setMode] = useState('read')
    const [current, setCurrent] = useState()
    const [search, setSearch] = useState(null)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
        getOneTimeAllowance({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }, [])

    const converter = (w, e) => {
        setMode(w)
        setCurrent(e)
    }

    const uniSearch = (w) => {
        if (w == "") {
            setSearch(null)
        }
        else {
            setSearch(w)
            getOneTimeAllowance({
                pageSize: pageSize,
                pageNo: pageNo,
                search: w
            })
        }
    }

    const onSearchClick = () => {
        getOneTimeAllowance({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
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
                    <button onClick={() => { converter('edit', _?.Emp_code) }} className={Style.editButton}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
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
                <SecondaryHeader isSearch={mode == 'read'?true:false} onSearchClick={onSearchClick} searchParam={uniSearch} title={'Transaction - Payroll Upload'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                {mode == 'read' ?
                    <Table pagination={{
                        defaultCurrent: pageNo,
                        onChange: (p) => {
                            setPageNo(p);
                        },
                        pageSize: pageSize,
                    }} loading={PayRollUpload?.loading} columns={columns} dataSource={PayRollUpload?.data} />
                    :
                    <PayrollUploadDataForm cancel={setMode} currentUser={current} />
                }
            </div>
        </>
    )

}


function mapStateToProps({ PayRollUpload }) {
    return { PayRollUpload };
}
export default connect(mapStateToProps, PayrollUpload_Action)(PayrollUploadData);