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
  const [user,setuser] = useState(localStorage.getItem('Emp_code'))
  const [isChartData, setChartData] = useState([])
  const [selection, setSelection] = useState([]);
  const [isTest,setTest] = useState([])

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
        // setChartData(response?.data);
        const combineArrays = (currentArray, prevArrays) => {
          return [...prevArrays, ...currentArray];
        };
        setChartData(combineArrays(response.data, isChartData));
      })
      .catch((error) => {
        console.log("Error :", error)
      })  
    }
    
    useEffect(() => {
      testData()
    }, [user])
    
    console.log("isChartData",isChartData)
  

  // var temp = []
  const temp = isChartData?.reduce((acc, items) => {
    if (items?.Supervisor_Code !== null) {
      // Find the parent node in the accumulator based on Supervisor_Code
      const parentNode = acc.find(node => node.data.code === items.Supervisor_Code);
  
      if (parentNode) {
        parentNode.children = parentNode.children || [];
        parentNode.children.push({
          expanded: true,
          type: 'person',
          data: {
            image: User,
            name: items.Emp_name,
            title: items.Desig_name,
            code: items.Emp_code
          },
          children: [] // Add children array if needed for this node
        });
      }
    } else {
      acc.push({
        expanded: true,
        type: 'person',
        data: {
          image: User,
          name: items.Emp_name,
          title: items.Desig_name,
          code: items.Emp_code
        },
        children: [] // Add children array if needed for this node
      });
    }
  
    return acc;
  }, []);
  // isChartData?.map((items) => {
  //   if (items?.Supervisor_Code !== null) {
  //     return temp.push({
  //       expanded: true,
  //       type: 'person',
  //       data: {
  //         image: User,
  //         name: items?.Emp_name,
  //         title: items?.Desig_name,
  //         code : items?.Emp_code
  //       },
  //     })
  //   }else{
  //     temp.push({
  //       expanded: true,
  //       type: 'person',
  //       data: {
  //         image: User,
  //         name: items?.Emp_name,
  //         title: items?.Desig_name,
  //         code : items?.Emp_code
  //       },
  //     })
  //   }
  // })
  // const temp = isChartData?.map((item) => {
  //   if(item?.Supervisor_Code !== null){
  //     let person = {
  //       expanded: true,
  //       type: 'person',
  //       data: {
  //         image: User,
  //         name: item?.Emp_name,
  //         title: item?.Desig_name,
  //         code: item?.Emp_code,
  //       },
  //     };
  //     return person
  //   }

  
    // Check if the person has subordinates
    // if (item?.Subordinates && item.Subordinates.length > 0) {
    //   // Recursively create children for subordinates
    //   person.children = item.Subordinates.map((subordinate) => ({
    //     expanded: true,
    //     type: 'person',
    //     data: {
    //       image: User,
    //       name: subordinate?.Emp_name,
    //       title: subordinate?.Desig_name,
    //       code: subordinate?.Emp_code,
    //     },
    //   }));
    // }
  
    // return person;
  // });

  const data = [
    {
      expanded: true,
      type: 'person',
      data: {
        image: User,
        name: isChartData?.filter((item) => item?.Supervisor_Code == null)?.[0]?.Emp_name,
        title: isChartData?.filter((item) => item?.Supervisor_Code == null)?.[0]?.Desig_name,
        code : isChartData?.filter((item) => item?.Supervisor_Code == null)?.[0]?.Emp_code
      },
      children: temp
    }
  ]






  // console.log('value :', user);
  const nodeTemplate = (node) => {
    if (node.type === 'person') {
      return (
        <>
          <div className="orgNodeBox" id={node?.data?.code} onClick={(e) => {setuser(e.target.getAttribute('id'))}}>
              <img alt={node.data.name} src={node.data.image} className="w-3rem h-3rem" />
              <div className="orgNodeInnerBox">
                <h5>{node.data.name}</h5>
                <span>{node.data.title}</span>
              </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className='container-fluid'>
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className='chatMargin flowchartBg'>
              <h5><b>Designations Flow</b></h5>
              <div className='orgChartLoader'>
                {isChartData?.length > 0 ?
                  <OrganizationChart
                    value={data}
                    selectionMode="multiple" selection={selection}
                    onSelectionChange={(e) => setSelection(e.data)}
                    nodeTemplate={nodeTemplate}
                  /> : <Spin size="large" className='m-auto' />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

