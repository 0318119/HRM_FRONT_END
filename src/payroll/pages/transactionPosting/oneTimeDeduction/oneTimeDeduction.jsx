import React, { useEffect, useState } from "react";
import Style from './onetimeDeduction.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space } from "antd";
import OneTimeDeductionForm from "../../../form/transactionPosting/oneTimeDeduction";
import * as oneTimeDeduction_Action from "../../../../store/actions/payroll/oneTimeDeduction/index";
import { connect } from "react-redux";



const OneTimeDeduction = ({ getOneTimeDeduction, oneTimeDeduction }) => {
    const [mode, setMode] = useState('read')
    const [current, setCurrent] = useState()
    const [search, setSearch] = useState(null)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)


    const uniSearch = (w) => {
        if (w == "") {
            setSearch(null)
            getOneTimeDeduction({
                pageSize: pageSize,
                pageNo: pageNo,
                search: null
            })
        }
        else {
            setSearch(w)
            getOneTimeDeduction({
                pageSize: pageSize,
                pageNo: pageNo,
                search: w
            })
        }
    }


    const onSearchClick = () => {
        getOneTimeDeduction({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }

    useEffect(() => {
        getOneTimeDeduction({
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
                <SecondaryHeader isSearch={mode == 'read' ? true : false} onSearchClick={onSearchClick} searchParam={uniSearch} title={'Onetime Deduction'} total={''} />
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
                        }} loading={oneTimeDeduction?.loading} columns={columns} dataSource={oneTimeDeduction?.data} />
                        :
                        <OneTimeDeductionForm cancel={setMode} currentUser={current} />
                    }
                </div>
            </div>
        </>
    )

}


function mapStateToProps({ oneTimeDeduction }) {
    return { oneTimeDeduction };
}
export default connect(mapStateToProps, oneTimeDeduction_Action)(OneTimeDeduction);