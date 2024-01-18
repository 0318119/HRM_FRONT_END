import React, { useState, useEffect } from "react";
import { CancelButton, PrimaryButton, Button } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ACTIONS from "../../store/actions/MasterMaintaince/Increment/index";
import { FormInput } from "../../components/basic/input/formInput";
import { message } from "antd";
import { Table } from "antd";
import { Popconfirm, Space } from "antd";

function Incrementform({
    cancel,
    mode,
    isCode,
    status,
    Red_Increment,
    getEmployeeInfo,
    SaveIncreament,
    ProccessIncreament,
    Delete
}) {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const currentDate = new Date().toISOString().split('T')[0]
    const empInfo = Red_Increment?.GetInfo?.[0]?.res
    const [isProcessbtn, setProcessbtn] = useState(false)
    const [isDeleteLeave, setDeleteLeave] = useState(false)
    const [postAllownces, setpostAllownces] = useState([])
    const [isIncrement_Date, setIncrement_Date] = useState(currentDate)
    const [ExistingTotal, setExistingTotal] = useState(0)
    const [RevisedTotal, setRevisedTotal] = useState(0)

    const EditBack = () => {
        cancel("read");
    };

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


    // TABLE COLUMNS Existing
    const columns1 = [
        {
            title: "Allowance name",
            dataIndex: "Allowance_name",
            key: "Allowance_name",
        },
        {
            title: "Allowance Code",
            dataIndex: "Allowance_code",
            key: "Allowance_code"
        },
        {
            title: "Amount",
            key: "Amount",
            render: (data) => {
                return (
                    <>
                        <span>{data?.Amount}</span>
                    </>
                )
            }
        },
    ];

    // TABLE COLUMNS Revised
    const columns2 = [
        {
            title: "Allowance name",
            dataIndex: "Allowance_name",
            key: "Allowance_name",
        },
        {
            title: "Allowance Code",
            dataIndex: "Allowance_code",
            key: "Allowance_code"
        },
        {
            title: "Amount",
            key: "Amount",
            render: (data, Amount, index,) => {
                return (
                    <>
                        <input
                            className="form-control"
                            type="number"
                            placeholder="Amount"
                            name={data?.Allowance_code}
                            onChange={(e) => {
                                postAllownces[index].amount = e.target.value
                                setpostAllownces([...postAllownces])
                            }}
                        />
                    </>
                )
            }
        },
    ];

    const Save = async (e) => {
        e.preventDefault(e)
        if (isIncrement_Date == null) {
            message.error("Increment Date is required")
        } else {
            setLoading(true)
            const Payload = JSON.stringify({
                "Emp_code": isCode,
                "Allowance": postAllownces,
                "Transaction_Date": currentDate,
                "Increment_Date": isIncrement_Date,
            })
            const isSave = await SaveIncreament(Payload)
            if (isSave?.success) {
                setProcessbtn(true)
                setLoading(false)
                message.success("Submitted...")
            } else {
                message.error(isSave?.message || isSave?.messsage)
                setLoading(false)
            }
        }
    };

    const Process = async (e) => {
        e.preventDefault(e)
        if (isIncrement_Date == null) {
            message.error("Increment Date is required")
        } else {
            setLoading(true)
            const Payload = JSON.stringify({
                "Emp_code": isCode,
                "Allowance": postAllownces,
                "Transaction_Date": currentDate,
                "Increment_Date": isIncrement_Date,
            })
            const isSave = await ProccessIncreament(Payload)
            if (isSave?.success) {
                setLoading(false)
                message.success("Process...")
                setTimeout(() => {
                    cancel("read")
                }, [2000])
            } else {
                message.error(isSave?.message || isSave?.messsage)
                setLoading(false)
            }
        }
    };

    const DeleteConfrim = async (code) => {
        const isCheck = await Delete(code)
        if (isCheck?.success) {
            message.success("Deleted...")
        } else {
            message.error(isCheck?.message || isCheck?.messsage)
        }
    }

    useEffect(() => {
        if (isCode !== null) {
            getEmployeeInfo(isCode)
        }
    }, [isCode])

    // FOR INFO ===================================
    useEffect(() => {
        reset({
            Emp_name: empInfo?.data1?.[0]?.[0]?.Emp_name,
            Desig_name: empInfo?.data1?.[0]?.[0]?.Desig_name,
            Dept_name: empInfo?.data1?.[0]?.[0]?.Dept_name,
            Transaction_Date: currentDate,
            Increment_Date: currentDate,
        });
    }, [empInfo?.data1?.[0]?.[0]]);

    // CREATE ALLOWNCES OBJECT =======
    useEffect(() => {
        const temp = []
        if (empInfo?.data2?.[0]?.length > 0) {
            for (var i of empInfo?.data2?.[0]) {
                var obj = {
                    "code": i?.Allowance_code,
                    "amount": 0
                }
                temp.push(obj)
                setpostAllownces([...temp])
            }
        }
    }, [empInfo?.data2?.[0]])

    // TOTAL OF EXISTINGS =====================
    useEffect(() => {
        var tempTotal = 0;
        if (empInfo?.data2?.[0] && typeof empInfo.data2[0][Symbol.iterator] === 'function') {
            for (var i of empInfo.data2[0]) {
                const parsedAmount = parseInt(i?.Amount);
                if (!isNaN(parsedAmount)) {
                    tempTotal = tempTotal + parsedAmount;
                }
            }
        }
        setExistingTotal(tempTotal);
    }, [empInfo, postAllownces]);

    useEffect(() => {
        var tempTotal = 0;
        for (var i of postAllownces) {
            const parsedAmount = parseInt(i?.amount);
            if (!isNaN(parsedAmount)) {
                tempTotal = tempTotal + parsedAmount;
            }
        }
        setRevisedTotal(tempTotal);
    }, [empInfo, postAllownces, RevisedTotal]);


    // GET BY ID API ERROR HANDLING ===============
    useEffect(() => {
        if (empInfo?.message === "failed" || empInfo?.messsage === "failed") {
            message.error(`In info Api call: ${empInfo?.message || empInfo?.messsage}`);
        }
    }, [empInfo]);



    return (
        <>

            {contextHolder}
            <form onSubmit={isProcessbtn == false ? Save : Process}>
                <h4 className="text-dark">Employee Information</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        label={'Employee Name'}
                        placeholder={'Employee Name'}
                        name="Emp_name"
                        id="Emp_name"
                        type="text"
                        style={{ background: "#f5f4f4" }}
                        readOnly
                        // disabled
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Designation'}
                        placeholder={'Designation'}
                        name="Desig_name"
                        id="Desig_name"
                        type="text"
                        style={{ background: "#f5f4f4" }}
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <FormInput
                        label={'Department'}
                        placeholder={'Department'}
                        name="Dept_name"
                        id="Dept_name"
                        type="text"
                        style={{ background: "#f5f4f4" }}
                        readOnly
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                </div>
                <h4 className="text-dark mt-4">Increment</h4>
                <hr />
                <div className="form-group formBoxCountry">
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Increment Date'}
                        name={'Increment_Date'}
                        id="Increment_Date"
                        label={'Increment Date'}
                        type="date"
                        style={{ background: "#f5f4f4" }}
                    />
                    <FormInput
                        errors={errors}
                        control={control}
                        placeholder={'Transaction Date'}
                        label={'Transaction Date'}
                        name={'Transaction_Date'}
                        id="Transaction_Date"
                        type="date"
                        disabled
                    />
                </div>

                <div className="row maringClass">
                    <div className="col-lg-12">
                        <h4 className="text-dark">Existing</h4>
                        <hr />
                        <Table
                            columns={columns1}
                            loading={Red_Increment?.loading}
                            dataSource={empInfo?.data2?.[0]}
                            pagination={false}
                        />
                        <span className="mt-3">Total : {ExistingTotal}</span>
                    </div>
                    <div className="col-lg-12 mt-5">
                        <h4 className="text-dark">Revised</h4>
                        <hr />
                        <Table
                            columns={columns2}
                            loading={Red_Increment?.loading}
                            dataSource={empInfo?.data2?.[0]}
                            pagination={false}
                        />
                        <span className="mt-3">Total : {RevisedTotal}</span>
                    </div>
                </div>

                <div className="col-lg-6 Existing_Container"></div>
                <div className="BaseCItyBtnBox">
                    <CancelButton onClick={EditBack} title={"Cancel"} />
                    {status == "Process" || isProcessbtn == true ? "" : <PrimaryButton type={"submit"} loading={isLoading} title="Save" />}
                    {isProcessbtn == true || status == "Process" ?
                        <>
                            <PrimaryButton type={"submit"} loading={isLoading} title="Process" />
                            <Space size="middle">
                                <Popconfirm
                                    title="Delete the Increment"
                                    description="Are you sure you want to delete this Increment?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => {
                                        DeleteConfrim(isCode)
                                    }}
                                >
                                    <Button title="Delete" loading={isDeleteLeave} onClick={(e) => e.preventDefault(e)} />
                                </Popconfirm>
                            </Space>
                        </> : ""
                    }
                </div>
            </form>
        </>
    );
}
function mapStateToProps({ Red_Increment }) {
    return { Red_Increment };
}
export default connect(mapStateToProps, ACTIONS)(Incrementform);
