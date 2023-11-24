// import React, { useEffect, useState } from 'react';
// import { Tree, TreeNode } from 'react-organizational-chart';



// function ChartFlow() {
// const [isChartData,setChartData] = useState([])
// const testData = async () => {
//     fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeeTree_Organizational_Chart`, {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json',
//             'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
//         },
//     }).then((response) => {return response.json()})
//     .then((response) => {
//         console.log("response :",response)
//     })
//     .catch((error) => {
//         console.log("Error :",error)
//     })
// }
// useEffect(() =>{
//     testData()
// },[])
//     return (
//         <div>
//             <Tree label={<div>Root</div>}>
//                 <TreeNode label={<div>Child 1</div>}>
//                     <TreeNode label={<div>Grand Child</div>} />
//                 </TreeNode>
//             </Tree>
//         </div>
//     )
// }

// export default ChartFlow

// import React, { useEffect, useState } from 'react';
// import Tree from 'react-d3-tree';


// export default function ChartFlow() {
//   const [isChartData,setChartData] = useState([])
//   const testData = async () => {
//       fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeeTree_Organizational_Chart`, {
//           method: "GET",
//           headers: {
//               'Content-Type': 'application/json',
//               'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
//           },
//       }).then((response) => {return response.json()})
//       .then((response) => {
//           console.log("response :",response)
//       })
//       .catch((error) => {
//           console.log("Error :",error)
//       })
//   }
//   useEffect(() =>{
//       testData()
//   },[])

//   // This is a simplified example of an org chart with a depth of 2.
// // Note how deeper levels are defined recursively via the `children` property.
// const squareNode = {
//   shape: 'rect',
//   shapeProps: {
//     width: "50", // Customize the width of the square
//     height: "50", // Customize the height of the square
//     fill: 'lightblue', // Customize the fill color of the square
//     stroke: 'blue', // Customize the stroke color of the square
//     strokeWidth: 2, // Customize the stroke width
//   },
// };
// const customLineShape = (linkData, orientation) => {
//   // Customize the line shape here
//   // Example: Return a custom path for the link
//   // console.log("linkData",linkData)
//   return `M${linkData.source.x},${linkData.source.y}L${linkData.target.x},${linkData.target.y}`;
// };
// const orgChart = {
//   name: 'CEO',
//   children: [
//     {
//       name: 'Manager',
//       attributes: {
//         department: 'Production',
//       },
//       children: [
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Fabrication',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Assembly',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
//   return (
//     // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
//     <div id="treeWrapper" style={{ width: '100%', height: '100vh' }}>
//       <Tree data={orgChart} orientation="vertical" translate={{ x: 300, y: 200 }} zoom={0.7} nodeSvgShape={squareNode}  pathFunc={customLineShape} />
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { Tree, TreeNode } from 'react-organizational-chart';



// function ChartFlow() {
// const [isChartData,setChartData] = useState([])
// const testData = async () => {
//     fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeeTree_Organizational_Chart`, {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json',
//             'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
//         },
//     }).then((response) => {return response.json()})
//     .then((response) => {
//         console.log("response :",response)
//     })
//     .catch((error) => {
//         console.log("Error :",error)
//     })
// }
// useEffect(() =>{
//     testData()
// },[])
//     return (
//         <div>
//             <Tree label={<div>Root</div>}>
//                 <TreeNode label={<div>Child 1</div>}>
//                     <TreeNode label={<div>Grand Child</div>} />
//                 </TreeNode>
//             </Tree>
//         </div>
//     )
// }

// export default ChartFlow


// 
// import Tree from 'react-d3-tree';
// // import * as d3 from 'd3';
// import 'd3-org-chart';
// import 'd3-flextree';



// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
// const orgChart = {
//   name: 'CEO',
//   children: [
//     {
//       name: 'Manager',
//       attributes: {
//         department: 'Production',
//       },
//       children: [
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Fabrication',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Assembly',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

