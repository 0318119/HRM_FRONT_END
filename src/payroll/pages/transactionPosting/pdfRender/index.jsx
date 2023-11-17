import React, { useEffect, useState } from "react";
import Style from './pdfRender.module.css'
import * as PayrollUpload_Action from "../../../../store/actions/payroll/PdfRender/index";
import { connect } from "react-redux";
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { DateTime } from "luxon";
import SecondaryHeader from "../../../component/secondaryHeader";
import Header from "../../../../components/Includes/Header";
import {FormSelect } from "../../../../components/basic/input/formInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {SimpleButton } from "../../../../components/basic/button";
import {message} from 'antd'

const PdfData = ({ PdfRender, ListPdfData }) => {
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
        }
    ])

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
        reset
    } = useForm({
        defaultValues: {
            month: "",
            year: "",
        },
        mode: "onChange",
        resolver: yupResolver(AddLoans),
    });
    
    
    
    const Request= async(data)=>{
        setLoading(true)
        try {
            const isValid = await AddLoans.validate(data);
            if (isValid) {
                const isSaved = await ListPdfData(data)
                if(isSaved.length > 0){
                    DownloadExcel(isSaved)
                }
                else {
                    setLoading(false)
                    message.error('No Data Found')
                }
            }
            else{
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
            const uniqueEmployeeNames = [... new Set(hjh.map(x => x.Emp_name))];
            const attendances = uniqueEmployeeNames.map(name => {
                let attendanceRow = [name];
                const employeeAttendances = hjh.filter(x => x.Emp_name === name);
                for (let i = 0; i < employeeAttendances.length; i++) {
                    const attendance = employeeAttendances[i];
                    attendanceRow.push(`${attendance.Emp_Time_In_HH}:${attendance.Emp_Time_In_MM}`, `${attendance.Emp_Time_Out_HH}:${attendance.Emp_Time_Out_MM}`, `${attendance.Total_Shift_MM}`);
                }
                return attendanceRow;
            });
            const numberOfDays = [... new Set(hjh.map(x => x.Attendance_Date))];
            const ws = XLSX.utils.json_to_sheet([]);
            let merges = [];
            for (let i = 0; i < numberOfDays.length * 3; i++) {
                merges.push({ s: { r: 0, c: 1 + i }, e: { r: 0, c: 3 + i } })
            }
            ws['!merges'] = merges;
            XLSX.utils.sheet_add_aoa(ws, [["Employee Name", ...numberOfDays.map(x => [DateTime.fromSQL(x).toFormat("EEEE"), "", ""])].flat()], { origin: "A1" });
            XLSX.utils.sheet_add_aoa(ws, [["", ...numberOfDays.map(x => [DateTime.fromSQL(x).toFormat("yyyy LLL dd"), "", ""])].flat()], { origin: "A2" });
            XLSX.utils.sheet_add_aoa(ws, [['', ...Array(numberOfDays.length).fill(["In", "Out", "Total"]).flat()]], { origin: "A3" });
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
    return (
        <>

            <div>
                <Header />
            </div>
            <div>
                <SecondaryHeader isSearch={false} title={'Transaction - Attendance'} total={'1,000'} />
            </div>
            <div className={Style.TableBody}>
                <form onSubmit={handleSubmit(Request)}>
                <div className="d-flex align-items-end">
                    <FormSelect
                        deduction={'deductionFlag'}
                        errors={errors}
                        control={control}
                        placeholder={"Attendance month"}
                        name={'month'} label={'Attendance month'} options={monthList} />
                    <FormSelect
                        deduction={'deductionFlag'}
                        errors={errors}
                        control={control}
                        placeholder={"Attendance year"}
                        name={'year'} label={'Attendance year'} options={monthSalary} />
                    <SimpleButton loading={loading} type={'submit'} title={'Submit'}/>
                </div>
                </form>
            </div>
        </>
    )
}

function mapStateToProps({ PdfRender }) {
    return { PdfRender };
}
export default connect(mapStateToProps, PayrollUpload_Action)(PdfData);