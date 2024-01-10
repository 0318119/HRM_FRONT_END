import React, { useEffect, useState } from "react";
import "./assets/css/TAPersonalform.css";
import { SimpleButton } from "../components/basic/button";
import { CancelButton } from '../components/basic/button/index'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from '../components/basic/input/formInput';
import * as AppointSalaryForm_Actions from "../store/actions/Appointments/AppointSalaryForm/index";
import { message } from 'antd';
import { Table } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


function TASalaryForm({
    cancel, mode,
    isCode, page,
    Red_AppointSalary, GetEmployeeInfo,
    EmployeeSalaryAmount, GetSalaryByCode,
    SalaryAlowanceCall }) {
    const [postAllownces, setpostAllownces] = useState([])
    const allownceData = Red_AppointSalary?.getAllowance?.[0]?.res
    const getAllowanceAmount = Red_AppointSalary?.getAmount?.[0]?.res
    const empInfoCall = Red_AppointSalary?.data?.[0]?.res
    const [isFirstTime, setFirstTime] = useState("N")
    const [isLoading, setLoading] = useState(false)
    const [isTotal, setTotal] = useState(0)
    const [isShow,setShow] = useState(true)

    const EditBack = () => {
        cancel('read')
    }

    // IN THIS BELOW CODE SHOW OF ALL ALLOWNCES NAMES AND CODES =================================================
    useEffect(() => {
        const temp = []
        if (getAllowanceAmount?.data[0]?.length == 0) {
            if (allownceData?.data?.length > 0) {
                for (var i of allownceData?.data) {
                    i.amount = 0
                    var obj = {
                        "code": i?.allowance_code,
                        "amount": 0
                    }
                    setFirstTime("Y")
                    temp.push(obj)
                    setpostAllownces([...temp])
                }
            }
        }
    }, [allownceData, getAllowanceAmount])

    // IN THIS BELOW CODE SHOW OF JUST AMOUNT =================================
    useEffect(() => {
        const temp = []
        if (getAllowanceAmount?.data?.length > 0) {
            for (var i of getAllowanceAmount?.data[0]) {
                temp.push({
                    "code": i?.Allowance_code,
                    "amount": i?.Amount
                })
                setFirstTime("N")
                setpostAllownces(temp)
            }
        }
    }, [getAllowanceAmount, allownceData])


    useEffect(() => {
        var tempTotal = 0;
        for (var i of postAllownces) {
            const parsedAmount = parseInt(i?.amount);
            if (!isNaN(parsedAmount)) {
                tempTotal = tempTotal + parsedAmount;
            }
        }
        setTotal(tempTotal);
    }, [postAllownces, isTotal]);



    // SET EMPLYEE INFO WHEN SHOW ABOVE ON PAGE =========
    useEffect(() => {
        reset({
            Emp_name: empInfoCall?.data?.[0]?.Emp_name,
            Desig_name: empInfoCall?.data?.[0]?.Desig_name,
            Dept_name: empInfoCall?.data?.[0]?.Dept_name,
        })
    }, [empInfoCall?.data?.[0]])

    useEffect(() => {
        GetEmployeeInfo(isCode)
        EmployeeSalaryAmount(isCode)
        SalaryAlowanceCall()
    }, [])

    // CREATE EMPLOYEE SALARY API CALL ============================
    const postData = async (e) => {
        setLoading(true)
        e.preventDefault()
        const res = await GetSalaryByCode({
            Sequence_no: isCode,
            FirstTimeFlag: isFirstTime,
            allownces: postAllownces
        })
        if (res?.success) {
            message.success(res?.messsage || res?.message)
            setTimeout(() => {
                cancel('read')
            }, 2000);
            setLoading(false)
        } else {
            message.success(res?.messsage || res?.message)
            setLoading(false)
        }
        setLoading(false)
    }

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(),
    });

    // TABLE COLUMNS
    const columns = [
        {
            title: "Allowance name",
            dataIndex: "Allowance_name",
            key: "Allowance_name",
        },
        {
            title: "Allowance Code",
            dataIndex: "allowance_code",
            key: "allowance_code"
        },
        {
            title: "Amount",
            key: "Amount",
            render: (data, Amount, index,) => {
                return (
                    <>
                    {
                        isShow ?
                        <span onClick={() => {setShow(false)}}>
                            {postAllownces.filter(items => items?.code == data?.allowance_code)[0]?.amount}
                        </span>
                        :
                        <input
                            className="form-control"
                            defaultValue={
                                postAllownces.filter(items => items?.code == data?.allowance_code)[0]?.amount
                            }
                            type="number"
                            placeholder="Amount"
                            name={data?.allowance_code}
                            onChange={(e) => {
                                postAllownces[index].amount = e.target.value
                                setpostAllownces([...postAllownces])
                            }}
                        />
                    }
                    </>
                )
            }
        },
    ];

    // API ERRORS HANDLING WHEN GIVE API RESPONSE FAILED ===========
    if (allownceData?.messsage == "failed" || allownceData?.message == "failed") {
        message.error(`Get All Allownces : ${allownceData?.messsage || allownceData?.message}`)
    } else if (getAllowanceAmount?.messsage == "failed" || getAllowanceAmount?.message == "failed") {
        message.error(`Get Allownce Amount : ${getAllowanceAmount?.messsage || getAllowanceAmount?.message}`)
    } else if (empInfoCall?.messsage == "failed" || empInfoCall?.message == "failed") {
        message.error(`Employee Info : ${empInfoCall?.messsage || empInfoCall?.message}`)
    }

    return (
        <>
            <form onSubmit={postData}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 maringClass2">
                            <div>
                                <h2 className="text-dark">Salary</h2>
                                <h4 className="text-dark">Employee Salary</h4>
                                <Link to="/Appointment" className="backLink text-dark">Back</Link>
                                <hr />
                                <div className="form-group formBoxCountry">
                                    <FormInput
                                        label={'Employee Name'}
                                        placeholder={'Employee Name'}
                                        id="Emp_name"
                                        name="Emp_name"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                        readOnly={true}
                                    />
                                    <FormInput
                                        label={'Designation'}
                                        placeholder={'Designation'}
                                        id="Desig_name"
                                        name="Desig_name"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                        readOnly={true}
                                    />
                                    <FormInput
                                        label={'Department'}
                                        placeholder={'Department'}
                                        id="Dept_name"
                                        name="Dept_name"
                                        type="text"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                        readOnly={true}
                                    />
                                </div>
                                <h4 className="text-dark">Salary Break Up</h4>
                                <hr />
                                <div className="">
                                    <Table
                                        columns={columns}
                                        loading={Red_AppointSalary?.loading}
                                        dataSource={allownceData?.data}
                                    />
                                    <span>Total Amount</span>
                                    <span>{isTotal}</span>
                                </div>
                                <div className='CountryBtnBox'>
                                    <CancelButton onClick={EditBack} title={'cancel'} />
                                    <SimpleButton type={'submit'} loading={isLoading} title="Save" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
function mapStateToProps({ Red_AppointSalary }) {
    return { Red_AppointSalary };
}
export default connect(mapStateToProps, AppointSalaryForm_Actions)(TASalaryForm);