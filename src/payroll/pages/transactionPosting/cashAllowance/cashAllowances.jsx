import React, { useEffect, useState } from "react";
import Style from './cashAllowance.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space } from "antd";
import CashAllowanceForm from "../../../form/transactionPosting/cashAllowance";
import * as cashAllowance_Action from "../../../../store/actions/payroll/cashAllowance/index";
import { connect } from "react-redux";



const CashAllowance = ({ getCashAllowance, cashAllowance }) => {
    const [mode, setMode] = useState('read')
    const [current, setCurrent] = useState()

    const converter = (w, e) => {
        setMode(w)
        setCurrent(e)
    }

    const [search, setSearch] = useState(null)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)


    const uniSearch = (w) => {
        if (w == "") {
            setSearch(null)
            getCashAllowance({
                pageSize: pageSize,
                pageNo: pageNo,
                search: null
            })
        }
        else {
            setSearch(w)
            getCashAllowance({
                pageSize: pageSize,
                pageNo: pageNo,
                search: w
            })
        }
    }


    const onSearchClick = () => {
        getCashAllowance({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }

    useEffect(() => {
        getCashAllowance({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }, [])
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
                <SecondaryHeader isSearch={mode == 'read' ? true : false} onSearchClick={onSearchClick} searchParam={uniSearch} title={'Cash Allowance'} total={''} />
            </div>
            <div className={Style.TableBody}>
                <div className="container">
                    {mode == 'read' ?
                        <Table pagination={{
                            defaultCurrent: pageNo,
                            onChange: (p) => {
                                setPageNo(p);
                            },
                            pageSize: pageSize,
                        }} loading={cashAllowance?.loading} columns={columns} dataSource={cashAllowance?.data} />
                        :
                        <CashAllowanceForm cancel={setMode} currentUser={current} />
                    }
                </div>
            </div>
        </>
    )

}


function mapStateToProps({ cashAllowance }) {
    return { cashAllowance };
}
export default connect(mapStateToProps, cashAllowance_Action)(CashAllowance);