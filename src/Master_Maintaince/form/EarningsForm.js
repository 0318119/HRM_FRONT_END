import React, { useState, useEffect } from "react";
import Input from "../../components/basic/input";
import { CancelButton, PrimaryButton } from "../../components/basic/button";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { MasterEarningSchema } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import * as MASTEREARNING_ACTIONS from "../../store/actions/MasterMaintaince/MasterEarning/index";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
import { message } from "antd";
import { Space, Table, Tag, Tooltip } from "antd";
import baseUrl from "../../../src/config.json";
import { lowerCase } from "@antv/util";

function EarningsForm({ cancel, mode, isCode, page, Red_MasterEarning, GetMasterEarningData, Get_Master_Earning_Allowance_By_EmpCode }) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [RedData, setRedData] = useState(null);
  const [postAllownces, setpostAllownces] = useState([])
  const [totalAmount, setTotalAmount] = useState(null);
  const [getInfo, setGetInfo] = useState([])

  const EditBack = () => {
    cancel("read");
  };


  const submitForm = async (data) => {
    try {
      const isValid = await MasterEarningSchema.validate(data);
      if (isValid) {
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
      Deletion_Flag: Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.Deletion_Flag,
    },
    mode: "onChange",
    resolver: yupResolver(MasterEarningSchema),
  });


  useEffect(() => {
    if (isCode !== null) {
      Get_Master_Earning_Allowance_By_EmpCode(isCode)
    }
  }, [])


  useEffect(() => {
    if (mode == "Edit") {
      reset(
        {
          Deletion_Flag: Red_MasterEarning?.dataSingle?.[0]?.res?.data?.[0]?.Deletion_Flag,
        },
      )
    }
  }, [Red_MasterEarning?.dataSingle])

  console.log("Updated Data", Red_MasterEarning)
  
  // PUSH ALLOWNCES CODE AND AMOUNT FUNCTION =======================
  useEffect(() => {
    var temp = []
    if (Red_MasterEarning?.dataSingle[0]?.res?.data?.length > 0) {
      for (var i of Red_MasterEarning?.dataSingle[0]?.res?.data) {
        var obj = {
          "Allowance_code": i.Allowance_code,
          "Amount": i.Amount
        }
        temp.push(obj)
        setpostAllownces([...temp])
        console.log("setPOst",postAllownces)
      }
    }
  }, [Red_MasterEarning?.dataSingle[0]?.res?.data])
  
  const [isShow,setShow] = useState("hide")
  // TABLE COLUMNS =====================
  const columns = [
    {
      title: "Allowance_code",
      dataIndex: "Allowance_code",
      key: "Allowance_code"
    },
    {
      title: "Allowance Name",
      dataIndex: "Allowance_name",
      key: "Allowance_name"
    },
    {
      title: "Amount",
      key: "Amount",
      render: (_, Amount, index) => {
        return (
          <>
            {
              isShow == "hide" ?
              <span onClick={(e) => {setShow("show")}}>{_?.Amount}</span> :
                <input
                  className="form-control"
                  defaultValue={_?.Amount}
                  type="number"
                  placeholder="Amount"
                  name={_?.Allowance_code}
                  onChange={(e) => {
                    postAllownces[index].Amount = e.target.value
                    setpostAllownces([...postAllownces])
                  }}
                />
            }
          </>

        )
      }
    },

  ];



  // MASTER EARNING FORM DATA API CALL ===========================
  async function POST_MASTER_EARNING_FORM(body) {
    setLoading(true);
    await fetch(`${baseUrl.baseUrl}/allowance/SaveAllowances`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
      body: JSON.stringify({
        "Emp_code": isCode,
        "Allowance": postAllownces,
        "Deletion_Flag": body.Deletion_Flag,
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

  // GET EMPLOYEE INFO CALL ==================
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


  // ALLOWNCES AMOUNT TOTAL FUNCTION ==================
  const fetchedTotalAmount = Red_MasterEarning?.dataSingle[0]?.res?.data;
  useEffect(() => {
    var temp = 0
    if (fetchedTotalAmount?.length > 0){
      for (var i of fetchedTotalAmount) {
          temp = temp + parseInt(i.Amount)
          setTotalAmount(temp)
        // }
      }
    }
  }, [Red_MasterEarning?.dataSingle]);


  return (
    <>

      {contextHolder}
      <form onSubmit={handleSubmit(submitForm)}>
        <h4 className="text-dark">MASTER EARNING</h4>
        <hr />
        <div className="form-group formBoxCountry">

          <FormInput
            label={"Employee Name"}
            placeholder={getInfo?.Emp_name ? getInfo?.Emp_name : 'Not Found'}
            id=""
            name=""
            readOnly
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Department Name"}
            placeholder={getInfo?.Dept_name ? getInfo?.Dept_name : "not found"}
            id=""
            name=""
            readOnly
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"Designation Name"}
            placeholder={getInfo?.Desig_Name ? getInfo?.Desig_Name : 'not Found'}
            id=""
            name=""
            readOnly
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormSelect
            label={'Deletion Flag '}
            placeholder='Deletion Flag'
            id="Deletion_Flag"
            name="Deletion_Flag"
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

        </div>
        <hr />
        <div>
          <Table
            columns={columns}
            loading={Red_MasterEarning?.loading}
            // dataSource={Red_MasterEarning?.dataSingle[0]?.res?.data}
            dataSource={Red_MasterEarning?.dataSingle[0]?.res?.data.map((item, index) => ({ ...item, key: index }))}
            pagination={false}
          />
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className="CountryBtnBox">
          <CancelButton title={"Cancel"} onClick={EditBack} />
          <PrimaryButton type={"submit"} title="Save" />
        </div>
      </form>
    </>
  );
}
function mapStateToProps({ Red_MasterEarning }) {
  return { Red_MasterEarning };
}
export default connect(mapStateToProps, MASTEREARNING_ACTIONS)(EarningsForm);




