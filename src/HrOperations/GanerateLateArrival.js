import React, { useEffect, useState } from "react";
import Header from "../components/Includes/Header";
import { FormInput } from "../components/basic/input/formInput";
import { PrimaryButton } from "../components/basic/button";
import  FormSelect  from "../components/basic/select/index";
import "./assets/css/InstitutionsList.css";
import * as LATEArrival from "../store/actions/HrOperations/Late_Arrivals/index";
import { connect } from "react-redux";
import { message } from "antd";
import baseUrl from '../../src/config.json'
import { useForm } from "react-hook-form";
import LateArrivals from './LateArrival'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const GanerateLateArrival = ({ Red_LateArrival, GenerateLateArrivals, GetGenerateLateArrivalsData, GetDataDepartment, GetDataLocation, GetSectionData, GetDivisionData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  var get_access_token = localStorage.getItem("access_token");
  const [isCode, setCode] = useState(null);
  const [mode, setMode] = useState("read");
  const [GenerateTable, setGenerateTable] = useState(false)
  const [isSec, setSec] = useState('')
  const [isLoc , setLoc] = useState('')
  const [isDept, setDept] = useState('')
  const [isDiv, setDiv] = useState('')
  const [isPy, setPy] = useState('')
  const [isPm, setPm] = useState('')
  const EditPage = (mode) => {
    setGenerateTable(mode)
  }



const submitForm = async (data) => {
    try {
      const isValid = await GeneratedDataSchema.validate(data);
      if (isValid) {
        // GenerateData(data)
        console.log(data, 'data')
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  const GeneratedDataSchema = yup.object().shape({
    Div_code: yup.number().required("Div Code is required"),
    Dept_code: yup.number().required("Dept Code is required"),
    Section_code: yup.number().required("Section Code is required"),
    Loc_code: yup.number().required("Loc code is required"),
    Payroll_Year: yup.number().required("Payroll Year is required"),
    Payroll_Month: yup.number().required("Payroll Month is required")
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {},
    mode: "onChange",
    resolver: yupResolver(GeneratedDataSchema),
  });



  // const GenerateData = async (data) => {

  //   const GenerateCreate = await GenerateLateArrivals({
  //     Div_code: data?.Div_code,
  //     Dept_code: data?.Dept_code,
  //     Section_code: data?.Section_code,
  //     Loc_code: data?.Loc_code,
  //     Payroll_Year: data?.Payroll_Year,
  //     Payroll_Month:data?.Payroll_Month,
  //   })
  //   console.log(GenerateCreate, 'GenerateCreate')
  //   setGenerateTable(true)
  //   if (GenerateCreate.success) {
  //     messageApi.open({
  //       type: 'success',
  //       content: "You have successfully Generated",
  //     });
  //   }
  //   else {
  //     messageApi.open({
  //       type: 'error',
  //       content: GenerateCreate?.message || GenerateCreate?.message,
  //     });
  //   }
  // }


  const DeptData = Red_LateArrival?.data?.[0]?.res?.data;
  const locationData = Red_LateArrival?.locationData?.[0]?.res?.data;
  const SectionArray = Red_LateArrival?.SectionData?.[0]?.res?.data;
  const DivisionArray = Red_LateArrival?.divisionData?.[0]?.res?.data;



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
        <div className="row">
          <form className="col-lg-12 maringClass" onSubmit={handleSubmit(submitForm)}>
            <h4 className="text-dark">Generate Late Arrivals</h4>
            <div className="d-flex align-items-center">
              <FormInput
                label={'Payroll Year'}
                id="Payroll_Year"
                name="Payroll_Year"
                type="number"
                // onChange={(e) => setPy(e.target.value)}
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
                // onChange={(e) => setPm(e.target.value)}
                showLabel={true}
                errors={errors}
                control={control}
              />              

              
            </div>
            <div className="d-flex align-items-center">
              <FormSelect
                placeholder={"Locations"}
                label='Locations'
                name='Loc_code' 
                id='Loc_code'
                type='number'
                // onChange={(e) => setLoc(e)}
                options={
                  locationData?.map(item => ({
                    value: item.Loc_code,
                    label: item.Loc_name
                  }))
                }
                showLabel={true}
                errors={errors}
                control={control}

              />
              <FormSelect
                deduction={'Departments'} 
                placeholder={"Departments"}
                name='Dept_code'
                label='Dept_code'
                id='Dept_code'
                type='number'
                // onChange={(e) => setDept(e)}
                options={
                  DeptData.map(item => ({
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
                placeholder={"Division"}
                label='Division'
                name='Div_code'
                id='Div_code'
                type='number'
                // onChange={(e) => setDiv(e)}
                  options={
                  DivisionArray.map(item => ({
                    value: item.Div_code,
                    label: item.Div_name
                  }))
                } 
                showLabel={true}
                errors={errors}
                control={control}
                />
              <FormSelect
                placeholder={"Units"}
                label={'Units'}
                name='Section_code'
                id="Section_code"
                type='number'
                // onChange={(e) => setSec(e)}
                options={
                  SectionArray.map(item => ({
                    value: item.Section_code,
                    label: item.Section_name
                  }))
                }
                showLabel={true}
                errors={errors}
                control={control}
                 />
            </div>
            <PrimaryButton type={"submit"} title="Generate Data" />

          </form>


          <div className="col-lg-12 maringClass">
            <h4 className="text-dark">Download</h4>
            {/* <div className="d-flex align-items-center">
              <Input
                label={'Payroll Year'}
                placeholder={"2023"}
                id={'Payroll Year'}
                type="number"
                name={'Payroll Year'}
                onChange={(e) => GetGenData(e.target.value)}
              />


              <Input
                label={'Payroll Month'}
                placeholder={"November"}
                type="number"
                id="Payroll_Month"
                name='Payroll_Month'
                onChange={(e) => GetGenData(e.target.value)}
              />

            </div>
            <div className="d-flex align-items-center">
              <FormSelect
                deduction={'Locations'}
                placeholder={"Locations"}
                name={'Locations'} label={'Locations'}
                // value={} 
                onChange={GetGenData}
                options={
                  dataArray2.map(item => ({
                    value: item.Loc_code,
                    label: item.Loc_name
                  }))
                }

              />
            </div>
            <div className="d-flex align-items-center">
              <FormSelect
                deduction={'Departments'}
                placeholder={"Departments"}
                name={'Departments'} label={'Departments'}
                // value={} 
                onChange={GetGenData}
                options={
                  dataArray.map(item => ({
                    value: item.Dept_code,
                    label: item.Dept_name
                  }))
                } />
            </div>
            
            <div className="d-flex align-items-center">
              <FormSelect
                deduction={'Division'}
                placeholder={"Division"}
                label={'Division'}
                name={'Division'}
                onChange={GetGenData}
                options={
                  DivisionArray.map(item => ({
                    value: item.Div_code,
                    label: item.Div_name
                  }))
                } />
            </div>
            <div className="d-flex align-items-center">
              <FormSelect
                deduction={'Units'}
                placeholder={"Units"}
                label={'Units'}
                name={'Units'}
                onChange={GetGenData}
                options={
                  SectionArray.map(item => ({
                    value: item.Section_code,
                    label: item.Section_name
                  }))
                } />
            </div> */}

          </div>
          <div>
            <PrimaryButton title={'ExportToExcel'} />
          </div>
          {GenerateTable ? <div>
            <LateArrivals cancel={EditPage} mode={mode} />
          </div> : " "}

        </div>
      </div>
    </>
  );
};

function mapStateToProps({ Red_LateArrival }) {
  return { Red_LateArrival };
}
export default connect(mapStateToProps, LATEArrival)(GanerateLateArrival);
