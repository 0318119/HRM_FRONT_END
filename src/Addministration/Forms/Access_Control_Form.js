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
  GetAllMenus
}) {
  var get_access_token = localStorage.getItem("access_token");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [expandedKeys, setExpandedKeys] = useState(["0-0-0", "0-0-1"]);
  const [checkedKeys, setCheckedKeys] = useState(["0-0-0"]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);


  const EditBack = () => {
    cancel("read");
  };

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
    // if (isCode !== null) {
    // GetMenuDir();
    // }
    GetAllMenus()
  }, []);

  console.log("Red_Access_Control", Red_Access_Control?.AllMenus?.[0]?.res?.data)






  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
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

  const treeData = [
    {
      title: "All",
      key: "menucode",
      children: [
        {
          title: 'npAdministration',
          key: "menucode",
        },
      ], // Assuming tempData is already an array
    },
  ];

  // console.log(Red_Access_Control.dataSingle[0]?.res?.data, 'Red_Access_Control')

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


          <h5 className="text-dark">Menus</h5>

          <div className="d-flex flex-column">
            <Tree
              checkable
              onExpand={onExpand}
              // expandedKeys={expandedKeys}
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
