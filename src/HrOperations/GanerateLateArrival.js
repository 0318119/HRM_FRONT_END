import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import { FormInput, FormSelect } from "../components/basic/input/formInput";
import { Button } from "../components/basic/button";
import "./assets/css/GenerateLateArrival.css";
import * as LATEArrival from "../store/actions/HrOperations/Late_Arrivals/index";
import { connect } from "react-redux";
import { message } from "antd";
import baseUrl from '../../src/config.json'
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { useForm } from "react-hook-form";
import LateArrivals from './LateArrival'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";



const GanerateLateArrival = ({ Red_LateArrival, GenerateLateArrivals, GetGenerateLateArrivalsData, GetDataDepartment, GetDataLocation, GetSectionData, GetDivisionData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [isGeneratedData, setGeneratedData] = useState([]);
  const [GenerateTable, setGenerateTable] = useState(false)
  const [useSubmitForm, setUseSubmitForm] = useState();
  // console.log(useSubmitForm == 'one' ? 'yes' : "No" , 'useSubmitForm')

  // const [GenrateLateArrival, setGenerateLateArrival] = useState('')
  // const [ExcelReport, setExcelReport] = useState('')
  



  const EditPage = (mode) => {
    setGenerateTable(mode)
  }



  const submitForm = async (data) => {
    try {
      const isValid = await GeneratedDataSchema.validate(data);
      if (isValid) {
        if (useSubmitForm == 'one'){
            GenerateData(data);  
          console.log(useSubmitForm) 
        } else {
            GenerateExcelData(data);
          console.log( useSubmitForm)
        }
      }
    } catch (error) {
      console.error(error);
    }
  };




  const GeneratedDataSchema = yup.object().shape({
    Div_code: yup.string().required("Div Code is required"),
    Dept_code: yup.string().required("Dept Code is required"),
    Section_code: yup.string().required("Section Code is required"),
    Loc_code: yup.string().required("Loc code is required"),
    Payroll_Year: yup.string().required("Payroll Year is required"),
    Payroll_Month: yup.string().required("Payroll Month is required")
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      Div_code: "",
      Dept_code: "",
      Section_code: "",
      Loc_code: "",
      Payroll_Year: "",
      Payroll_Month: ""
    },
    mode: "onChange",
    resolver: yupResolver(GeneratedDataSchema),
  });



  const GenerateData = async (data) => {
    const GenerateCreate = await GenerateLateArrivals({
      Div_code: data?.Div_code,
      Dept_code: data?.Dept_code,
      Section_code: data?.Section_code,
      Loc_code: data?.Loc_code,
      Payroll_Year: data?.Payroll_Year,
      Payroll_Month: data?.Payroll_Month,
    })
    setGeneratedData(GenerateCreate.data)
    if (GenerateCreate.success) {
      setGenerateTable(true)
      messageApi.open({
        type: 'success',
        content: "You have successfully Generated",
      });
    }
    else {
      messageApi.open({
        type: 'error',
        content: GenerateCreate?.message || GenerateCreate?.message,
      });
    }
  }


  const GenerateExcelData = async (data) => {
    try {
      const GenerateExcel = await GetGenerateLateArrivalsData({
        Div_code: data?.Div_code,
        Dept_code: data?.Dept_code,
        Section_code: data?.Section_code,
        Loc_code: data?.Loc_code,
        Payroll_Year: data?.Payroll_Year,
        Payroll_Month: data?.Payroll_Month,
      });

      if (GenerateExcel.success) {
        DownloadExcel(GenerateExcel?.data);

        messageApi.open({
          type: 'success',
          content: "Downloading Excel",
        });
      } else {
        messageApi.open({
          type: 'error',
          content: GenerateExcel?.message || "Failed to generate Excel",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
  const fileExtension = '.xlsx';

  const DownloadExcel = async (hjh) => {
    const ws = XLSX.utils.json_to_sheet(hjh);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "data" + fileExtension);

  }


  const DeptData = Red_LateArrival?.deptData?.[0]?.res
  const locationData = Red_LateArrival?.locationData?.[0]?.res;
  const SectionArray = Red_LateArrival?.SectionData?.[0]?.res;
  const DivisionArray = Red_LateArrival?.divisionData?.[0]?.res;

  if (DeptData?.message == "failed") { message.error("in Department :" + DeptData?.message) }
  else if (locationData?.message == "failed") { message.error("in Location :" + locationData?.message) }
  else if (SectionArray?.message == "failed") { message.error("in Section :" + SectionArray?.message) }
  else if (DivisionArray?.message == "failed") { message.error("in Division :" + DivisionArray?.message) }


  useEffect(() => {
    GetDivisionData()
    GetSectionData()
    GetDataLocation()
    GetDataDepartment()
  }, [])


  return (
    <>
      <div>
        <Header />
      </div>
      {contextHolder}
      <div className="container">
        <div className="row d-flex justify-content-center">
          <form className="col-lg-8 maringClass Boxform"
           onSubmit={handleSubmit(submitForm)}>
            <h4 className="text-dark">Generate Late Arrivals</h4>
            <div className="d-flex align-items-center">
              <FormInput
                label={'Payroll Year'}
                id="Payroll_Year"
                name="Payroll_Year"
                type="number"
                placeholder={"Year"}
                showLabel={true}
                errors={errors}
                control={control}
              />
              <FormInput
                label={'Payroll Month'}
                placeholder={"Month"}
                name="Payroll_Month"
                id="Payroll_Month"
                type="number"
                showLabel={true}
                errors={errors}
                control={control}
              />
            </div>
            <div className="d-flex align-items-center">
              <FormSelect
                className="FormSelectGF"
                placeholder={"Locations"}
                label='Locations'
                name='Loc_code'
                id='Loc_code'
                type='number'
                options={
                  locationData?.data?.map(item => ({
                    value: item.Loc_code,
                    label: item.Loc_name
                  }))
                }
                showLabel={true}
                errors={errors}
                control={control}
              />
              <FormSelect
                className="FormSelectGF"
                placeholder={"Departments"}
                name='Dept_code'
                label='Dept_code'
                id='Dept_code'
                type='number'
                options={
                  DeptData?.data.map(item => ({
                    value: item.Dept_code,
                    label: item.Dept_name
                  }))
                }
                showLabel={true}
                errors={errors}
                control={control}
              />
            </div>
            <div className="d-flex align-items-center">
              <FormSelect
                className="FormSelectGF"
                placeholder={"Division"}
                label='Division'
                name='Div_code'
                id='Div_code'
                type='number'
                options={
                  DivisionArray?.data.map(item => ({
                    value: item.Div_code,
                    label: item.Div_name
                  }))
                }
                showLabel={true}
                errors={errors}
                control={control}
              />
              <FormSelect
                className="FormSelectGF"
                label={'Units'}
                placeholder='Units'
                name='Section_code'
                id="Section_code"
                type='number'
                options={
                  SectionArray?.data.map(item => ({
                    value: item.Section_code,
                    label: item.Section_name
                  }))
                }
                showLabel={true}
                errors={errors}
                control={control}
              />
            </div>

            <div className="d-flex" >
              <Button title={"Generate Data"} id='one' type="submit" onClick={() => setUseSubmitForm('one')} />
              <Button title={'ExportToExcel'} id='two' type="submit" onClick={() => setUseSubmitForm('two')}  />
            </div>
          </form>
          {GenerateTable ? <div>
            <LateArrivals cancel={EditPage} mode={mode} isGeneratedData={isGeneratedData} />
          </div> : ""}

        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_LateArrival }) {
  return { Red_LateArrival };
}
export default connect(mapStateToProps, LATEArrival)(GanerateLateArrival);
