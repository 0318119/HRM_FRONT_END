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
  GetAllMenus
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
      children:  AllMenus?.data.filter(LevelTwoFilter => LevelTwoFilter.ParentCode === levelOneMap.menucode && LevelTwoFilter.Level == 2)
      .map((levelTwoMap) => ({
        key: levelTwoMap.menucode, 
        label: levelTwoMap.menulabel,
        data: levelTwoMap.menulabel,
        children:  AllMenus?.data.filter(LevelThreeFilter => LevelThreeFilter.ParentCode === levelTwoMap.menucode && LevelThreeFilter.Level == 3)
        .map((levelThreeMap) => ({
          key: levelThreeMap.menucode, 
          label: levelThreeMap.menulabel,
          data: levelThreeMap.menulabel,
        })),
      })),
  }));
  const [nodes, setNodes] = useState(one);
  const [selectedKeys, setSelectedKeys] = useState(null);

  console.log("selectedKeys",selectedKeys)
  


  return (
    <>
      {contextHolder}
      {/* <form onSubmit={handleSubmit(submitForm)}> */}
      <div className="conta1iner">
        <div className="row">
          <form action="">
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
                <ul className="treeLeftOne">
                  {
                    // LEVEL ONE OF MENU ========
                    AllMenus?.data.filter(Level_one => Level_one.ParentCode == 0 && Level_one.Level == 1)?.map((levelOne) => {
                      return (
                        <>
                          <li
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isShowIconOne == levelOne.menulabel) {
                                setisShowIconOne("")
                              } else {
                                setisShowIconOne(levelOne.menulabel)
                              }
                            }}><Checkbox data-id={levelOne?.menucode} /> {levelOne?.menulabel}

                            {/* // LEVEL TWO OF MENU ======== */}
                            {
                              isShowIconOne == levelOne.menulabel && (
                                <ul>{
                                  AllMenus?.data.filter(Level_two => Level_two.ParentCode === levelOne.menucode && Level_two.Level == 2).map((levelTwo) => {
                                    return (
                                      <li
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (isShowIconTwo == levelTwo.menulabel) {
                                            setisShowIconTwo("")
                                          } else {
                                            setisShowIconTwo(levelTwo.menulabel)
                                          }
                                        }}
                                      ><Checkbox data-id={levelTwo?.menucode} /> {levelTwo?.menulabel}
                                        {/* // LEVEL THREE OF MENU ======== */}
                                        {isShowIconTwo == levelTwo.menulabel && (
                                          <ul>
                                            {
                                              AllMenus?.data.filter(Level_three => Level_three.ParentCode === levelTwo.menucode && Level_three.Level == 3).map((Level_Three) => {
                                                return (
                                                  <li
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      if (isShowIconThree == Level_Three.menulabel) {
                                                        setisShowIconThree("")
                                                      } else {
                                                        setisShowIconThree(Level_Three.menulabel)
                                                      }
                                                    }}
                                                  ><Checkbox data-id={Level_Three?.menucode} /> {Level_Three?.menulabel}

                                                    {/* // LEVEL FOUR OF MENU ======== */}
                                                    {
                                                      isShowIconThree == Level_Three.menulabel && (
                                                        <ul>
                                                          {
                                                            AllMenus?.data.filter(Level_four => Level_four.ParentCode === Level_Three.menucode && Level_Three.Level == 4).map((LevelFour) => {
                                                              return (
                                                                <li><Checkbox data-id={LevelFour?.menucode} /> {LevelFour?.menulabel}</li>
                                                              )
                                                            })
                                                          }
                                                        </ul>

                                                      )}

                                                  </li>
                                                )
                                              })
                                            }
                                          </ul>
                                        )}

                                      </li>
                                    )
                                  })
                                }
                                </ul>
                              )
                            }

                          </li>
                        </>
                      )
                    })
                  }
                </ul>
                <Tree value={nodes} selectionMode="checkbox" selectionKeys={selectedKeys} onSelectionChange={(e) => setSelectedKeys(e.value)} className="w-full md:w-30rem" />
              </div>
            </div>
            <div className="Access_ControlBtnBox">
              <CancelButton onClick={EditBack} title={"Cancel"} />
              <PrimaryButton type={'submit'} title="Save" />
            </div>
          </form>
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