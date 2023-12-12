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
import { Tree } from "antd";
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

  const scdMenuLevel = []
  // Red_Access_Control?.AllMenus?.[0]?.data.map((items) => {
  //   if(items?.ParentCode == 0 && items?.Level ==1){
  //     Red_Access_Control?.AllMenus?.[0]?.data.map((secondLevel) => {
  //       if(items?.menucode == secondLevel?.ParentCode && secondLevel?.Level == 2){
  //         scdMenuLevel.push({
  //           title: secondLevel?.menulabel,
  //           key: secondLevel?.ParentCode
  //         })
  //         Red_Access_Control?.AllMenus?.[0]?.data.map((thirdLevel) => {
  //           if(secondLevel?.menucode == thirdLevel?.ParentCode && thirdLevel?.Level == 3){
  //             scdMenuLevel.push({
  //               children: [
  //                 {
  //                   title: thirdLevel?.menulabel,
  //                   key: thirdLevel?.ParentCode
  //                 }
  //               ]
  //             })
  //           }
  //         })
  //       }
  //     })
  //   }
  // })
  // console.log("oneMenuLevel",scdMenuLevel)

  const treeData = [
    {
      title: Red_Access_Control?.AllMenus?.[0]?.data.map((data) => {
        if (data?.ParentCode === 0 && data?.Level) {
          return data?.menulabel
        }
      }),
      key: Red_Access_Control?.AllMenus?.[0]?.data.map((data) => {
        if (data?.ParentCode === 0 && data?.Level) {
          return data?.ParentCode
        }
      }),
      // children: scdMenuLevel,
    },
  ];

  console.log("AllMenus", Red_Access_Control?.AllMenus?.[0])

  const AllMenus = Red_Access_Control?.AllMenus?.[0];


  return (
    <>
      {contextHolder}
      {/* <form onSubmit={handleSubmit(submitForm)}> */}
      <div className="container">
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