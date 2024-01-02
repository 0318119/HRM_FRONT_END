import React, { useEffect, useState } from "react";
import './pdfRender.css'
import * as PayrollUpload_Action from "../../../../store/actions/payroll/PdfRender/index";
import { connect } from "react-redux";
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { DateTime } from "luxon";
import SecondaryHeader from "../../../component/secondaryHeader";
import Header from "../../../../components/Includes/Header";
import { FormSelect } from "../../../../components/basic/input/formInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SimpleButton } from "../../../../components/basic/button";
import { message } from 'antd'

const PdfData = ({ PdfRender, ListPdfData }) => {
    const [loading, setLoading] = useState(false)
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear(); 

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const fileExtension = '.xlsx';
    const AddLoans = yup.object().shape({
        month: yup.string().required("Month is required"),
        year: yup.string().required("Year is required"),
    });

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
        setValue
    } = useForm({
        defaultValues: {
            month: currentDate,
            year: currentDate,
        },
        mode: "onChange",
        resolver: yupResolver(AddLoans),
    });


    const Request = async (data) => {
        setLoading(true)
        try {
            const isValid = await AddLoans.validate(data);
            if (isValid) {
                const isSaved = await ListPdfData(data)
                if (isSaved.length > 0) {
                    DownloadExcel(isSaved)
                }
                else {
                    setLoading(false)
                    message.error('No Data Found')
                }
            }
            else {
                setLoading(false)
                message.error('Something went wrong')
            }
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    const DownloadExcel = async (hjh) => {
        try {
            const uniqueEmployeeNames = [...new Set(hjh.map(x => x.Emp_name))];
            const attendances = uniqueEmployeeNames.map(name => {
                let attendanceRow = [name];
                const employeeAttendances = hjh.filter(x => x.Emp_name === name);
                function convertMinutesToHours(minutes) {
                    if (typeof minutes !== 'number' || minutes < 0) {
                        throw new Error('Invalid input. Please provide a non-negative number of minutes.');
                    }

                    const hours = Math.floor(minutes / 60);
                    const remainingMinutes = minutes % 60;

                    return `${hours}:${remainingMinutes}`;
                }
                for (let i = 0; i < employeeAttendances.length; i++) {
                    const attendance = employeeAttendances[i];
                    attendanceRow.push(
                        `${attendance.Emp_Time_In_HH}:${attendance.Emp_Time_In_MM}`,
                        `${attendance.Emp_Time_Out_HH}:${attendance.Emp_Time_Out_MM}`,
                        `${convertMinutesToHours(attendance.Total_Shift_MM)}`
                    );
                }
                return attendanceRow;
            });
            const numberOfDays = [...new Set(hjh.map(x => x.Attendance_Date))];
            const ws = XLSX.utils.json_to_sheet([]);
            let merges = [];
            for (let i = 0; i < numberOfDays.length * 3; i++) {
                merges.push({ s: { r: 0, c: 1 + i }, e: { r: 0, c: 3 + i } });
            }
            for (let i = 0; i < numberOfDays.length * 3; i++) {
                merges.push({ s: { r: 1, c: 1 + i }, e: { r: 1, c: 3 + i} });
            }
            ws['!merges'] = merges;
            XLSX.utils.sheet_add_aoa(ws, [["Employee Name", ...numberOfDays.map(x => [DateTime.fromSQL(x).toFormat("EEEE"), "", ""])].flat()], { origin: "A1" });
            XLSX.utils.sheet_add_aoa(ws, [["", ...numberOfDays.map(x => [DateTime.fromSQL(x).toFormat("yyyy LLL dd"), "", ""])].flat()], { origin: "A2" });
            XLSX.utils.sheet_add_aoa(ws, [["", ...Array(numberOfDays.length).fill(["In", "Out", "Total"]).flat()]], { origin: "A3" });
            XLSX.utils.sheet_add_aoa(ws, attendances, { origin: "A4" });

            

            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, "data" + fileExtension);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        setValue('month', currentMonth);
        setValue('year', currentYear);
    }, [setValue, currentMonth, currentYear]);

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="container maringClass">
                <div className="row justify-content-center">
                    <div className="col-lg-8 AttendanceReportBg">
                        <h5 className="text-dark"><b>Transaction  Attendance</b></h5>
                        <form onSubmit={handleSubmit(Request)}>
                            <div className="">
                                <FormSelect
                                    deduction={'deductionFlag'}
                                    errors={errors}
                                    control={control}
                                    placeholder={"Attendance month"}
                                    name={'month'} label={'Attendance month'}
                                    options={[
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
                                    ]}
                                />
                                <FormSelect
                                    deduction={'deductionFlag'}
                                    errors={errors}
                                    control={control}
                                    placeholder={"Attendance year"}
                                    name={'year'} label={'Attendance year'}
                                    options={[
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
                                    ]}
                                />
                            </div>
                            <div><SimpleButton loading={loading} type={'submit'} title={'Submit'} /></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

function mapStateToProps({ PdfRender }) {
    return { PdfRender };
}
export default connect(mapStateToProps, PayrollUpload_Action)(PdfData);