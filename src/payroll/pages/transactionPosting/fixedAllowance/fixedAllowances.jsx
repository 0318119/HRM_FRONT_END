import React, { useEffect, useState } from "react";
import Style from './fixedAllowance.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space } from "antd";
import FixedAllowanceForm from "../../../form/transactionPosting/fixedAllowanceForm";
import * as fixedAllowance_Action from "../../../../store/actions/payroll/fixedAllowance/index";
import { connect } from "react-redux";



const FixedAllowance = ({ getFixedAllowance, FixedAllowance }) => {
    const [mode, setMode] = useState('read')
    const [current, setCurrent] = useState()
    const [search, setSearch] = useState(null)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)


    const uniSearch = (w) => {
        if (w == "") {
            setSearch(null)
            getFixedAllowance({
                pageSize: pageSize,
                pageNo: pageNo,
                search: null
            })
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

    const converter = (w, e) => {
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
                <SecondaryHeader isSearch={mode == 'read' ? true : false} onSearchClick={onSearchClick} searchParam={uniSearch} title={'Fixed Allowance'} total={''} />
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
                        }} loading={FixedAllowance?.loading} columns={columns} dataSource={FixedAllowance?.data} />
                        :
                        <FixedAllowanceForm cancel={setMode} currentUser={current} />
                    }
                </div>
            </div>
        </>
    )

}


function mapStateToProps({ FixedAllowance }) {
    return { FixedAllowance };
}
export default connect(mapStateToProps, fixedAllowance_Action)(FixedAllowance);