import React, { useState, useEffect } from "react";
import {
  CancelButton,
  PrimaryButton,
  SimpleButton,
} from "../../components/basic/button/index";
import * as Access_Control_ACTIONS from "../../store/actions/Addministration/Access_Control/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
// import { JvCodeScheme } from "../../../form/transactionPosting/Setup/schema";
import { Tree } from "antd";
import { message } from "antd";
import baseUrl from "../../../src/config.json";

function Access_ControlForm({
  cancel,
  mode,
  isCode,
  page,
  Red_Access_Control,
  GetAccessControlData,
  GetMenuDir,
}) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const EditBack = () => {
    cancel("read");
  };

  //   const submitForm = async (data) => {
  //     try {
  //       const isValid = await JvCodeScheme.validate(data);
  //       if (isValid) {
  //         POST_JV_Code_FORM(data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   console.log(Red_JV_Codes ,'Red_JV_Codes22')

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      // JV_Currency: Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_Currency,
      // JV_Cost_Centre:Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_Cost_Centre,
      // JV_MainAC:Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_MainAC,
      // JV_SubAC: Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_SubAC,
      // JV_Description: Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_Description,
      // Sort_key:Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
    },
    // mode: "onChange",
    // resolver: yupResolver(JvCodeScheme),
  });

    useEffect(() => {
      if (isCode !== null) {
        GetMenuDir(isCode);
      }
    }, []);

  //   useEffect(() => {
  //     if (mode == "create") {
  //       reset({
  //         JV_Currency: "",
  //         JV_Cost_Centre: "",
  //         JV_MainAC: "",
  //         JV_SubAC: "",
  //         JV_Description: "",
  //         Sort_key: "",

  //       });
  //     } else {
  //       reset({
  //         JV_Currency: Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_Currency,
  //         JV_Cost_Centre:Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_Cost_Centre,
  //         JV_MainAC:Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_MainAC,
  //         JV_SubAC: Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_SubAC,
  //         JV_Description: Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.JV_Description,
  //         Sort_key:Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]?.Sort_key,
  //       });
  //     }
  //   }, [Red_JV_Codes?.dataSingle?.[0]?.res?.data?.[0]]);

  //   console.log(Red_JV_Codes?.dataSingle, 'Red_JV_Codes?.dataSingle')

  //   //  JV FORM DATA API CALL ===========================
  //   async function POST_JV_Code_FORM(body) {
  //     setLoading(true);
  //     await fetch(
  //       `${baseUrl.baseUrl}/JVCodes/AddJvCode`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //           accessToken: `Bareer ${get_access_token}`,
  //         },
  //         body: JSON.stringify({
  //             JV_Unit: mode == "create" ? 0 : isCode,
  //             JV_Currency: body?.JV_Currency,
  //             JV_Cost_Centre: body?.JV_Cost_Centre,
  //             JV_MainAC: body?.JV_MainAC,
  //             JV_SubAC: body?.JV_SubAC,
  //             JV_Description: body?.JV_Description,
  //             Sort_key: body?.Sort_key,

  //         }),
  //       }
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then(async (response) => {
  //         if (response.success) {
  //           messageApi.open({
  //             type: "success",
  //             content: response?.message || response?.messsage,
  //           });
  //           setLoading(false);
  //           setTimeout(() => {
  //             cancel("read");
  //             GetJvCodeData({
  //               pageSize: pageSize,
  //               pageNo: page,
  //               search: null,
  //             });
  //           }, 3000);
  //         } else {
  //           setLoading(false);
  //           messageApi.open({
  //             type: "error",
  //             content: response?.message || response?.messsage,
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         messageApi.open({
  //           type: "error",
  //           content: error?.message || error?.messsage,
  //         });
  //       });
  //   }

  const treeData = [
    {
      title: "MenuLabel",
      key: "MenuCode",
      children: [
        {
          title: "0-0-0",
          key: "0-0-0",
          children: [
            {
              title: "0-0-0-0",
              key: "0-0-0-0",
            },
            {
              title: "0-0-0-1",
              key: "0-0-0-1",
            },
            {
              title: "0-0-0-2",
              key: "0-0-0-2",
            },
          ],
        },
        {
          title: "0-0-1",
          key: "0-0-1",
          children: [
            {
              title: "0-0-1-0",
              key: "0-0-1-0",
            },
            {
              title: "0-0-1-1",
              key: "0-0-1-1",
            },
            {
              title: "0-0-1-2",
              key: "0-0-1-2",
            },
          ],
        },
        {
          title: "0-0-2",
          key: "0-0-2",
        },
      ],
    },
    {
      title: "0-1",
      key: "0-1",
      children: [
        {
          title: "0-1-0-0",
          key: "0-1-0-0",
        },
        {
          title: "0-1-0-1",
          key: "0-1-0-1",
        },
        {
          title: "0-1-0-2",
          key: "0-1-0-2",
        },
      ],
    },
    {
      title: "0-2",
      key: "0-2",
    },
  ];

  const [expandedKeys, setExpandedKeys] = useState(["0-0-0", "0-0-1"]);
  const [checkedKeys, setCheckedKeys] = useState(["0-0-0"]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  console.log(Red_Access_Control.dataSingle[0],'Red_Access_Control')

  return (
    <>
      {contextHolder}
      {/* <form onSubmit={handleSubmit(submitForm)}> */}
      <form>
        <h4 className="text-dark">Access Control Form</h4>
        <hr />
        <div className="form-group formBoxAccess_Control">
          <FormInput
            label={"User Login"}
            placeholder={"User Login"}
            id="JV_Currency"
            name="JV_Currency"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />
          <FormInput
            label={"User Name"}
            placeholder={"User Name"}
            id="JV_Cost_Centre"
            name="JV_Cost_Centre"
            type="text"
            showLabel={true}
            errors={errors}
            control={control}
          />

          <div className="d-flex flex-column">
            <Tree
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={treeData}
            />
         
            {/* <SimpleButton title={"Update"} /> */}
          </div>
        </div>
        <hr />
        <div className="Access_ControlBtnBox">
          <CancelButton onClick={EditBack} title={"Cancel"} />
          <PrimaryButton type={'submit'} loading={isLoading} title="Save" />
        </div>
      </form>
    </>
  );
}

function mapStateToProps({ Red_Access_Control }) {
  return { Red_Access_Control };
}
export default connect(
  mapStateToProps,
  Access_Control_ACTIONS
)(Access_ControlForm);
