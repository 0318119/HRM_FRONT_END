import React, { useEffect, useState } from "react";
import "./assets/css/TAPersonalform.css";
import Header from "../components/Includes/Header";
import Country from "./Country.json"
import { Space, Table, Tag, Tooltip  } from 'antd';
import { Popconfirm } from 'antd';
import { MdDeleteOutline } from 'react-icons/md';
import { PrimaryButton, SimpleButton } from "../components/basic/button";
import { CancelButton } from '../components/basic/button/index'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from '../components/basic/input/formInput';
import * as AppointmentEducation_Actions from "../store/actions/Appointments/AppointEducationForm/index";
import { connect } from "react-redux";
import { FaEdit } from 'react-icons/fa';
import * as yup from "yup";
import { message } from 'antd';
import { Link } from "react-router-dom";
import baseUrl from '../config.json'




function TAEducationForm2({
    cancel,
    mode,
    isCode,
    page,
    Red_AppointEducation,
    GetEmployeeInfo,
    GetEducationData,
    GetInstituteData,
    GetGradeData,
    // GetEducationSavedData,
    SaveFormEdu
}) {

    var get_access_token = localStorage.getItem("access_token");
    var get_company_code = localStorage.getItem("company_code");
    const [messageApi, contextHolder] = message.useMessage();
    // const [pageSize, setPageSize] = useState(10);
    const [isLoading, setLoading] = useState(false)
    const [isSavedEdu , setSavedEdu] = useState(false)
    

    const EditBack = () => {
        cancel('read')
    }

    const AppointEducationSchema = yup.object().shape({        
        EduCode: yup.string().required("EduCode is required"),
        EduYear: yup.string().required("EduYear is required"),
        EduGrade: yup.string().required("EduGrade is required"),
        Topflag: yup.string().required("Topflag is required"),
        institutecode: yup.string().required("institutecode is required"),

    });

    useEffect(() => {
        GetEmployeeInfo(isCode)
        GetEducationData()
        GetInstituteData()
        GetGradeData()
        
        // GetEducationSavedData(isCode)
    }, [])



    useEffect(() => {
        reset(
            {
                Emp_name: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.Emp_name,
                Desig_name: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.Desig_name,
                Dept_name: Red_AppointEducation?.data?.[0]?.res?.data?.[0]?.Dept_name,
            },
        )
    }, [Red_AppointEducation?.data?.[0]?.res?.data?.[0]])

    const EduData = Red_AppointEducation?.getEdu?.[0]?.res?.data
    const InsData = Red_AppointEducation?.getInsti?.[0]?.res?.data
    const GradeData = Red_AppointEducation?.getGrade?.[0]?.res?.data


    // ==================================================
    const submitForm = async (data) => {
        try {
            const isValid = await AppointEducationSchema.validate(data);
            if (isValid) {
                SaveForm(data)
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(Red_AppointEducation, 'Red_AppointEducation')

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {},
        mode: "onChange",
        resolver: yupResolver(AppointEducationSchema),
    });


    const SaveForm = async (data) => {
        try {
            const response = await SaveFormEdu({
                Sequence_no:  isCode,
                EduCode: data?.EduCode,
                EduYear: data?.EduYear,
                EduGrade: data?.EduGrade,
                Topflag: data?.Topflag,
                institutecode: data?.institutecode,
            });

            if (response && response.success) {
                messageApi.success("Save Education Information");
                setTimeout(() => {
                    setSavedEdu(true)
                }, 3000);
            } else {
                const errorMessage = response?.message || 'Failed to Save Information';
                messageApi.error(errorMessage);
            }
        } catch (error) {
            console.error("Error occurred while changing password:", error);
            messageApi.error("An error occurred while Save Information");
        }
    };

    const columns = [
        {
            title: 'Education',
            dataIndex: 'Edu_Code',
            key: 'Edu_Code',
        },
        {
            title: 'Institute',
            dataIndex: 'institute_code',
            key: 'institute_code',
        },
        {
            title: 'Top Flag',
            dataIndex: 'Top_flag',
            key: 'Top_flag',
        },
        {
            title: 'Year',
            dataIndex: 'Edu_Year',
            key: 'Edu_Year',
        },
        {
            title: 'Grade',
            dataIndex: 'Edu_Grade',
            key: 'Edu_Grade',
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <button  className="editBtn">
                        <FaEdit />
                    </button>
                    <Popconfirm
                        title="Delete the Education"
                        description="Are you sure to delete the Education?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            handleConfirmDelete(data?.Sr_No)
                        }}
                    >
                        <button className="deleteBtn"><MdDeleteOutline /></button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

   
async function handleConfirmDelete(id) {
        await fetch(
            `${baseUrl.baseUrl}/eduation_code/deleteTranEducation`, {
            method: "POST",
            headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Sr_No": id,
            }),
        }
        ).then((response) => {
            return response.json();
        }).then(async (response) => {
            if (response.success) {
                messageApi.open({
                    type: 'success',
                    content: "You have successfully deleted",
                });
                setTimeout(() => {
                    messageApi.destroy()
                    // GetPositionData({
                    //     pageSize: pageSize,
                    //     pageNo: page,
                    //     search: null
                    // })
                }, 5000);
            }
            else {
                messageApi.open({
                    type: 'error',
                    content: response?.message || response?.messsage,
                });
                setTimeout(() => {
                    messageApi.destroy()
                }, 5000);
            }
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
            setTimeout(() => {
                messageApi.destroy()
            }, 5000);
        });
    }

