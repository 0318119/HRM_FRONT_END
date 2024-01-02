import React, { useEffect, useState } from "react";
import * as FixedDeduction_Action from "../../../store/actions/payroll/advanceSalaryInstallment/index";
import { connect } from "react-redux";
import Input from '../../../components/basic/input/index'
import Select from '../../../components/basic/input/select'
import { Skeleton, message } from "antd";
import { Button, CancelButton, DeleteButton } from '../../../components/basic/button/index';

const OneTimeAllowanceForm = ({getAllowanceList_Fixed,DeleteAllowanceDetail,getDeductionEmployeeData, currentUser, getAllowanceDetail, saveAllowanceDetail, cancel }) => {
    const [employee, setEmployee] = useState()
    const [loader, setLoader] = useState(false)
    const [isNext, setIsNext] = useState(false)
    const [loading, setLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false)
    const [allowanceList, setAllowanceList] = useState()
    const [monthList, setmonthList] = useState([
        {
            "value": 1,
            "label": "January"
        },
        {
            "value": 2,
            "label": "February"
        },
        {
            "value": 3,
            "label": "March"
        },
        {
            "value": 4,
            "label": "April"
        },
        {
            "value": 5,
            "label": "May"
        },
        {
            "value": 6,
            "label": "June"
        },
        {
            "value": 7,
            "label": "July"
        },
        {
            "value": 8,
            "label": "August"
        },
        {
            "value": 9,
            "label": "September"
        },
        {
            "value": 10,
            "label": "October"
        },
        {
            "value": 11,
            "label": "November"
        },
        {
            "value": 12,
            "label": "December"
        }
    ])
    const [monthSalary, setMonthSalary] = useState([
        {
            "value": 1930,
            "label": "1930"
        },
        {
            "value": 1931,
            "label": "1931"
        },
        {
            "value": 1932,
            "label": "1932"
        },
        {
            "value": 1933,
            "label": "1933"
        },
        {
            "value": 1934,
            "label": "1934"
        },
        {
            "value": 1935,
            "label": "1935"
        },
        {
            "value": 1936,
            "label": "1936"
        },
        {
            "value": 1937,
            "label": "1937"
        },
        {
            "value": 1938,
            "label": "1938"
        },
        {
            "value": 1939,
            "label": "1939"
        },
        {
            "value": 1940,
            "label": "1940"
        },
        {
            "value": 1941,
            "label": "1941"
        },
        {
            "value": 1942,
            "label": "1942"
        },
        {
            "value": 1943,
            "label": "1943"
        },
        {
            "value": 1944,
            "label": "1944"
        },
        {
            "value": 1945,
            "label": "1945"
        },
        {
            "value": 1946,
            "label": "1946"
        },
        {
            "value": 1947,
            "label": "1947"
        },
        {
            "value": 1948,
            "label": "1948"
        },
        {
            "value": 1949,
            "label": "1949"
        },
        {
            "value": 1950,
            "label": "1950"
        },
        {
            "value": 1951,
            "label": "1951"
        },
        {
            "value": 1952,
            "label": "1952"
        },
        {
            "value": 1953,
            "label": "1953"
        },
        {
            "value": 1954,
            "label": "1954"
        },
        {
            "value": 1955,
            "label": "1955"
        },
        {
            "value": 1956,
            "label": "1956"
        },
        {
            "value": 1957,
            "label": "1957"
        },
        {
            "value": 1958,
            "label": "1958"
        },
        {
            "value": 1959,
            "label": "1959"
        },
        {
            "value": 1960,
            "label": "1960"
        },
        {
            "value": 1961,
            "label": "1961"
        },
        {
            "value": 1962,
            "label": "1962"
        },
        {
            "value": 1963,
            "label": "1963"
        },
        {
            "value": 1964,
            "label": "1964"
        },
        {
            "value": 1965,
            "label": "1965"
        },
        {
            "value": 1966,
            "label": "1966"
        },
        {
            "value": 1967,
            "label": "1967"
        },
        {
            "value": 1968,
            "label": "1968"
        },
        {
            "value": 1969,
            "label": "1969"
        },
        {
            "value": 1970,
            "label": "1970"
        },
        {
            "value": 1971,
            "label": "1971"
        },
        {
            "value": 1972,
            "label": "1972"
        },
        {
            "value": 1973,
            "label": "1973"
        },
        {
            "value": 1974,
            "label": "1974"
        },
        {
            "value": 1975,
            "label": "1975"
        },
        {
            "value": 1976,
            "label": "1976"
        },
        {
            "value": 1977,
            "label": "1977"
        },
        {
            "value": 1978,
            "label": "1978"
        },
        {
            "value": 1979,
            "label": "1979"
        },
        {
            "value": 1980,
            "label": "1980"
        },
        {
            "value": 1981,
            "label": "1981"
        },
        {
            "value": 1982,
            "label": "1982"
        },
        {
            "value": 1983,
            "label": "1983"
        },
        {
            "value": 1984,
            "label": "1984"
        },
        {
            "value": 1985,
            "label": "1985"
        },
        {
            "value": 1986,
            "label": "1986"
        },
        {
            "value": 1987,
            "label": "1987"
        },
        {
            "value": 1988,
            "label": "1988"
        },
        {
            "value": 1989,
            "label": "1989"
        },
        {
            "value": 1990,
            "label": "1990"
        },
        {
            "value": 1991,
            "label": "1991"
        },
        {
            "value": 1992,
            "label": "1992"
        },
        {
            "value": 1993,
            "label": "1993"
        },
        {
            "value": 1994,
            "label": "1994"
        },
        {
            "value": 1995,
            "label": "1995"
        },
        {
            "value": 1996,
            "label": "1996"
        },
        {
            "value": 1997,
            "label": "1997"
        },
        {
            "value": 1998,
            "label": "1998"
        },
        {
            "value": 1999,
            "label": "1999"
        },
        {
            "value": 2000,
            "label": "2000"
        },
        {
            "value": 2001,
            "label": "2001"
        },
        {
            "value": 2002,
            "label": "2002"
        },
        {
            "value": 2003,
            "label": "2003"
        },
        {
            "value": 2004,
            "label": "2004"
        },
        {
            "value": 2005,
            "label": "2005"
        },
        {
            "value": 2006,
            "label": "2006"
        },
        {
            "value": 2007,
            "label": "2007"
        },
        {
            "value": 2008,
            "label": "2008"
        },
        {
            "value": 2009,
            "label": "2009"
        },
        {
            "value": 2010,
            "label": "2010"
        },
        {
            "value": 2011,
            "label": "2011"
        },
        {
            "value": 2012,
            "label": "2012"
        },
        {
            "value": 2013,
            "label": "2013"
        },
        {
            "value": 2014,
            "label": "2014"
        },
        {
            "value": 2015,
            "label": "2015"
        },
        {
            "value": 2016,
            "label": "2016"
        },
        {
            "value": 2017,
            "label": "2017"
        },
        {
            "value": 2018,
            "label": "2018"
        },
        {
            "value": 2019,
            "label": "2019"
        },
        {
            "value": 2020,
            "label": "2020"
        },
        {
            "value": 2021,
            "label": "2021"
        },
        {
            "value": 2022,
            "label": "2022"
        },
        {
            "value": 2023,
            "label": "2023"
        },
        {
            "value": 2024,
            "label": "2024"
        },
        {
            "value": 2025,
            "label": "2025"
        }
    ])
    const [allowanceDetail, setAllowanceDetail] = useState({
        Reference: "",
        Advance_Date: "",
        Advance_Amount: "",
        Total_Installment: "",
        Monthly_Installment_Amount: "",
        Starting_Month: "",
        Starting_Year: "",
        Interest_Rate: "",
        Emp_code:"",
        payroll_month:"",
        payroll_year:"",
        Loan_Code:"",
    })
    const reset = () => {
        cancel('read')
        setAllowanceDetail({
            Reference: "",
            Advance_Date: "",
            Advance_Amount: "",
            Total_Installment: "",
            Monthly_Installment_Amount: "",
            Starting_Month: "",
            Starting_Year: "",
            Interest_Rate: "",
            Loan_Code:"",
        })
    }
    useEffect(() => {
        DataLoader()
    }, [])
    const DataLoader = async () => {
        setLoader(true)
        const employeeData = await getDeductionEmployeeData({ Emp_code: currentUser })
        const allowanceList = await getAllowanceList_Fixed()
        setAllowanceList(allowanceList)
        setEmployee(employeeData[0]);
        setLoader(false)
    }
    const saveAllowance = async () => {
        setLoading(true)
        const AllowanceSave = await saveAllowanceDetail(allowanceDetail)
        if (AllowanceSave.success == "success") {
            message.success('Allowance Created');
            setLoading(false)
            reset()
        }
        setLoading(false)
    }

    const OnSelect = async (e) => {
        if (e?.label !== undefined) {
            const AllowanceDetail = await getAllowanceDetail({ Loan_Code: e?.value, Emp_Code: currentUser })
            setAllowanceDetail({
                Emp_code:currentUser,
                payroll_month:AllowanceDetail[0]?.payroll_month == "" && AllowanceDetail[0]?.payroll_month ? "" : AllowanceDetail[0]?.payroll_month,
                payroll_year:AllowanceDetail[0]?.payroll_year == "" && AllowanceDetail[0]?.payroll_year ? "" : AllowanceDetail[0]?.payroll_year,
                Loan_Code: e?.value,
                Loan_Description:AllowanceDetail[0]?.Loan_Description == "" && AllowanceDetail[0]?.Loan_Description ? "" : AllowanceDetail[0]?.Loan_Description,
                Reference: AllowanceDetail[0]?.Reference == "" && AllowanceDetail[0]?.Reference ? "" : AllowanceDetail[0]?.Reference,
                Advance_Date: AllowanceDetail[0]?.Loan_Date == "" && AllowanceDetail[0]?.Loan_Date ? "" : AllowanceDetail[0]?.Loan_Date,
                Advance_Amount: AllowanceDetail[0]?.Principal_Sum == "" && AllowanceDetail[0]?.Principal_Sum ? "" : AllowanceDetail[0]?.Principal_Sum,
                Total_Installment: AllowanceDetail[0]?.Total_Installment == "" && AllowanceDetail[0]?.Total_Installment ? "" : AllowanceDetail[0]?.Total_Installment,
                Monthly_Installment_Amount: AllowanceDetail[0]?.Monthly_Installment_Amount == "" && AllowanceDetail[0]?.Monthly_Installment_Amount ? "" : AllowanceDetail[0]?.Monthly_Installment_Amount,
                Starting_Month: AllowanceDetail[0]?.Starting_Month == "" && AllowanceDetail[0]?.Starting_Month ? "" : AllowanceDetail[0]?.Starting_Month,
                Starting_Year: AllowanceDetail[0]?.Starting_Year == "" && AllowanceDetail[0]?.Starting_Year ? "" : AllowanceDetail[0]?.Starting_Year,
                Interest_Rate: AllowanceDetail[0]?.Interest_Rate == "" && AllowanceDetail[0]?.Interest_Rate ? "" : AllowanceDetail[0]?.Interest_Rate,
            })
            setIsNext(true)
        }
        else {
            setIsNext(false)
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setAllowanceDetail({
            ...allowanceDetail,
            [name]: value
        });
    }

    const handleSelect = (e, name) => {
        console.log(e, name)
        setAllowanceDetail({
            ...allowanceDetail,
            [name]: e.value
        });
    }

    const DeleteAllowance = async () => {
        setDelLoading(true)
        const AllowanceSave = await DeleteAllowanceDetail({
            Emp_Code: currentUser,
            Loan_Code:allowanceDetail.Loan_Code
        })
        if (AllowanceSave.success == "success") {
            message.success('Allowance Deleted');
            setDelLoading(false)
            reset()
        }
        setDelLoading(false)
    }
    return (
        <>
            {loader ? <Skeleton active /> :
                <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input value={employee?.Emp_name} readonly={true} label={'Employee Name'} name={'employeeName'} />
                        <Input value={employee?.Desig_name} readonly={true} label={'Designation'} name={'designation'} />
                        <Input value={employee?.Dept_name} readonly={true} label={'Department'} name={'department'} />
                        <Select type={'loan'} handleChange={OnSelect} label={'Select Allowance'} option={allowanceList} />
                    </div>
                    {isNext &&
                        <>
                            <div style={{ paddingTop: '20px' }}>
                                <h3 style={{ color: 'black' }}>Transaction Information</h3>
                                <hr />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input onChange={handleChange} value={allowanceDetail.Reference} label={'Reference'} name={'Reference'} max={'50'} />
                                <Input onChange={handleChange} value={allowanceDetail.Advance_Date} type={'date'} label={'Advance Date'} name={'Advance_Date'} max={'50'} />
                                <Input onChange={handleChange} value={allowanceDetail.Advance_Amount} label={'Advance Amount'} name={'Advance_Amount'} max={'50'} />
                                <Input onChange={handleChange} value={allowanceDetail.Total_Installment} label={'Total Installment'} name={'Total_Installment'} max={'50'} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Input onChange={handleChange} value={allowanceDetail.Monthly_Installment_Amount} label={'Monthly Installment Amount'} name={'Monthly_Installment_Amount'} />
                                <Select handleChange={(e) => handleSelect(e, 'Starting_Month')} defaultValue={allowanceDetail.Starting_Month} type={'month'} name={'Starting_Month'} label={'Starting Month'} option={monthList} />
                                <Select handleChange={(e) => handleSelect(e, 'Starting_Year')} defaultValue={allowanceDetail.Starting_Year} type={'month'} name={'Starting_Year'} label={'Starting Year'} option={monthSalary} />
                                <Input onChange={handleChange} value={allowanceDetail.Interest_Rate} label={'Interest Rate'} name={'Interest_Rate'} max={'50'} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CancelButton onClick={reset} title={'Cancel'} />
                                    <DeleteButton loading={delLoading} onClick={DeleteAllowance} title={'Delete'} />
                                    <Button loading={loading} onClick={saveAllowance} title={'Save'} />
                                </div>
                            </div>
                        </>}
                </>
            }
        </>
    )
}
function mapStateToProps({ FixedDeduction }) {
    return { FixedDeduction };
}
export default connect(mapStateToProps, FixedDeduction_Action)(OneTimeAllowanceForm);