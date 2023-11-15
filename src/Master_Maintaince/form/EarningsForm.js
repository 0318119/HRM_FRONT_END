import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { MasterEarningSchema } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as MASTEREARNING_ACTIONS from "../../store/actions/MasterMaintaince/MasterEarning/index";
import { FormInput } from "../../components/basic/input/formInput";
import { message } from "antd";
import { Space, Table, Tag, Tooltip } from "antd";
import baseUrl from "../../../src/config.json";

function EarningsForm({ cancel, mode, isCode, page, Red_MasterEarning, GetMasterEarningData, Get_Master_Earning_Allowance_By_EmpCode }) {
    var get_access_token = localStorage.getItem("access_token");
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  
    const EditBack = () => {
      cancel("read");
    };
    const submitForm = async (data) => {
        try {
          const isValid = await MasterEarningSchema.validate(data);
        if (isValid) {
            console.log(data, "data");
          POST_MASTER_EARNING_FORM(data)
        } 
      } catch (error) {
        console.error(error, "error message");
      }
    };
  
    const {
      control,
      formState: { errors },
      handleSubmit,
      reset,
    } = useForm({
      defaultValues: {
        City_name: Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.City_name,
        City_abbr: Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.City_abbr,
        Province_Code: Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.Province_Code,
        Region_Code: Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.Region_Code,
        Sort_key: Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
      },
      mode: "onChange",
      resolver: yupResolver(MasterEarningSchema),
    });
  
      useEffect(() => {
        if (isCode !== null) {
          Get_Master_Earning_Allowance_By_EmpCode(isCode)
        }
      }, [])
  console.log("isCode", isCode)
  console.log("Red_MasterEarning", 0)
   
  useEffect(() => {
      reset(
        {
          Grade_name: Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.Grade_name,
          Grade_abbr: Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.Grade_abbr,
          ProbationMonths: Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.Probation_Months,
          Incentive_Hour_Rate: Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.Incentive_Hour_Rate,
          Incentive_Weekdays_Limit_Hour: Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.Incentive_Weekdays_Limit_Hour,
     
        },
      )
    
  }, [Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]])
  
    // MASTER EARNING FORM DATA API CALL ===========================
    async function POST_MASTER_EARNING_FORM(body) {
      setLoading(true);
      await fetch(`${baseUrl.baseUrl}/cities/AddCity`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
        body: JSON.stringify({
          "City_code": 0,
          "City_abbr": body.City_abbr,
          "City_name": body.City_name,
          "Province_Code": body.Province_Code,
          "Region_Code": body.Region_Code,
          "Sort_key": body.Sort_key, 
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then(async (response) => {
          if (response.success) {
            messageApi.open({
              type: "success",
              content: response?.message || response?.messsage,
            });
            setLoading(false);
            setTimeout(() => {
              cancel("read");
              GetMasterEarningData({
                pageSize: pageSize,
                pageNo: page,
                search: null
              })
            }, 3000);
          } else {
            setLoading(false);
            messageApi.open({
              type: "error",
              content: response?.message || response?.messsage,
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          messageApi.open({
            type: "error",
            content: error?.message || error?.messsage,
          });
        });
    }
 
   const [getInfo, setGetInfo] = useState([]) 
  async function getAllEmpInfo(body) {

    setLoading(true);
    await fetch(`${baseUrl.baseUrl}/tranConformation/GetEmployeeInfoTranConfirmation`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        "Emp_code": isCode,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.success) {
          setGetInfo(response?.data[0][0])
          console.log(response?.data[0][0], "response?.data[0][0]")
          // messageApi.open({
          //   type: "success",
          //   content: response?.message || response?.messsage,
          // });
          setLoading(false);
          // setTimeout(() => {
          //   cancel("read");
          // }, 3000);
        } else {
          setLoading(false);
          messageApi.open({
            type: "error",
            content: response?.message || response?.messsage,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        messageApi.open({
          type: "error",
          content: error?.message || error?.messsage,
        });
      });
  }

  useEffect(() => {
    getAllEmpInfo()
  }, [])
  
  // const [isRedData, setRedData] = useState(Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.Allowance_name)
  // console.log(Red_MasterEarning, 'isRedData')
  
  const columns = [
    {
      title: "Allowance code",
      dataIndex: "Allowance_code",
      key: "Allowance_code"
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      render: (data) => (
          <input type="text"  />
      )  
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (data) => (
    //     <Space size="middle">
    //       <button
    //         onClick={() => EditPage("Edit", data?.Emp_code)}
    //         className="editBtn"
    //       >
    //         <FaEdit />
    //       </button>
    //     </Space>
    //   ),
    // },
  ];



    return (
      <>
  
          {contextHolder}
        <form >
          <h4 className="text-dark">MASTER EARNING</h4>
          <hr />
          <div className="form-group formBoxCountry">

                <FormInput
              label={"Employee Name"}
              placeholder={getInfo?.Emp_name ? getInfo?.Emp_name : 'Not Found'}
              id="Emp_name"
              name="Emp_name"
              type="text"
              readOnly
              showLabel={true}
              errors={errors}
              control={control}
            />
            <FormInput
              label={"Department Name"}
              placeholder={getInfo?.Dept_name ? getInfo?.Dept_name : "not found"}
              id="City_name"
              name="City_name"
              type="text"
              readOnly
              showLabel={true}
              errors={errors}
              control={control}
            />
            <FormInput
              label={"Designation Name"}
              placeholder={getInfo?.Desig_Name ? getInfo?.Desig_Name : 'not Found'}
              id="City_abbr"
              name="City_abbr"
              type="text"
              readOnly
              showLabel={true}
              errors={errors}
              control={control}
            />
         
          </div>
          <hr />
          <div className="d-flex">
            <Table
              columns={columns}
              loading={Red_MasterEarning?.loading}
              dataSource={Red_MasterEarning?.dataSingle?.[0]?.res?.data}
            />
          </div>
          <div className="CountryBtnBox">
            <CancelButton  title={"Cancel"} />
            <PrimaryButton type={"submit"}   title="Save" />
          </div>
        </form>
      </>
    );
  }
function mapStateToProps({ Red_MasterEarning }) {
    return { Red_MasterEarning };
  }
export default connect(mapStateToProps, MASTEREARNING_ACTIONS)(EarningsForm);
  