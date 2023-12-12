import React, { useEffect, useState } from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as ConfirmationActions from "../../store/actions/HrOperations/Master_Maintaince/Confirmation/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormCheckBox, FormSelect } from '../../components/basic/input/formInput';
// import { Cost_CentreSchema } from '../schema';
import { message } from 'antd';
import * as yup from "yup";
import { useLocation, useNavigate } from 'react-router-dom';
import baseUrl from '../../config.json'

const config = require('../../config.json')

function ConfirmationForm({ cancel, isCode, page, Getconfirmation, Get_confirmation_By_ID, Red_Confirmation, mode }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [isGetInfo, setGetInfo] = useState([])
    const search = useLocation().search
    var ConfirmId = new URLSearchParams(search).get('ConfirmId')
    var Already_Process = new URLSearchParams(search).get('Process')


    const [isGetInfoErr, setGetInfoErr] = useState("")
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const [currentDate, setCurrentDate] = useState(formattedDate);
    const navigate = useNavigate()
    const [whichAction, setwhichAction] = useState(Already_Process !== null ? "DeleteAndProcess" : "save")
    const [isConfirmationDate, setConfirmationDate] = useState(null)
    const [isLoading, setLoading] = useState(false);
    const pageSize = 10;
    const [isBtn, setBtn] = useState({
        saveBtnLoading: false,
        saveBtnDisabled: false,
        // =================================================================
        processBtnLoading: false,
        processBtnDisabled: false,
        // =================================================================
        deleteBtnLoading: false,
        deleteBtnDisabled: false,
        // =================================================================
    })

    // FORM CANCEL FUNCTION =================================================================
    const EditBack = () => {
        cancel('read')


    }
    const submitForm = async (data) => {
        try {
            const isValid = await ConfirmationSchema.validate(data);
            if (isValid) {
                Post_Confirmation_Form(data)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const ConfirmationSchema = yup.object().shape({
        Emp_name: yup.string().required("Employee name is required"),
        Desig_Name: yup.string().required("Designation Name is required"),
        Dept_name: yup.string().required("Department name is required"),
        PF_Nomination_Flag: yup.string().required("PF Nomination Flag is required"),
        Joining_Date: yup.date().required("Joining Date is required"),
        currentDate: yup.string().required("Transaction Date is required"),
        Emp_Confirm_date: yup.date().required("Employee Confirm Date is required"),
        Confirmation_Date: yup.date().required("Confirmation Date is required"),
    });


    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            Emp_name: yup.string().required("Employee name is required"),
            Desig_Name: yup.string().required("Designation is required"),
            Dept_name: yup.string().required("Department name is required"),
            PF_Nomination_Flag: yup.string().required("PF Nomination Flag is required"),
            Joining_Date: yup.date().required("Joining Date is required"),
            currentDate: yup.string().required("Transaction Date is required"),
            Emp_Confirm_date: yup.date().required("Employee Confirm Date is required"),
            Confirmation_Date: yup.date().required("Confirmation Date is required"),
        },
        mode: "onChange",
        resolver: yupResolver(ConfirmationSchema),
    });

    // GET CONFIRMATION INFO API CALL =================================================================
    async function getInfo() {
        await fetch(
            `${config["baseUrl"]}/tranConformation/GetEmployeeInfoTranConfirmation`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accessToken: `Bareer ${get_access_token}`,
                },
                body: JSON.stringify({
                    "Emp_code": ConfirmId
                }),
            }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/tranConformation/GetEmployeeInfoTranConfirmation`,
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            refereshToken: `Bareer ${get_refresh_token}`,
                        },
                        body: JSON.stringify({
                            "Emp_code": ConfirmId
                        }),
                    }
                ).then((response) => {
                    return response.json();
                })
                    .then((response) => {
                        if (response.messsage == "timeout error") {
                            navigate("/");
                        } else {
                            if (response.success) {
                                localStorage.setItem("refresh", response.referesh_token);
                                localStorage.setItem("access_token", response.access_token);
                                setGetInfo(response?.data[0]?.[0])
                            } else {
                                setGetInfoErr(response.message)
                            }
                        }
                    }).catch((error) => { setGetInfoErr(error.messsage) });
            } else {
                if (response.success) {
                    setGetInfo(response?.data[0]?.[0])
                } else {
                    setGetInfoErr(response.message)
                }
            }
        }).catch((error) => { setGetInfoErr(error.message) });
    }

    // SAVE CONFIRMATION API CALL =================================
    async function saveConfirmationInfo(e) {
        e.preventDefault();
        setButtonState('save', true, true);
    
        try {
            const response = await fetch(/* ... */);
            const data = await response.json();
    
            if (data.success) {
                setButtonState('save', false, false);
                setwhichAction("DeleteAndProcess");
                setGetInfoErr("Please click on Process button.");
                setTimeout(() => {
                    setGetInfoErr("");
                }, 5000);
            } else {
                // handleNavigation(data);
                handleAPIError(data);
                setButtonState('save', false, false);
            }
        } catch (error) {
            handleAPIError(error);
            setButtonState('save', false, false);
        }
    }

    // PROCESS CONFIRMATION API CALL =================================
    async function processConfirmation(e) {
        e.preventDefault();
        setBtn({
            processBtnLoading: true,
            processBtnDisabled: true,
        })
        await fetch(
            `${config["baseUrl"]}/tranConfirmation/TranConfirmations_Process`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_code": ConfirmId,
                "TransactionDate": currentDate,
                "ConfirmationDate": isConfirmationDate !== null ? isConfirmationDate : isGetInfo?.Confirmation_Date,
                "Confirmation_DueDate": isGetInfo?.Emp_Confirm_date
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/tranConfirmation/TranConfirmations_Process`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        refereshToken: `Bareer ${get_refresh_token}`,
                    },
                    body: JSON.stringify({
                        "Emp_code": ConfirmId,
                        "TransactionDate": currentDate,
                        "ConfirmationDate": isConfirmationDate !== null ? isConfirmationDate : isGetInfo?.Confirmation_Date,
                        "Confirmation_DueDate": isGetInfo?.Emp_Confirm_date
                    }),
                }
                ).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") {
                        navigate("/");
                    } else {
                        if (response.success) {
                            localStorage.setItem("refresh", response.referesh_token);
                            localStorage.setItem("access_token", response.access_token);
                            setBtn({
                                processBtnLoading: false,
                                processBtnDisabled: false,
                            })
                            setwhichAction("DeleteAndProcess")
                            setGetInfoErr("You have been Processed this confirmation.")
                            setTimeout(() => {
                                setGetInfoErr("")
                                navigate("/Confirmation");
                            }, 5000);
                        } else {
                            setBtn({
                                processBtnLoading: false,
                                processBtnDisabled: false,
                            })
                            setGetInfoErr(response.message)
                            setTimeout(() => {
                                setGetInfoErr("")
                            }, 5000);
                        }
                    }
                }).catch((error) => {
                    setBtn({
                        processBtnLoading: false,
                        processBtnDisabled: false,
                    })
                    setGetInfoErr(error.message)
                    setTimeout(() => {
                        setGetInfoErr("")
                    }, 5000);
                });
            } else {
                if (response.messsage == "timeout error") {
                    navigate("/");
                } else {
                    if (response.success) {
                        setBtn({
                            processBtnLoading: false,
                            processBtnDisabled: false,
                        })
                        setwhichAction("DeleteAndProcess")
                        setGetInfoErr("You have been Processed this confirmation.")
                        setTimeout(() => {
                            setGetInfoErr("")
                            navigate("/Confirmation");
                        }, 5000);
                    } else {
                        setBtn({
                            processBtnLoading: false,
                            processBtnDisabled: false,
                        })
                        setGetInfoErr(response.message)
                        setTimeout(() => {
                            setGetInfoErr("")
                        }, 5000);
                    }
                }
            }
        }).catch((error) => {
            setBtn({
                processBtnLoading: false,
                processBtnDisabled: false,
            })
            setGetInfoErr(error.message)
            setTimeout(() => {
                setGetInfoErr("")
            }, 5000);
        });
    }

    // DELETE CONFIRMATION API CALL =================================
    async function deleteConfirmation(e) {
        e.preventDefault();
        setBtn({
            deleteBtnLoading: true,
            deleteBtnDisabled: true,
        })
        await fetch(
            `${config["baseUrl"]}/tranConfirmation/TranConfirmations_delete`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_code": ConfirmId,
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.messsage == "unauthorized") {
                await fetch(
                    `${config["baseUrl"]}/tranConfirmation/TranConfirmations_delete`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        refereshToken: `Bareer ${get_refresh_token}`,
                    },
                    body: JSON.stringify({
                        "Emp_code": ConfirmId,
                    }),
                }
                ).then((response) => {
                    return response.json();
                }).then((response) => {
                    if (response.messsage == "timeout error") {
                        navigate("/");
                    } else {
                        if (response.success) {
                            localStorage.setItem("refresh", response.referesh_token);
                            localStorage.setItem("access_token", response.access_token);
                            setBtn({
                                deleteBtnLoading: false,
                                deleteBtnDisabled: false,
                            })
                            setwhichAction("DeleteAndProcess")
                            setGetInfoErr("You have been Deleted this confirmation.")
                            setTimeout(() => {
                                setGetInfoErr("")
                                navigate("/Confirmation");
                            }, 5000);
                        } else {
                            setBtn({
                                deleteBtnLoading: false,
                                deleteBtnDisabled: false,
                            })
                            setGetInfoErr(response.message)
                            setTimeout(() => {
                                setGetInfoErr("")
                            }, 3000);
                        }
                    }
                }).catch((error) => {
                    setBtn({
                        deleteBtnLoading: false,
                        deleteBtnDisabled: false,
                    })
                    setGetInfoErr(error.message)
                    setTimeout(() => {
                        setGetInfoErr("")
                    }, 3000);
                });
            } else {
                if (response.messsage == "timeout error") {
                    navigate("/");
                } else {
                    if (response.success) {
                        setBtn({
                            deleteBtnLoading: false,
                            deleteBtnDisabled: false,
                        })
                        setwhichAction("DeleteAndProcess")
                        setGetInfoErr("You have been Deleted this confirmation.")
                        setTimeout(() => {
                            setGetInfoErr("")
                            navigate("/Confirmation");
                        }, 5000);
                    } else {
                        setBtn({
                            deleteBtnLoading: false,
                            deleteBtnDisabled: false,
                        })
                        setGetInfoErr(response.messsage)
                        setTimeout(() => {
                            setGetInfoErr("")
                        }, 3000);
                    }
                }
            }
        }).catch((error) => {
            setBtn({
                deleteBtnLoading: false,
                deleteBtnDisabled: false,
            })
            setGetInfoErr(error.message)
            setTimeout(() => {
                setGetInfoErr("")
            }, 3000);
        });
    }

    useEffect(() => {
        if (isCode !== null) {
            Get_confirmation_By_ID(isCode)
        }
    }, [])



    // useEffect(() => {
    //     if (mode == "create") {
    //         reset(
    //             {
    //                 Emp_name: "",
    //                 Desig_Name: "",
    //                 Dept_name: "",
    //                 PF_Nomination_Flag: "",
    //                 Joining_Date: "",
    //                 JV_Code: "",
    //                 Emp_Confirm_date: "",
    //                 Confirmation_Date: "",
    //             },
    //         )
    //     }
    //      else {
    //         reset(
    //             {
    //                 Emp_name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Emp_name,
    //                 Desig_Name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_Name,
    //                 Dept_name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Dept_name,
    //                 PF_Nomination_Flag: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.PF_Nomination_Flag,
    //                 PF_Nomination_Flag: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.PF_Nomination_Flag,
    //                 Joining_Date: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Joining_Date,
    //                 Emp_Confirm_date: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Emp_Confirm_date,
    //                 Confirmation_Date: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Confirmation_Date,
    //             },
    //         )
    //     }
    // }, [Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]])

    // COST CENTRE FORM DATA API CALL =========================== 
    async function Post_Confirmation_Form(body) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/tranConformation/GetEmployeeInfoTranConfirmation`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accessToken: `Bareer ${get_access_token}`,
            },
            body: JSON.stringify({
                "Emp_name": body.Desig_Name,
                "Desig_Name": body.Desig_Name,
                "Dept_name": body.Dept_name,
                "PF_Nomination_Flag": body.PF_Nomination_Flag,
                "Joining_Date": body.Joining_Date,
                // "JV_Code1": body.JV_Code1,
                "Emp_Confirm_date": body.Emp_Confirm_date,
                "Confirmation_Date": body.Confirmation_Date,
            })
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                messageApi.open({
                    type: 'success',
                    content: response?.message || response?.messsage,
                });
                setLoading(false)
                setTimeout(() => {
                    cancel('read')
                    Getconfirmation({
                        pageSize: pageSize,
                        pageNo: page,
                        search: null
                    })
                }, 3000);
            }
            else {
                messageApi.open({
                    type: 'error',
                    content: response?.message || response?.messsage,
                });
                setLoading(false)
            }
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
            setLoading(false)
        });
    }

    const setButtonState = (buttonName, isLoading, isDisabled) => {
        setBtn(prevState => ({
            ...prevState,
            [`${buttonName}BtnLoading`]: isLoading,
            [`${buttonName}BtnDisabled`]: isDisabled,
        }));
    };

    const handleAPIError = (error) => {
        setGetInfoErr(error.message || error.messsage || 'An error occurred');
        setTimeout(() => {
            setGetInfoErr("");
        }, 3000);
    };

    // useEffect(() => {
    //     if (mode === "create") {
    //         reset({
    //             Emp_name: "",
    //             Desig_Name: "",
    //             Dept_name: "",
    //             PF_Nomination_Flag: "",
    //             Joining_Date: "",
    //             currentDate: "",
    //             Emp_Confirm_date: "",
    //             Confirmation_Date: "",
    //         });
    //     } else {
    //         reset({
    //             Emp_name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Emp_name || '',
    //             Desig_Name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_Name || '',
    //             Dept_name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Dept_name || '',
    //             DesPF_Nomination_Flagig_Name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_Name || '',
    //             Desig_Name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_Name || '',
    //             Desig_Name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_Name || '',
    //             Desig_Name: Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]?.Desig_Name || '',
                
    //         });
    //     }
    // }, [mode, Red_Confirmation?.dataSingle?.[0]?.res?.data?.[0]]);

    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Confirmation</h4>
                <h5 className="text-dark mt-4">Employee Information</h5>
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
                        value={isGetInfo ? isGetInfo.Emp_name : ''}
                    />
                    <FormInput
                        label={'Designation'}
                        placeholder={'Designation'}
                        id="Desig_Name"
                        name="Desig_Name"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                        value={isGetInfo ? isGetInfo.Desig_Name : ''}
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
                        value={isGetInfo ? isGetInfo.Dept_name : ''}
                    />
                    <FormSelect
                        label={'PF Nomination Flag'}
                        placeholder={'PF Nomination Flag'}
                        id="PF_Nomination_Flag"
                        name="PF_Nomination_Flag"
                        type='text'
                        showLabel={true}
                        errors={errors}
                        control={control}
                        options={[
                            {
                                value: 'Y',
                                label: 'Yes',
                            },
                            {
                                value: "N",
                                label: 'NO',
                            },
                        ]}
                    />
                </div>
                <h5 className="text-dark">Confirmation Information</h5>
                <div className="form-group formBoxCountry">

                    <FormInput
                        label={'Joining Date'}
                        placeholder={'Joining Date'}
                        id="Joining_Date"
                        name="Joining_Date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                        readOnly
                    />
                    <FormInput
                        label={'Transaction Date'}
                        placeholder={'Transaction Date'}
                        id="currentDate"
                        name="currentDate"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                        readOnly
                    />
                    <FormInput
                        label={'Confirmation Due'}
                        placeholder={'Confirmation Due'}
                        id="Emp_Confirm_date"
                        name="Emp_Confirm_date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}
                        readOnly
                    />
                    <FormInput
                        label={'Confirmation Date'}
                        placeholder={'Confirmation Date'}
                        id="Confirmation_Date"
                        name="Confirmation_Date"
                        type="date"
                        showLabel={true}
                        errors={errors}
                        control={control}

                    />
                </div>
                <div className='CountryBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} /> :
                    <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
                </div>
            </form>
        </>
    )
}

function mapStateToProps({ Red_Confirmation }) {
    return { Red_Confirmation };
}
export default connect(mapStateToProps, ConfirmationActions)(ConfirmationForm)