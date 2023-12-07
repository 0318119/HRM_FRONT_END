import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { Tooltip } from 'antd';
import User from '../Assets/Images/profile.png';
// import User from '../../src/Assets/Images/user.avi'
import './flow.css'
import baseUrl from '../config.json'
import Header from '../components/Includes/Header';
import { Flex, Spin } from 'antd';
import { message } from 'antd';




export default function ChartFlow() {

  const [isChartData, setChartData] = useState([])
  const [user, setuser] = useState(localStorage.getItem('Emp_code'))
  const [dynamicStates, setDynamicStates] = useState([]);
  const [hasCode, setHasCode] = useState(true);
  const [loading, setLoading] = useState(false)

  const OrgData = async () => {
    setLoading(true)
    fetch(`${baseUrl.baseUrl}/COPY`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
      },
      body: JSON.stringify({
        "Emp_code": user
      }),
    }).then((response) => { return response.json() })
      .then((response) => {
        if (response?.data?.length > 0 && response?.success) {
          const combineArrays = (currentArray, prevArrays) => {
            return [...prevArrays, ...currentArray];
          };
          setChartData(combineArrays(response?.data, isChartData));
        } else if (response?.data?.length == 0 && response?.success) {
            message.error("No data available")
        } else {
            message.error(response?.message || response?.messsage)
        }
      }).catch((error) => {
            message.error(error?.message || error?.messsage)
      }).finally(() => { setLoading(false) })
  }



  const removeItemByKey = (keyToRemove) => {
    setDynamicStates(prevStates => prevStates.filter(state => state.code !== keyToRemove));
  };

  useEffect(() => {
    OrgData()
  }, [user])



  return (
    <>
      <div>
        <Header />
      </div>
      {loading &&
          <div className='orgLoader'>
            <Spin size="large" style={{ marginTop: "180px" }} />
          </div>
      }
      <div className='mainOrg mt-5 pt-5'>
        {isChartData?.map((root) => {
          if (root?.Supervisor_Code == null) {
            return (<>
              <div className="row">
                <div className={`rootOrgBox ${dynamicStates.filter((items) => items?.code == root.Emp_code)[0] ? `` : `rootBoxBottomBorder`}`}
                  style={{ margin: "39px auto 29px auto" }}>
                  <div className='d-flex justify-content-center'>
                    <img src={User} />
                    <div className='ml-4'>
                      <Tooltip placement="top" title={`Name : ${root?.Label}`}>
                        <span>{root?.Label.slice(0, 15)}...</span>
                      </Tooltip>
                      <Tooltip placement="top" title={`Designation : ${root?.Desig_name}`}>
                        <span>{root?.Desig_name.slice(0, 15)}...</span>
                      </Tooltip>
                    </div>
                  </div>
                  <div className='showableIcon'
                    onClick={() => {
                      if (root?.Emp_code) {
                        if (hasCode) {
                          const newState = {
                            "code": root.Emp_code,
                          };
                          setDynamicStates(prev => [...prev, newState]);
                        } else {
                          removeItemByKey(root.Emp_code);
                        }
                        setHasCode(prevHasCode => !prevHasCode);
                      }
                    }}
                  >{root?.subordinates?.length > 1 || root?.subordinates?.length == 1 ? <IoIosArrowDown /> : null}</div>
                </div>
              </div>
              <div className={`row justify-content-center childrensBox ${dynamicStates.filter((items) => items?.code == root.Emp_code)[0] ? `d-none` : `d-flex`} ${root?.subordinates?.length > 1 ? `childrenUpperBorder` : null}`}
                style={root?.subordinates?.length > 1 ? { margin: "35px 0" } : { margin: "10px 0" }}>
                {
                  root?.subordinates?.map((items) => {
                    if (items?.Supervisor_Code == root?.Emp_code) {
                      return (<>
                        <div className='rootOrgBox childMiddleBorder' style={{ marginTop: "60px", paddingBottom: "45px" }}>
                          {/* <img src={arrow} alt={arrow} className='arrow'/> */}
                          <div className='d-flex justify-content-center'>
                            <img src={User} />
                            <div className='ml-4'>
                              <Tooltip placement="top" title={`Name : ${items?.Label}`}>
                                <span>{items?.Label.slice(0, 15)}...</span>
                              </Tooltip>
                              <Tooltip placement="top" title={`Designation : ${items?.Desig_name}`}>
                                <p>{items?.Desig_name.slice(0, 15)}...</p>
                              </Tooltip>
                            </div>
                            <button id={items?.Emp_code} onClick={(e) => { e.stopPropagation(); setuser(e.target.getAttribute('id')) }}>more</button>
                          </div>
                        </div>
                      </>)
                    }
                  })
                }
              </div>
            </>)
          }
        })}
      </div>
    </>
  )
}
