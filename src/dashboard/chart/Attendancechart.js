// import React, { useState, useEffect } from "react";
// import '../assets/css/chart.css'
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// // } from "recharts";
// import { Link, useNavigate } from "react-router-dom";
// import secureLocalStorage from "react-secure-storage";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// const config = require("../../config.json");

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );



// export default function Attendan1022hart() {

//   var get_refresh_token = secureLocalStorage.getItem("refresh");
//   var get_access_token = secureLocalStorage.getItem("access_token");
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [dataLoader, setDataLoader] = useState(false);
//   const [DataErr, setDataErr] = useState('')
//   const [getAttendData, setGetAttendData] = useState([])


//   async function getAttendance() {
//     await fetch(
//       `${config["baseUrl"]}/dashboard/GetUserAttendanceSummaryDashboard`,
//       {
//         method: "GET",
//         headers: {
//           "content-type": "application/json",
//           accessToken: `Bareer ${get_access_token}`,
//         },
//       }
//     )
//       .then((response) => {
//         return response.json();
//       })
//       .then(async (response) => {
//         if (response.messsage == "unauthorized") {
//           await fetch(
//             `${config["baseUrl"]}/dashboard/GetUserAttendanceSummaryDashboard`,
//             {
//               method: "GET",
//               headers: {
//                 "content-type": "application/json",
//                 refereshToken: `Bareer ${get_refresh_token}`,
//               },
//             }
//           )
//             .then((response) => {
//               return response.json();
//             })
//             .then((response) => {
//               if (response.messsage == "timeout error") {
//                 navigate("/");
//               } else {
//                 localStorage.setItem("refresh", response.referesh_token);
//                 localStorage.setItem("access_token", response.access_token);
//                 setGetAttendData(response.data[0]);
//                 console.log("response.data[0]", response.data[0])
//                 setDataLoader(true);
//               }
//             })
//             .catch((error) => {
//               setDataErr(error.message);
//             })
//             .finally(() => {
//               setLoading(false);
//             });
//         } else {
//           setGetAttendData(response.data[0]);
//           setDataLoader(true);
//         }
//       })
//       .catch((error) => {
//         setDataErr(error.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }

//   const options = {
//     responsive: true,
//     beginAtZero: true,
//     // maintainAspectRatio: false
//     scales: {
//       // y: {
//       //   display: false,        // show/ hide x-axis
//       //   grid: {
//       //     display: false      // show/hide grid line in x-axis
//       //   },
//       // },
//     },
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: '',
//       },
//     },
//   };

//   const labels = getAttendData.map((items) =>  items.Date + " " + items.Month);
//     let Present_Status = [];
//     let Present_Status1 = [];

//     let PresentColor = ''
//     let AbsentColor = ''

//     getAttendData.forEach((element) => {
//       if(element.Attendance_Status == "Present"){
//           PresentColor= "hsl(203, 82%, 47%)"
//           Present_Status.push("500");
//       }else if(element.Attendance_Status == "Absent")
//           Present_Status.push(element.Date);
//           AbsentColor = 'red'
//       });

//   const data = {
//     labels,
//     datasets: [
//       {
//         id: 1,
//         label: '',
//         data: Present_Status,
//         backgroundColor: [PresentColor,AbsentColor],
//         // borderColor: "black",
//         // borderWidth: 2,
//         // barThickness: 30, 
//       },
//       // {  
//       //   label: 'Absent',
//       //   data: Absent_Status,
//       //   backgroundColor: '#B24749',
//       //   // barThickness: 40,
//       // },
      
