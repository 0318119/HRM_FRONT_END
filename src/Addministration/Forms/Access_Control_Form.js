import React, { useState, useEffect } from "react";
import {
  CancelButton,
  Button,
} from "../../components/basic/button/index";
import * as Access_Control_ACTIONS from "../../store/actions/Addministration/Access_Control/index";
import { connect } from "react-redux";
import { Input } from "../../components/basic/input/formInput";
import { Tree } from 'primereact/tree';
import { message } from "antd";


function Access_ControlForm({
  cancel,
  isCode,
  GetAllMenus,
  GetMenuDir,
  AddUserAccessMenus,
  UserGetCurrnetData
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedMenuData, setSelectedMenuData] = useState(null)
  const [selectedUser, setselectedUser] = useState()
  const [loader, setLoader] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [updaterArray, setUpdateArray] = useState()
  const [submitRequest, setSubmitRequest] = useState()
  const [submitLoader, setSubmitLoader] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState();
  const [nodes, setNodes] = useState();



  const EditBack = () => {
    cancel("read");
  };
  useEffect(() => {
    if (isCode !== null) {
      GetMenuDir(isCode);
    }
  }, []);

  const NodeGEnerate = async () => {
    setLoader(true)
    const AllMenus = await GetAllMenus()
    const createMenuTree = (menus, parentCode = 0, level = 1) => {
      const filteredMenus = menus?.data.filter(menu => menu.ParentCode === parentCode && menu.Level === level);
      if (!filteredMenus || filteredMenus.length === 0) {
        return null;
      }
      return filteredMenus.map(menu => ({
        key: menu.menucode,
        label: menu.menulabel,
        data: menu.menulabel,
        children: createMenuTree(menus, menu.menucode, level + 1),
      }));
    };
    const one = await createMenuTree(AllMenus);
    setNodes(one)
    setLoader(false)
  }

  useEffect(() => {
    NodeGEnerate()
    GetDataY()
    GetUserLoginData()
  }, []);

  async function GetUserLoginData() {
    const AttachUser = await UserGetCurrnetData(isCode)
    setselectedUser(AttachUser?.data)
  }
  async function GetDataY() {
    const Data = await GetMenuDir(isCode)
    const keysToRemove = ['usercode', 'company_code'];
    const newArray = Data?.data.map((originalObject) => {
      const modifiedObject = { ...originalObject };
      keysToRemove.forEach((key) => delete modifiedObject[key]);
      return modifiedObject;
    });
    setSelectedMenuData(newArray)
  }

  useEffect(() => {
    if (selectedMenuData) {
      const transformedObject = selectedMenuData.reduce((result, item) => {
        const { menucode, checked } = item;
        result[menucode] = { checked };
        return result;
      }, {});
      setSelectedKeys(transformedObject);
    }
  }, [selectedMenuData]);

  


  const ChnageStructure = (e) => {
    setUpdateArray(e)
    const newArray = Object.keys(e).map(key => ({
      value: parseInt(key),
      checked: e[key].checked
    }));
    setIsChange(true)
    setSubmitRequest(newArray)
  }

  const submitDirectory = async () => {
    setSubmitLoader(true)
    if (submitRequest == undefined) {
      message.error('No Changes Found')
      setSubmitLoader(false)
    }
    else {
      const submited = await AddUserAccessMenus({ Emp_code: isCode, menu_code: submitRequest })
      if (submited.success == "success") {
        message.success('Menu Successfully Updated')
        setSubmitLoader(false)
      }
      else {
        message.error('Something Went Wrong')
        setSubmitLoader(false)
      }
    }
  }
  return (
    <>
      {contextHolder}
      <div className="conta1iner">
        <div className="row">
          <div className="col-lg-12 px-0">
            <h4 className="text-dark">Access Control Form</h4>
            <hr />
            <div className="form-group formBoxAccess_Control">
              <Input
                label={"User Login"}
                placeholder={"User Login"}
                type="text"
                value={selectedUser?.Emp_User_ID}
                readonly={true}
              />
              <Input
                label={"User Name"}
                placeholder={"User Name"}
                type="text"
                value={selectedUser?.Emp_name}
                readonly={true}
              />
            </div>
          </div>
          <hr />
          <div className="col-lg-6">
            <div>
              <Tree loading={loader} filter filterMode="strict" value={nodes} selectionMode="checkbox" selectionKeys={isChange ? updaterArray : selectedKeys} onSelectionChange={(e) => ChnageStructure(e.value)} className="w-full md:w-30rem" />
            </div>
          </div>
          <div className="Access_ControlBtnBox">
            <CancelButton onClick={EditBack} title={"Cancel"} />
            <Button loading={submitLoader} onClick={submitDirectory} type={'submit'} title="Save" />
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