import React, { useEffect, useState } from 'react';
import baseUrl from '../config.json'
import { OrgChart } from 'd3-org-chart';
import { OrganizationChart } from 'primereact/organizationchart';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './flags.css'
import Header from '../components/Includes/Header';
import './flow.css'


export default function ChartFlow() {
  const [isChartData, setChartData] = useState([])
  // const testData = async () => {
  //   fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeeTree_Organizational_Chart`, {
  //     method: "GET",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
  //     },
  //   }).then((response) => { return response.json() })
  //     .then((response) => {
  //       console.log("response :", response)
  //     })
  //     .catch((error) => {
  //       console.log("Error :", error)
  //     })
  // }
  // useEffect(() => {
  //   testData()
  // }, [])
  const [selection, setSelection] = useState([]);
  const [data] = useState([
    {
      expanded: true,
      type: 'person',
      data: {
        image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
        name: 'Amy Elsner',
        title: 'CEO'
      },
      children: [
        {
          expanded: true,
          type: 'person',
          data: {
            image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
            name: 'Anna Fali',
            title: 'CMO'
          },
          children: [
            {
              label: 'Sales'
            },
            {
              label: 'Marketing'
            }
          ]
        },
        {
          expanded: true,
          type: 'person',
          data: {
            image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
            name: 'Stephen Shaw',
            title: 'CTO'
          },
          children: [
            {
              label: 'Development'
            },
            {
              label: 'UI/UX Design'
            }
          ]
        }
      ]
    }
  ]);

  const nodeTemplate = (node) => {
    console.log("node",node)
    if (node.type === 'person') {
      return (
        <div className="flex flex-column align-items-center">
          <div className="flex flex-column align-items-center">
            <img alt={node.data.name} src={node.data.image} className="mb-3 w-3rem h-3rem" />
            <span className="font-bold mb-2">{node.data.name}</span>
            <span>{node.data.title}</span>
          </div>
        </div>
      );
    }

    // return node.label;
  };


  const fetchData = async () => {
    await fetch(`${baseUrl.baseUrl}/allemployees/GetEmployeeTree_Organizational_Chart`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'accessToken': 'Bareer ' + localStorage.getItem('access_token'),
      },
    }).then((response) => { return response.json() })
      .then((response) => {
        const dataFlattened = response;
        console.log("dataFlattened", dataFlattened)
        // new OrgChart()
        // .container('.chart-container')
        // .data(dataFlattened)
        // // .nodeWidth((d) => 250)
        // // .childrenMargin((d) => 40)
        // .render();
        new OrgChart()
          .container('chart-container')
          .data(dataFlattened)
          .nodeWidth((d) => 250)
          .initialZoom(0.7)
          .nodeHeight((d) => 175)
          .childrenMargin((d) => 40)
          .compactMarginBetween((d) => 15)
          .compactMarginPair((d) => 80)
          .nodeContent(function (d, state) {
            // console.log("d",state)
            return `
          <h4>${state}</h4>`;
          })
          .render();
      }).catch((error) => {
        // setChartData(error)
        console.log("error", error)
      })

    // new OrgChart()
    // .container('.chart-container')
    // .data(dataFlattened)
    // .nodeWidth((d) => 250)
    // .childrenMargin((d) => 40)response
    // .render();
    // .nodeContent(function (d) {
    //   console.log("d",d)
    // }).render();


    // console.log("response",dataFlattened)

  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {/* <div className="chart-container" style={{ height: '100vh', backgroundColor: 'red' }} />; */}
      {/* <div className="card overflow-x-auto">
            <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
        </div> */}
      <div>
        <Header />
      </div>
      <div className='container'>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className='chatMargin flowchartBg'>
              <h5><b>Designations Flow</b></h5>
              <OrganizationChart value={data} selectionMode="multiple" selection={selection} onSelectionChange={(e) => setSelection(e.data)} nodeTemplate={nodeTemplate} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

