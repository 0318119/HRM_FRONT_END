import React, { useEffect, useState } from 'react';
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
  const [isChartData, setChartData] = useState([])
  const [selection, setSelection] = useState([]);
  const testData = async () => {
    fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeeTree_Organizational_Chart`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
      },
    }).then((response) => { return response.json() })
      .then((response) => {
        setChartData(response?.data)
      })
      .catch((error) => {
        console.log("Error :", error)
      })
  }
  useEffect(() => {
    testData()
  }, [])



  var temp = []
  isChartData.map((items) => {
    if (items?.Supervisor_Code !== null) {
      return temp.push({
        expanded: true,
        type: 'person',
        data: {
          image: User,
          name: items?.Emp_name,
          title: items?.Desig_name
        },
      })
    }
  }

  )
  const data = [
    {
      expanded: true,
      type: 'person',
      data: {
        image: User,
        name: isChartData?.filter((item) => item?.Supervisor_Code == null)?.[0]?.Emp_name,
        title: isChartData?.filter((item) => item?.Supervisor_Code == null)?.[0]?.Desig_name
      },
      children: temp
    }
  ]






  const nodeTemplate = (node) => {
    if (node.type === 'person') {
      return (
        <>
          <div className="orgNodeBox">
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

