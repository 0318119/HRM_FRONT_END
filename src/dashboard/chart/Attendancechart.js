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

  const options = {
    responsive: true,
    // beginAtZero: true,
    // maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        intersect: true,
        callbacks: {
          label: (context) => ` Status : ${context?.dataset?.label} `,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        display: false,
      },
    }
  };

  const labels = getAttendData?.map((items) => items.Date + " " + items.Month);
  const data = {
    labels,
    datasets: [
      {
        id: 1,
        label: "Present",
        data: getAttendData?.map((items) => items?.Attendance_Status == 'Present' && items?.Remarks == "On Time" ? items.Progress : null),
        backgroundColor: "#1587E7",
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
      {
        id: 2,
        label: 'Absent',
        data: getAttendData?.map((items) => items?.Attendance_Status == 'Absent' && items?.Remarks == "Late" ? 5.10 : null),
        backgroundColor: "red",
        borderColor: '#bd1b1b',
        borderWidth: 2,
      },
      {
        id: 3,
        label: 'Late',
        data: getAttendData?.map((items) => items?.Attendance_Status == 'Present' && items?.Remarks == "Late" ? items?.Progress : null),
        backgroundColor: "#d7d730",
        borderColor: '#cfcf09',
        borderWidth: 2,
      },
      {
        id: 4,
        label: 'Off',
        data: getAttendData?.map((items) => items?.DayType == 'Holiday' && items?.DayName == "Saturday" || items?.DayName == "Sunday" ? 9.10 : null),
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
          {/* <div className="col-12 d-flex justify-content-end">
            <Link to="/Get_Attendance" className="text-dark mt-3 d-block" style={{ background: "#F7F5F5", padding: "10px", borderRadius: "10px" }}><b>Attendance Report</b></Link>
          </div> */}
          <div className="row">
            <div className="col-12 mt-5">
              <h5 className="mb-3 text-dark text-center"><b>Employee Attendance</b></h5>
            </div>
          </div>
        </div>
        <div className="row" style={{ border: "1px solid #8080804a", borderRadius: "10px" }}>
          <div className="col-12">
            <Bar options={options} data={data} />
          </div>
        </div>
      </div>
    </>

  );
}