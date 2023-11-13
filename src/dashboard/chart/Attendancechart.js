import React, { useState, useEffect } from "react";
import '../assets/css/chart.css'
import { Link, useNavigate } from "react-router-dom";
// import 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
const config = require("../../config.json");

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export default function Attendancechart() {
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
                localStorage.setItem("access_token", response.access_token);
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
          console.log("test data",response.data[0])
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

  // const options = {
  //   responsive: true,
  //   beginAtZero: true,
  //   // maintainAspectRatio: false
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'jhhhh',
  //     },
  //   },
  // };

  const labels = getAttendData.map((items) =>  items.Date + " " + items.Month);
  let Status = [];
  // getAttendData.forEach((element,index) => {
  //   if(element.Attendance_Status == "Present" && element.Remarks == "On Time" ){
  //       Status.push({
  //         Attendance_Status: element?.Attendance_Status,
  //         Month: element?.Month,
  //         Date : element?.Date,
  //         Time_in : element?.Emp_Time_IN,
  //         Time_out : element?.Emp_Time_out,
  //         Progress: element?.Progress,
  //         Remarks: element?.Remarks,
  //         PresentBg:"green",
  //       });
  //       console.log("On Time",Status)
  //   }
  //   else if(element.Attendance_Status == "Absent" && element.Remarks == "Late"){
  //       Status.push({
  //         Attendance_Status: element?.Attendance_Status,
  //         Month: element?.Month,
  //         Date : element?.Date,
  //         Time_in : element?.Emp_Time_IN,
  //         Time_out : element?.Emp_Time_out,
  //         Progress: element?.Progress,
  //         Remarks: element?.Remarks,
  //         AbsentBg:"red",
  //       });
  //       console.log("Absent",Status)
  //   }
  // //   else if(element.Attendance_Status == "Present" && element.Remarks == "Late"){
  // //     Status.push({
  // //       Attendance_Status: element?.Attendance_Status,
  // //       Month: element?.Month,
  // //       Date : element?.Date,
  // //       Time_in : element?.Emp_Time_IN,
  // //       Time_out : element?.Emp_Time_out,
  // //       Progress: element?.Progress,
  // //       Remarks: element?.Remarks,
  // //       AbsentBg:"red",
  // //     });
  // // }
  // });

  // console.log("Status",Status)
  

  // const options = {
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     tooltips: {
  //       enabled: true,
  //       callbacks: {
  //         title: () => 'Bar Value',
  //         label: (context) => `Value: ${context.parsed.y}`,
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       beginAtZero: true,
  //     },
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  // const options = {
  //   plugins: {
  //     datalabels: {
  //       display: true,
  //     },
  //     legend: {
  //       display: true,
  //     },
  //     tooltips: {
  //       callbacks: {
  //         title: (tooltipItems) => 'Data Details',
  //         label: (context) => {
  //           const dataIndex = context.dataIndex;
  //           const datasetIndex = context.datasetIndex;
  //           const value = data.datasets[datasetIndex].data[dataIndex];
  //           return `Value: ${value}`;
  //         },
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       beginAtZero: true,
  //     },
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };
  

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        intersect: true,
        callbacks: {
          label: function (context) {
            // let label = data.labels[context.datasetIndex];
            // let hello = data?.datasets[0]?.id;
            // let testingData = [];
            // for (let i = 1; i <= 31; i++) {
            //   testingData.push({ id: i });
            // }
            // return (
            //   // data?.datasets[0].label == "Present" ?  ` Status - ${data?.datasets[0].label}` : null +
            //   // data?.datasets[1].label == "Absent" ?  `Status - ${data?.datasets[1].label}` : null
            //   // data?.datasets[2].label == "Late" ?  `Status - ${data?.datasets[2].label}` : null
            //   // `Status :: ${Status.filter((items) => items.Date == 21)?.[0]?.Attendance_Status}` + " " +
            //   // `Time in :: ${Status.filter((items) => items.Date == 21)?.[0]?.Time_in}`  + " " +
            //   // console.log("hello",hello.filter((id) => id == 21)) + 
            //   // console.log("hello",context.parsed)
            //   // "Emp_Time_IN" + data?.datasets[0]?.Emp_Time_IN + " " +
            //   // "Date" + " " + context.parsed.x + " " + 
            //   // context.parsed.y 
            //   // console.log("Filter data",Status.filter((data) => data?.Date === 21)[0]) +
            //   // console.log("Filter data",Status.filter((data) => data?.Date === 22)[0])



            //   // `Status :: ${Status.filter((items) => items.Date == 22)?.[0]?.Attendance_Status}` + " " +
            //   // `Time in :: ${Status.filter((items) => items.Date == 22)?.[0]?.Time_in}`
            //   // `Status :: ${Status.filter((items) => items.Date == 22)?.[0]?.Time_in}`
            //   // console.log("Filter",Status.filter((items) => items.Date == data?.datasets[0]?.id))
            //   // console.log("object",Status)
            //   // console.log("StatusNew",Status.filter((items) => data?.datasets[0]?.id[items.Date]))
            //   // Status.map((element) => {
            //   //   // console.log("element",element?.Attendance_Status)
            //   // // console.log("Filter",Status.filter(test => test.Date == data?.datasets?.[0]?.id))
            //   //   // console.log("id",element.Date)
            //   //   // return(
            //   //   //   data?.datasets[0]?.id.map((test) => {
            //   //   //     return(
            //   //   //       // element.Date == test ? `Status : ${element?.Attendance_Status}` : ""
            //   //   //       console.log("object", element.Date == test ? element.filter((chk) => chk.Date == test) : "")
            //   //   //       // console.log("element.Date",element.Date)
            //   //   //     )
            //   //   //   })
            //   //   // )
            //   // })
            // );
          }
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        // display: false,
      },
    }
  };

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       id: getAttendData.map((items) =>  items.Date),
  //       // label: [[Status?.map((element) =>  {
  //       //   return(
  //       //     element.Attendance_Status == "Present" ? "Present" : 
  //       //     element.Attendance_Status == "Absent" ?  "Absent" : ""
  //       //   )
  //       // } ),]],
  //       data : Status?.map((element) =>  {
  //         return(
  //           element.Attendance_Status == "Present" ? element?.Progress : 
  //           element.Attendance_Status == "Absent" ?  0.5 : ""
  //         )
  //       }),
  //       // Remarks: Status?.map((element) =>  {
  //       //   return(
  //       //     element.Attendance_Status == "Present" ? element.Remarks : 
  //       //     element.Attendance_Status == "Absent" ? element.Remarks : null
  //       //   )
  //       // }),
  //       // Emp_Time_IN: Status?.map((element) =>  {
  //       //   return(
  //       //     element.Attendance_Status == "Present" ? element.Time_in : 
  //       //     element.Attendance_Status == "Absent" ? element.Time_in : null
  //       //   )
  //       // }),
  //       // Emp_Time_out: Status?.map((element) =>  {
  //       //   return(
  //       //     element.Attendance_Status == "Present" ? element.Time_out : 
  //       //     element.Attendance_Status == "Absent" ? element.Time_out : null
  //       //   )
  //       // }),
  //       backgroundColor: Status?.map((element) => {
  //         return(
  //           element?.Attendance_Status == "Present" ? "#1587E7"  : 
  //           element?.Attendance_Status == "Absent" ? "red" : ""
  //         )
  //       }),
  //       borderColor: Status?.map((element) => {
  //         return(
  //           element?.Attendance_Status == "Present" ? "#0c67b3"  : 
  //           element?.Attendance_Status == "Absent" ? "#db0808" : ""
  //         )
  //       }),
  //       borderWidth: 2,
  //     },
  //   ],
  // };


  const data = {
    labels,
    datasets: [
      {
        id: 1,
        label: "Present",
        data : getAttendData.map((items) => items?.Attendance_Status == 'Present' && items?.Remarks == "On Time"? items.Progress : null),
        backgroundColor: "#1587E7",
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        // barThickness: 15
      },
      {
        id: 2,
        label: 'Absent',
        data :  getAttendData.map((items) => items?.Attendance_Status == 'Absent' && items?.Remarks == "Late"? 0.5 : null),
        backgroundColor: "red",
        borderColor: '#bd1b1b',
        borderWidth: 2,
      },
      {
        id: 3,
        label: 'Late',
        data :  getAttendData.map((items) => items?.Attendance_Status == 'Present' && items?.Remarks == "Late"? items?.Progress : null),
        backgroundColor: "#d7d730",
        borderColor: '#cfcf09',
        borderWidth: 2,
      },
      {
        id: 4,
        label: 'Holidays',
        data :  getAttendData.map((items) => items?.DayType == 'Holiday' && items?.DayName == "Saturday" || items?.DayName == "Sunday"? 20 : null),
        backgroundColor: "black",
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    getAttendance();
  }, []);



  return (

    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <h5 className="mb-3 text-dark text-center"><b>Employee Attendance</b></h5>
            <Bar options={options} data={data}/>
          </div>
        </div>
      </div>
    </>

  );
}