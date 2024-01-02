import React, { useEffect, useState } from "react";
import * as AddPayroll_Action from "../../../../store/actions/payroll/addPayroll/index";
import { connect } from "react-redux";
import { FormInput, FormSelect } from "../../../../components/basic/input/formInput";
import { SimpleButton, CancelButton } from "../../../../components/basic/button";
import { Skeleton, message } from 'antd'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from '../../../../components/basic/input/select'

import * as yup from "yup";

const AddUpdatePayroll = ({ GetUpdateData, UpdatePayrollFunction, addNewFunction, update }) => {
    const [deductionCode, setDeductionCode] = useState()
    const [loading, setLoading] = useState(false)

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

    useEffect(() => {
        reset({
            Payroll_Category_name: deductionCode?.Payroll_Category_name,
            Payroll_Category_abbr: deductionCode?.Payroll_Category_abbr,
            Payroll_Month: deductionCode?.Payroll_Month,
            Payroll_Year: deductionCode?.Payroll_Year,
            Payroll_Last_Month: deductionCode?.Payroll_Last_Month,
            Payroll_Last_Year: deductionCode?.Payroll_Last_Year,
            Payroll_Undo_Flag: deductionCode?.Payroll_Undo_Flag,
            Loan_Completion_Flag: deductionCode?.Loan_Completion_Flag,
            Sort_key: deductionCode?.Sort_key,
            pf_percentage: deductionCode?.pf_percentage,
            active_flag: deductionCode?.active_flag,
        })
    }, [deductionCode?.Payroll_Category_name])

    useEffect(() => {
        DataLoader()
    }, [])


    const AddLoans = yup.object().shape({
        Payroll_Category_name: yup.string().required("Payrool category name is required"),
        Payroll_Category_abbr: yup.string().required("Payrool category Abbreviation is required"),
        Payroll_Month: yup.string().required("Payroll month is required"),
        Payroll_Year: yup.string().required("Payroll year is required"),
        Payroll_Last_Month: yup.string().required("Payroll last month is required"),
        Payroll_Last_Year: yup.string().required("Payroll last year is required"),
        Payroll_Undo_Flag: yup.string().required("Payroll undo flag is required"),
        Loan_Completion_Flag: yup.string().required("Loan completion flag is required"),
        Sort_key: yup.string().required("Sort key is required"),
        pf_percentage: yup.string().required("PF percentage is required"),
        active_flag: yup.string().required("Active flag is required"),
    });


    const {
        control,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            Payroll_Category_name: "",
            Payroll_Category_abbr: "",
            Payroll_Month: "",
            Payroll_Year: "",
            Payroll_Last_Month: "",
            Payroll_Last_Year: "",
            Payroll_Undo_Flag: "Y",
            Loan_Completion_Flag: "Y",
            Sort_key: "",
            pf_percentage: "",
            active_flag: "Y",
        },
        mode: "onChange",
        resolver: yupResolver(AddLoans),
    });
    const DataLoader = async () => {
        setLoading(true)
        const deductionList = await GetUpdateData(update)
        setDeductionCode(deductionList?.data[0])
        setLoading(false)
    }

    const submitForm = async (data) => {
        setLoading(true)
        try {
            const isValid = await AddLoans.validate(data);
            if (isValid) {
                const isSaved = await UpdatePayrollFunction({...data,Payroll_Category_code:deductionCode?.Payroll_Category_code})
                if (isSaved.success == "success") {
                    setLoading(false)
                    message.success('Loan Successfully created')
                    addNewFunction(true)
                }
                else {
                    setLoading(false)
                    message.error('Something went wrong')
                    addNewFunction(true)
                }
            }
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    return (
        <>
            {loading ? <Skeleton /> :
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="d-flex">
                        <FormInput
                            errors={errors}
                            control={control}
                            name={'Payroll_Category_name'} placeholder={'Payroll name'} label={'Payroll name'} />
                        <FormInput
                            errors={errors}
                            control={control}
                            name={'Payroll_Category_abbr'} placeholder={'Payrool category Abbreviation'} label={'Payrool category Abbreviation'} />


                        {/* <Select errors={errors} control={control} type={"month"} name={'Payroll_Month'} defaultValue={'November'} label={'Payroll month'} option={monthList} /> */}
                        {/* <Select errors={errors} control={control} type={"month"} name={'Payroll_Year'} label={'Payroll Year'} defaultValue={'2023'} option={monthSalary} /> */}

                        <FormSelect
                            deduction={'deductionFlag'}
                            errors={errors}
                            control={control}
                            placeholder={"Payroll month"}
                            name={'Payroll_Month'} label={'Payroll month'} options={monthList} />
                        <FormSelect
                            deduction={'deductionFlag'}
                            errors={errors}
                            control={control}
                            placeholder={"Payroll Year"}
                            name={'Payroll_Year'} label={'Payroll Year'} options={monthSalary} />
                    </div>
                    <div className="d-flex">
                        <FormSelect
                            deduction={'deductionFlag'}
                            errors={errors}
                            control={control}
                            placeholder={"Payroll last month"}
                            name={'Payroll_Last_Month'} label={'Payroll last month'} options={monthList} />
                        <FormSelect
                            deduction={'deductionFlag'}
                            errors={errors}
                            control={control}
                            placeholder={"Payroll last Year"}
                            name={'Payroll_Last_Year'} label={'Payroll last Year'} options={monthSalary} />
                        <FormSelect
                            deduction={'deductionFlag'}
                            errors={errors}
                            control={control}
                            placeholder={"Payroll undo flag"}
                            name={'Payroll_Undo_Flag'} label={'Payroll undo flag'} options={[
                                {
                                    value: "Y",
                                    label: "Yes",
                                },
                                {
                                    value: "N",
                                    label: "No",
                                },
                            ]} />
                        <FormSelect
                            deduction={'deductionFlag'}
                            errors={errors}
                            control={control}
                            placeholder={"Loan completion flag"}
                            name={'Loan_Completion_Flag'} label={'Loan completion flag'} options={[
                                {
                                    value: "Y",
                                    label: "Yes",
                                },
                                {
                                    value: "N",
                                    label: "No",
                                },
                            ]} />

                    </div>
                    <div className="d-flex">
                        <FormInput
                            errors={errors}
                            control={control}
                            name={'Sort_key'} placeholder={'Sort key'} label={'Sort key'} />
                        <FormInput
                            errors={errors}
                            control={control}
                            type={'number'}
                            name={'pf_percentage'} placeholder={'PF percentage'} label={'PF percentage'} />
                        <FormSelect
                            deduction={'deductionFlag'}
                            errors={errors}
                            control={control}
                            placeholder={"Active flag"}
                            name={'active_flag'} label={'Active flag'} options={[
                                {
                                    value: "Y",
                                    label: "Yes",
                                },
                                {
                                    value: "N",
                                    label: "No",
                                },
                            ]} />
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                        <CancelButton onClick={() => addNewFunction(true)} title={"Cancel"} />
                        <SimpleButton loading={loading} type={'submit'} title={"Submit"} />
                    </div>
                </form>
            }
        </>
    )

}


function mapStateToProps({ addPayroll }) {
    return { addPayroll };
}
export default connect(mapStateToProps, AddPayroll_Action)(AddUpdatePayroll);