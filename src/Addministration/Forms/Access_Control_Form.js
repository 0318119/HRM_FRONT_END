import React, { useState, useEffect } from "react";
import {
  CancelButton,
  PrimaryButton,
  Button,
} from "../../components/basic/button/index";
import * as Access_Control_ACTIONS from "../../store/actions/Addministration/Access_Control/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from "../../components/basic/input/formInput";
// import { JvCodeScheme } from "../../../form/transactionPosting/Setup/schema";
import { DownOutlined } from '@ant-design/icons';
// import { Tree } from "antd";
import { Tree } from 'primereact/tree';
import { message } from "antd";
import baseUrl from "../../../src/config.json";
import { Checkbox } from 'antd';


function Access_ControlForm({
  cancel,
  mode,
  isCode,
  page,
  Red_Access_Control,
  GetAccessControlData,
  GetMenuDir,
  GetAllMenus,
  AddUserAccessMenus
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isShowIconOne, setisShowIconOne] = useState("")
  const [isShowIconTwo, setisShowIconTwo] = useState("")
  const [isShowIconThree, setisShowIconThree] = useState("")
  const EditBack = () => {
    cancel("read");
  };
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
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
    if (isCode !== null) {
      GetMenuDir(isCode);
    }
  }, []);

  useEffect(() => {
    GetAllMenus()
  }, []);




  const AllMenus = Red_Access_Control?.AllMenus?.[0];
  const one = AllMenus?.data
    .filter((levelOneFilter) => levelOneFilter.ParentCode === 0 && levelOneFilter.Level === 1)
    .map((levelOneMap) => ({
      key: levelOneMap.menucode,
      label: levelOneMap.menulabel,
      data: levelOneMap.menulabel,
      children: AllMenus?.data.filter(LevelTwoFilter => LevelTwoFilter.ParentCode === levelOneMap.menucode)
        .map((levelTwoMap) => ({
          key: levelTwoMap.menucode,
          label: levelTwoMap.menulabel,
          data: levelTwoMap.menulabel,
          children: AllMenus?.data.filter(LevelThreeFilter => LevelThreeFilter.ParentCode === levelTwoMap.menucode)
            .map((levelThreeMap) => ({
              key: levelThreeMap.menucode,
              label: levelThreeMap.menulabel,
              data: levelThreeMap.menulabel,
              children: AllMenus?.data.filter(LevelFourFilter => LevelFourFilter.ParentCode === levelThreeMap.menucode)
                .map((LevelFourFilter) => ({
                  key: LevelFourFilter.menucode,
                  label: LevelFourFilter.menulabel,
                  data: LevelFourFilter.menulabel,
                })),
            })),
        })),
    }));
  const [nodes, setNodes] = useState(one);
  const [selectedKeys, setSelectedKeys] = useState(null);

  const keys = [];

  for (let key in selectedKeys) {
    if (selectedKeys.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  console.log(keys,selectedKeys,'hello world')

  const submitDirectory = () => {
    AddUserAccessMenus(keys)
  }

  return (
    <>
      {contextHolder}
      {/* <form onSubmit={handleSubmit(submitForm)}> */}
      <div className="conta1iner">
        <div className="row">
          <div className="col-lg-12">
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
            </div>
          </div>
          <hr />
          <div className="col-lg-6">
            <div>
              {/* <Tree
                  showLine
                  switcherIcon={<DownOutlined />}
                  defaultExpandedKeys={['0-0-0']}
                  onSelect={onSelect}
                  treeData={treeData}
                /> */}
              <Tree value={nodes} selectionMode="checkbox" selectionKeys={selectedKeys} onSelectionChange={(e) => setSelectedKeys(e.value)} className="w-full md:w-30rem" />
            </div>
          </div>
          <div className="Access_ControlBtnBox">
            <CancelButton onClick={EditBack} title={"Cancel"} />
            <Button onClick={submitDirectory} type={'submit'} title="Save" />
          </div>
        </div>
      </div>

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