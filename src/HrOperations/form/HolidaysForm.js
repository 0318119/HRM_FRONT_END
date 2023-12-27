import React, { useState , useEffect} from 'react'
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import * as HOLIDAYS_ACTIONS from "../../store/actions/HrOperations/Holidays/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormCheckBox } from '../../components/basic/input/formInput';
import { Holidays_Scheme } from '../schema';
import { message } from 'antd';
import baseUrl from '../../../src/config.json'

function HolidaysForm({ cancel, mode, isCode, page, Red_Holidays, getHolidaysData, Get_Holidays_By_ID }) {


    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);
    const EditBack = () => {
        cancel('read')
    }


    const submitForm = async (data) => {
        try {
            const isValid = await Holidays_Scheme.validate(data);
            if (isValid) {
                POST_HOLIDAYS_FORM(data)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            Calendar_Date: Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.Calendar_Date.slice(0,10), 
            Date_Type: Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.Date_Type,
            Holiday_Type: Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.Holiday_Type,
            Reason: Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.Reason,
            ramdan_flag: Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.ramdan_flag,
        },
        mode: "onChange",
        resolver: yupResolver(Holidays_Scheme),
    });
    // console.log("Red_Holidays", Red_Holidays)


    useEffect(() => {
        if (isCode !== null) {
            Get_Holidays_By_ID(isCode)
        }
    }, [])

    useEffect(() => {
        if (mode == "Edit") {
            reset(
                {
                    Calendar_Date: Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.Calendar_Date.slice(0, 10),
                    Date_Type: Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.Date_Type,
                    Holiday_Type: Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.Holiday_Type,
                    Reason: Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.Reason,
                    ramdan_flag: Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.ramdan_flag,
                },
            )
        }
    }, [Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]])


    //  Holiday FORM DATA API CALL =========================== 
    async function POST_HOLIDAYS_FORM(body) {
        setLoading(true)
        await fetch(
            `${baseUrl.baseUrl}/holiday/AddHolidays`, {
            method: "POST",
            headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` },
            body: JSON.stringify({
                "Calendar_Date": body?.Calendar_Date,
                "Date_Type": body?.Date_Type,
                "Holiday_Type": body?.Holiday_Type,
                "Reason": body?.Reason,
                "ramdan_flag": body?.ramdan_flag
            }),
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
                    getHolidaysData({
                        pageSize: pageSize,
                        pageNo: page,
                        search: null
                    })
                }, 3000);
            }
            else {
                setLoading(false)
                messageApi.open({
                    type: 'error',
                    content: response?.message || response?.messsage,
                });
            }
        }).catch((error) => {
            setLoading(false)
            messageApi.open({
                type: 'error',
                content: error?.message || error?.messsage,
            });
        });
    }



    return (
        <>  
        {contextHolder}
            <form onSubmit={handleSubmit(submitForm)}>
                <h4 className="text-dark">Holidays</h4>
                <hr />
                <div className="form-group formBoxHolidays">
                    <FormInput
                        label={'Calendar Date'}
                        placeholder={"Calendar Date"}
                        id="Calendar_Date"
                        name="Calendar_Date"
                        readOnly={true}
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    /> 

                    <FormInput
                        label={'Holidays Type'}
                        placeholder={'Holidays Type'}
                        id="Holiday_Type"
                        name="Holiday_Type"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <div className="d-flex">
                        <FormCheckBox
                            type='radio'
                            id="Date_Type"
                            name="Date_Type"
                            labelText={'Date Type'}
                            label={"Holiday"}
                            value={'H'}
                            defaultChecked={
                                Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.Date_Type == "H" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="Date_Type"
                            name="Date_Type"
                            label={'Weekend'}
                            value={'W'}
                            defaultChecked={
                                Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.Date_Type == "W" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>


                    <FormInput
                        label={'Reason'}
                        placeholder={'Reason'}
                        id="Reason"
                        name="Reason"
                        type="text"
                        showLabel={true}
                        errors={errors}
                        control={control}
                    />
                    <div className="d-flex ">
                        <FormCheckBox
                            type='radio'
                            id="ramdan_flag"
                            name="ramdan_flag"
                            labelText={'ramdan_flag'}
                            label={"Yes"}
                            value={'Y'}
                            defaultChecked={
                                Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.ramdan_flag == "Y" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                        <FormCheckBox
                            type='radio'
                            id="ramdan_flag"
                            name="ramdan_flag"
                            label={'No'}
                            value={'N'}
                            defaultChecked={
                                Red_Holidays?.dataSingle?.[0]?.res?.data?.[0]?.ramdan_flag == "N" ? true : false
                            }
                            showLabel={true}
                            errors={errors}
                            control={control}
                        />
                    </div>
                   
                </div>
                <hr />
                {/* <div className="form-group formBoxHolidays">
                    <Input placeholder={'Car Amount'} label={'Car Amount'} type="number" />
                </div> */}
                <div className='HolidayBtnBox'>
                    <CancelButton onClick={EditBack} title={'Cancel'} />
                    <PrimaryButton type={'submit'} loading={isLoading}  title="Save" />
                </div>
            </form>

        </>
    )
}
function mapStateToProps({ Red_Holidays }) {
    return { Red_Holidays };
}

export default connect(mapStateToProps, HOLIDAYS_ACTIONS)(HolidaysForm)
