import React, { useState, useEffect } from "react";
import '../assets/css/chart.css'
import { Link, useNavigate } from "react-router-dom";
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

  const labels = getAttendData.map((items) =>  items.Date + items.Month);
  let Status = [];
  getAttendData.forEach((element) => {
    if(element.Attendance_Status == "Present"){
        Status.push({
          Present: element?.Progress,
          PresentBg:"green",
          PresentStatus:"Present",
        });
    }
    else if(element.Attendance_Status == "Absent"){
        Status.push({
          Absent: element?.Progress,
          AbsentBg:"red",
          AbsentStatus:"Absent",
        });
    }
  });
  

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

  const data = {
    labels,
    datasets: [
      {
        // id: getAttendData.map((items) =>  items.Date),
        // label: 'Sample Data',
        data : Status?.map((element) => {
                return(element.Present || element.Absent)
              }),
        backgroundColor: Status?.map((element) => {
          return(element.PresentBg || element.AbsentBg)
        }),
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltips: {
        callbacks: {
          title: (tooltipItems) => 'Data Details',
          label: (context) => {
            const dataIndex = context.dataIndex;
            const datasetIndex = context.datasetIndex;
            const value = data.datasets[datasetIndex].data[dataIndex];
            return `Value: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  useEffect(() => {
    getAttendance();
  }, []);



  return (

    <>
      <Bar options={options} data={data}/>
    </>

  );
}