//       // {
//       //   id: 2,
//       //   label: 'Late',
//       //   data: Absent_Status,
//       //   backgroundColor: 'rgb(213, 185, 107)',
//       //   // barThickness: 30,
//       // },
//       // {
//       //   label: 'Early',
//       //   data: getAttendData.map((items) => items[0]?.Remarks),
//       //   backgroundColor: '#3A8C89',
//       //   barThickness: 30,
//       // },
//       // {
//       //   label: 'Half Day',
//       //   data: getAttendData.map((items) => items[0]?.Remarks),
//       //   backgroundColor: '#489FBB',
//       //   barThickness: 30,
//       // },
//       // {
//       //   label: 'Absent',
//       //   data: getAttendData.map((items) => items[0]?.Remarks),
//       //   backgroundColor: '#B24749',
//       //   barThickness: 30,
//       // },
//       // {
//       //   label: 'Short Day',
//       //   data: getAttendData.map((items) => items[0]?.Remarks),
//       //   backgroundColor: '#C08A4F',
//       //   barThickness: 30,
//       // },
//       // {
//       //   label: 'Absent for short time',
//       //   data: getAttendData.map((items) => items[0]?.Remarks),
//       //   backgroundColor: '#565072',
//       //   barThickness: 30,
//       // },
//       // {
//       //   label: 'Leave',
//       //   data: getAttendData.map((items) => items[0]?.Remarks),
//       //   backgroundColor: '#ffc10770',
//       //   barThickness: 30,
//       // },
//       // {
//       //   label: 'Missing',
//       //   data: getAttendData.map((items) => items[0]?.Remarks),
//       //   backgroundColor: '#ffc10770',
//       //   barThickness: 30,
//       // },
//       // {
//       //   label: 'OFF',
//       //   data: getAttendData.map((items) => items[0]?.Remarks),
//       //   backgroundColor: '#000',
//       //   barThickness: 30,
//       // }
//     ],
//   };

//   useEffect(() => {
//     getAttendance();
//   }, []);



//   return (

//     <>
//       <Bar options={options} data={data}/>
//     </>

//   );
// }

import React, { useState, useEffect } from "react";
import '../assets/css/chart.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Link, useNavigate } from "react-router-dom";
const config = require("../../config.json");

export default function Attendan1022hart() {

  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [dataLoader, setDataLoader] = useState(false);
  const [DataErr, setDataErr] = useState('')
  const [getAttendData, setGetAttendData] = useState([])


  async function getAttendance() {
    await fetch(
      `${config["baseUrl"]}/dashboard/GetUserAttendanceSummaryDashboard`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accessToken: `Bareer ${get_access_token}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        if (response.messsage == "unauthorized") {
          await fetch(
            `${config["baseUrl"]}/dashboard/GetUserAttendanceSummaryDashboard`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              refereshToken: `Bareer ${get_refresh_token}`,
            },
          }
    )
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.messsage == "timeout error") {
                navigate("/");
              } else {
                localStorage.setItem("refresh", response.referesh_token);
                localStorage.setItem(
                  "access_token",
                  response.access_token
                );
                setGetAttendData(response.data[0]);
                setDataLoader(true);
              }
            })
            .catch((error) => {
              setDataErr(error.message);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setGetAttendData(response.data[0]);
          console.log("response.data[0]", response.data[0])
          setDataLoader(true);
        }
      })
      .catch((error) => {
        setDataErr(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const data = [
    {
      Month: "june",
      Date: 1,
      Time_In: "1000",
      Time_Out: "11",
      Late: "1",
    },
  ];

  useEffect(() => {
    getAttendance();
  }, []);



  return (

    <BarChart
      width={1200}
      height={300}
      data={getAttendData}
      margin={{
        top: 15,
      }}
    >
      <CartesianGrid strokeDasharray="0.1" className="BarChart" />
      <XAxis dataKey="Date" fill="white" />
      <YAxis dataKey="Date" />
      <Tooltip className="toollip" />
      <Legend className="BarChart"/>

      {/* <Bar dataKey="Month" fill="#55c061" /> */}
      <Bar dataKey="Date" fill="#F4EA56" barSize={200} />
      <Bar dataKey="Emp_Time_IN" fill="#D22730" barSize={200} />
      <Bar dataKey="Emp_Time_out" fill="black" barSize={200} /> 
      <Bar dataKey="Remarks" fill="red" barSize={200} /> 
      {/* <Bar dataKey="Time_In" fill="#F4EA56" /> */}
      {/* <Bar dataKey="Time_Out" fill="#D22730" /> */}
      {/* <Bar dataKey="Time_In" fill="#F4EA56" />
      <Bar dataKey="Time_Out" fill="#D22730" />
      <Bar dataKey="Late" fill="black" /> */}
    </BarChart>

  );
}
