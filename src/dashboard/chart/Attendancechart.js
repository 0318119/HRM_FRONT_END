import React, { useState, useEffect } from "react";
import '../assets/css/chart.css'
import { Link, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Column } from '@ant-design/plots';

const config = require("../../config.json");

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );





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

 const Status = []

  getAttendData.forEach((element) => {
    if(element.Attendance_Status == "Present"){
        Status.push({
          Present:"9.5",
          PresentBg:"green",
          PresentStatus:"Present",
        });
    }
    else if(element.Attendance_Status == "Absent"){
        Status.push({
          Absent:"0",
          AbsentBg:"red",
          AbsentStatus:"Absent",
        });
    }
  });
  const data = [
    {
      type: 'hh',
      value: Status.map((items) => {return items.Present}),
      width: 50
    },
  ];
  const paletteSemanticRed = 'green';
  const brandColor = '#5B8FF9';
  const configs = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    color: ({ type }) => {
      if (type === 'hh') {
        return paletteSemanticRed;
      }
  
      return brandColor;
    },
    // label: {
    //   content: (originData) => {
    //     const val = parseFloat(originData.value);
  
    //     if (val < 0.05) {
    //       return (val * 100).toFixed(1) + '%';
    //     }
    //   },
    //   offset: 10,
    // },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  

  useEffect(() => {
    getAttendance();
  }, []);



  return (

    <>
        <Column {...configs} />
        {/* <BarChart width={600} height={300} data={getAttendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip cursor={{ fill: 'transparent' }}  />
          content={<CustomTooltip />}
          <Legend />
          <Bar dataKey="present" fill="#8884d8" />
          <Bar dataKey="absent" fill="#82ca9d" />
        </BarChart> */}

      {/* <Bar options={options} data={data}/> */}
    </>

  );
}

