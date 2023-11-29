import React, { useEffect, useState, useRef } from 'react';
import baseUrl from '../config.json'
import { OrganizationChart } from 'primereact/organizationchart';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './flags.css'
import Header from '../components/Includes/Header';
import User from '../../src/Assets/Images/user.avi'
import './flow.css'
import { Spin } from 'antd';


export default function ChartFlow() {
  const [user, setuser] = useState(localStorage.getItem('Emp_code'))
  const [isChartData, setChartData] = useState([])
  const [selection, setSelection] = useState([]);
  const [isTest, setTest] = useState([])

  const testData = async () => {
    fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeeTree_Organizational_Chart`, {
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
        const combineArrays = (currentArray, prevArrays) => {
          return [...prevArrays, ...currentArray];
        };
        setChartData(combineArrays(response.data, isChartData));
      })
      .catch((error) => {
        console.log("Error :", error)
      })
  }
  const copy = async () => {
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
        setTest(response?.data)
      })
      .catch((error) => {
        console.log("Error :", error)
      })
  }

  useEffect(() => {
    testData()
    copy()
  }, [user])






  // console.log("isTest",isTest)
  // isTest.map((chk) => {console.log("chk",chk)})

  // const chk = [isChartData.filter((chk) => chk.Supervisor_Code !== null)]
  // const temp = isChartData?.reduce((acc, items) => {
  //   if (items?.Supervisor_Code !== null) {
  //     // Find the parent node in the accumulator based on Supervisor_Code
  //     const parentNode = acc.find(node => node.data.code === items.Supervisor_Code);
  //     if (parentNode && items?.Supervisor_Code !== null) {
  //       parentNode.children = parentNode.children || [];
  //       parentNode.children.push({
  //         expanded: true,
  //         type: 'person',
  //         data: {
  //           image: User,
  //           name: items.Emp_name,
  //           title: items.Desig_name,
  //           code: items.Emp_code,
  //           Supervisor_Code: items.Supervisor_Code
  //         },
  //         // children: [] // Add children array if needed for this node
  //       });
  //     }
  //   } else {
  //     acc.push({
  //       expanded: true,
  //       type: 'person',
  //       data: {
  //         image: User,
  //         name: items.Emp_name,
  //         title: items.Desig_name,
  //         code: items.Emp_code,
  //         Supervisor_Code: items.Supervisor_Code
  //       },
  //       // children: [] // Add children array if needed for this node
  //     });
  //   }

  //   return acc;
  // }, []);

  // const data = [
  //   {
  //     expanded: true,
  //     type: 'person',
  //     data: {
  //       image: User,
  //       name: isChartData?.filter((item) => item?.Supervisor_Code == null)?.[0]?.Emp_name,
  //       title: isChartData?.filter((item) => item?.Supervisor_Code == null)?.[0]?.Desig_name,
  //       code : isChartData?.filter((item) => item?.Supervisor_Code == null)?.[0]?.Emp_code
  //     },
  //     children: temp
  //   }
  // ]

  // const nodeTemplate = (node) => {
  //   if (node.type === 'person') {
  //     return (
  //       <>
  //         <div className="orgNodeBox" id={node?.data?.code} onClick={(e) => {setuser(e.target.getAttribute('id'))}}>
  //             <img alt={node.data.name} src={node.data.image} className="w-3rem h-3rem" />
  //             <div className="orgNodeInnerBox">
  //               <h5>{node.data.name}</h5>
  //               <span>{node.data.title}</span>
  //             </div>
  //         </div>
  //       </>
  //     );
  //   }
  // };
  // const handleId = (e) => {
  //   setuser(e.target.getAttribute('id'))
  // }
  // console.log("user", user)

  {console.log("isTest", isTest)}

  return (
    <>
      <div>
        <Header />
      </div>
      <div className='container-fluid'>
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className='chatMargin flowchartBg'>
              <h5><b>Organization</b></h5>

              {isTest?.map((items) => {
                return(
                  <>
                      <div className='mainOrg'>
                        {/* MAIN ROOT BOX */}
                        <div>
                          <span>{items?.Emp_name}</span>
                          <p>{items?.Desig_name}</p>
                        </div>
                        <div>
                          <h3>Child 2</h3>
                          <p>Content for Child 2</p>

                          <div>
                            <h4>Nested Child</h4>
                            <p>Content for Nested Child</p>
                          </div>
                        </div>
                      </div>
                  </>
                    )
                  })}

                {/* <div className='rootOrgBox'>
                  <img src={User} alt="" />
                  <div className='contentBoxOrg'>
                    <span>Hamza</span>
                    <span>Access Director</span>
                  </div>
                </div> */}

                {/* <div className='d-flex'>

                  
                  {isChartData.map((items) => {
                    if (items.Supervisor_Code !== null) {
                      return (
                        <>
                          <div className='rootOrgBox' id={items.Emp_code} onClick={handleId}>
                            <img src={User} alt="" />
                            <div className='contentBoxOrg'>
                              <span>{items?.Emp_name}</span>
                              <span>{items?.Desig_name}</span>
                            </div>

                            <div>
                              {console.log("object",isChartData.filter((item) => item.Emp_code === item.Supervisor_Code))}
                            </div>
                          </div>
                        </>
                      )
                    }
                  })}
                </div> */}

              {/* <div className='orgChartLoader'>
                {isChartData?.length > 0 ?
                  <OrganizationChart
                    value={data}
                    selectionMode="multiple" selection={selection}
                    onSelectionChange={(e) => setSelection(e.data)}
                    nodeTemplate={nodeTemplate}
                  /> : <Spin size="large" className='m-auto' />
                }
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