// async function UpdateEducation(id) {
//         await fetch(
//             `${baseUrl.baseUrl}/eduation_code/UpdateTranEducation`, {
//             method: "POST",
//             headers: { "content-type": "application/json", accessToken: `Bareer ${get_access_token}` },
//             body: JSON.stringify({
//                 "srNo": getUpdateId,
//                 "EduCode": EduCodeDataVal,
//                 "EduYear": eduYear,
//                 "EduGrade": eduGrade,
//                 "Topflag": topFlag,
//                 "institutecode": getinstituteVal
//             }),
//         }
//         ).then((response) => {
//             return response.json();
//         }).then(async (response) => {
//             if (response.success) {
//                 messageApi.open({
//                     type: 'success',
//                     content: "You have successfully deleted",
//                 });
//                 setTimeout(() => {
//                     messageApi.destroy()
//                     // GetPositionData({
//                     //     pageSize: pageSize,
//                     //     pageNo: page,
//                     //     search: null
//                     // })
//                 }, 5000);
//             }
//             else {
//                 messageApi.open({
//                     type: 'error',
//                     content: response?.message || response?.messsage,
//                 });
//                 setTimeout(() => {
//                     messageApi.destroy()
//                 }, 5000);
//             }
//         }).catch((error) => {
//             messageApi.open({
//                 type: 'error',
//                 content: error?.message || error?.messsage,
//             });
//             setTimeout(() => {
//                 messageApi.destroy()
//             }, 5000);
//         });
//     }   
    

    return (
        <>
            {contextHolder}

            <div className="container">
                <div className="row">
                    <div className="col-12 maringClass">
                        <div>
                            <h2 className="text-dark"> Transaction - Education</h2>
                            <form onSubmit={handleSubmit(submitForm)}>
                                <h4 className="text-dark">Employee Information</h4>
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
                                    />
                                </div>
                                <h4 className="text-dark">Education History</h4>
                                <hr />
                                <div className="form-group formBoxCountry">
                                    <FormSelect
                                        label={'Education'}
                                        placeholder='select Education'
                                        id="EduCode"
                                        name="EduCode"
                                        options={EduData?.map((item,) => ({
                                            value: item.Edu_code,
                                            label: item.Edu_name,
                                        })
                                        )}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'Institute'}
                                        placeholder='select institute'
                                        id="institutecode"
                                        name="institutecode"
                                        options={InsData?.map((item,) => ({
                                            value: item.Inst_code,
                                            label: item.Inst_name,
                                        })
                                        )}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'Top flag'}
                                        placeholder='select top flag'
                                        id="Topflag"
                                        name="Topflag"
                                        options={[
                                            {
                                                value: 'Y',
                                                label: 'Yes',
                                            },
                                            {
                                                value: "N",
                                                label: 'No',
                                            },
                                        ]}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormInput
                                        label={'Year'}
                                        placeholder='select year'
                                        id="EduYear"
                                        name="EduYear"
                                        type="number"
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                    <FormSelect
                                        label={'Grade'}
                                        placeholder={'Select grade'}
                                        id="EduGrade"
                                        name="EduGrade"
                                        options={GradeData?.map((item,) => ({
                                            value: item.Grade_code,
                                            label: item.Grade_name,
                                        })
                                        )}
                                        showLabel={true}
                                        errors={errors}
                                        control={control}
                                    />
                                </div>
                                <div className='CountryBtnBox'>
                                    <CancelButton onClick={EditBack} title={'Cancel'} />
                                    <SimpleButton type={'submit'} loading={isLoading} title="Save" />
                                </div>
                            </form>
                           {/* {isSavedEdu ? */}
                              <Table 
                                columns={columns}
                                loading={Red_AppointEducation?.loading}
                                dataSource={Red_AppointEducation?.getSavedData?.[0]?.res?.data?.[0]}
                                scroll={{ x: 10 }}
                                // pagination={{
                                //     defaultCurrent: page,
                                //     total: Red_AppointEducation?.data?.[0]?.res?.data3,
                                //     onChange: (p) => {
                                //         // setPage(p);
                                //     },
                                //     // pageSize: pageSize,
                                // }}
                            /> 
                            {/* : "" } */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
function mapStateToProps({ Red_AppointEducation }) {
    return { Red_AppointEducation };
}
export default connect(mapStateToProps, AppointmentEducation_Actions)(TAEducationForm2);