import React, { useEffect, useState } from "react";
import Style from './addLoans.module.css'
import Header from "../../../../components/Includes/Header";
import SecondaryHeader from "../../../component/secondaryHeader";
import { Table, Space } from "antd";
import * as AddLoans_Action from "../../../../store/actions/payroll/addLoans/index";
import { connect } from "react-redux";



const AddLoans = ({ ListLoans,addLoans }) => {
    const [search, setSearch] = useState(null)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
        ListLoans({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }, [])


    const uniSearch = (w) => {
        if (w == "") {
            setSearch(null)
        }
        else {
            setSearch(w)
            ListLoans({
                pageSize: pageSize,
                pageNo: pageNo,
                search: w
            })
        }
    }

    const onSearchClick = () => {
        ListLoans({
            pageSize: pageSize,
            pageNo: pageNo,
            search: search
        })
    }
    const columns = [
        {
            title: 'Code',
            dataIndex: 'Loan_code',
            key: 'Loan_code',
        },
        {
            title: 'Loan Name',
            dataIndex: 'Loan_name',
            key: 'Loan_name',
        },
        {
            title: 'Abbreviation',
            dataIndex: 'Loan_abbr',
            key: 'Loan_abbr',
        },
        {
            title: 'Deduction Name',
            dataIndex: 'deduction_name',
            key: 'deduction_name',
        },
        {
            title: 'PF Flag',
            dataIndex: 'PF_Flag',
            key: 'PF_Flag',
        },
        {
            title: 'Sort Key',
            dataIndex: 'Sort_key',
            key: 'Sort_key',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button className={Style.editButton}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                </Space>
            ),
        },
    ];

    console.log(addLoans?.data,'data,loadnf')
    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                <SecondaryHeader onSearchClick={onSearchClick} searchParam={uniSearch} title={'Transaction - Onetime Allowance'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                <Table pagination={{
                    defaultCurrent: pageNo,
                    onChange: (p) => {
                        setPageNo(p);
                    },
                    pageSize: pageSize,
                }} loading={addLoans?.loading} columns={columns} dataSource={addLoans?.data} />
            </div>
        </>
    )

}


function mapStateToProps({ addLoans }) {
    return { addLoans };
}
export default connect(mapStateToProps, AddLoans_Action)(AddLoans);