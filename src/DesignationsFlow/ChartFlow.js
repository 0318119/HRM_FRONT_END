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
import { OrganizationChart } from 'primereact/organizationchart';





export default function ChartFlow() {
  const [isChartData, setChartData] = useState([])
  const [user, setuser] = useState(localStorage.getItem('Emp_code'))
  const [loading,setLoading] = useState(false)

  
  const ChartData = async () => {
    setLoading(true)
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
        if (response?.data?.length > 0 && response?.success) {
          if(response?.data?.length === 1 && response?.success){
            message.error(`don't exits Employee against this - Emp_code ${user}`)
            setuser(null)
          }else{
              const combineArrays = (currentArray, prevArrays) => {
              return [...prevArrays, ...currentArray];
          };
            setChartData(combineArrays(response?.data, isChartData));
            setuser(null)
          }
        }
        else {
          message.error(response?.message || response?.messsage)
        }
      }).catch((error) => {
        message.error(error?.message || error?.messsage)
      })
    .finally(() => { setLoading(false) })
  }

  useEffect(() => {
    if(user !== null){
      ChartData()
    }
  }, [user])

  useEffect(() => {
    if(loading == true){
      message.loading("Please wait...")
    }
  },[loading])



  const ParentSupervisor = isChartData.find(data => data.Supervisor_Code == null)
  const generateNestedData = (supervisor, chartData) => {
    const topLevelData = {
      name: supervisor?.Label,
      designation: supervisor?.Desig_name,
      image: false,
      parent: "parent",
      expanded: true,
      show: supervisor?.show,
      Emp_code: supervisor?.Emp_code,
      children: [],
    };
    topLevelData.children = chartData
    .filter((firstChild) => supervisor?.Emp_code === firstChild?.Supervisor_Code)
      .map((firstChild) => {
        const firstLevel = {
          ...firstChild,
          children: [],
        };
        firstLevel.children = chartData
          .filter((secondChild) => firstChild?.Emp_code === secondChild?.Supervisor_Code)
          .map((secondChild) => {
            const secondLevel = {
              ...secondChild,
              children: [],
            };
            secondLevel.children = chartData
              .filter((thirdChild) => secondChild?.Emp_code === thirdChild?.Supervisor_Code)
              .map((thirdChild) => {
                const thirdLevel = {
                  ...thirdChild,
                  children: [],
                };
                thirdLevel.children = chartData
                  .filter((fourthChild) => thirdChild?.Emp_code === fourthChild?.Supervisor_Code)
                  .map((fourthChild) => {
                    const fourthLevel = {
                      ...fourthChild,
                      children: [],
                    };
                    fourthLevel.children = chartData
                      .filter((fifthChild) => fourthChild?.Emp_code === fifthChild?.Supervisor_Code)
                      .map((fifthChild) => {
                        const fifthLevel = {
                          ...fifthChild,
                          children: [],
                        };
                        fifthLevel.children = chartData
                          .filter((sixChild) => fifthChild?.Emp_code === sixChild?.Supervisor_Code)
                          .map((sixChild) => {
                            const sixLevel = {
                              ...sixChild,
                              children: [],
                            };
                            return sixLevel;
                          })
                        return fifthLevel;
                      });
                    return fourthLevel;
                  });
                return thirdLevel;
              });
            return secondLevel;
          });
        return firstLevel;
      });
    return [topLevelData];
  };

  const data = generateNestedData(ParentSupervisor, isChartData);

  const nodeTemplate = (node) => {
    return (
      <div id={node.Emp_code} className='childBox'>
          <img src={User} alt="" />
          <div>
            <span>{node.name ? `${node.name.slice(0, 10)}...` : "" || node.Label ? `${node.Label.slice(0, 10)}...` : ""}</span>
            <span>{node.designation ? `${node.designation.slice(0, 10)}...` : "" || node.Desig_name ? `${node.Desig_name.slice(0, 10)}...` : ""}</span>
          </div>
          <button onClick={(e) => { setuser(e.target.getAttribute("data-id")) }} data-id={node.Emp_code}>more</button>
      </div>
    );

  };


  return (
    <>
      <div>
        <Header />
      </div>
      <div className="mainBox">
        <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
      </div>
    </>
  )
}
