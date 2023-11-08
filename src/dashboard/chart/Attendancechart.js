import React, { useState, useEffect } from "react";
import '../assets/css/chart.css'
import { Link, useNavigate } from "react-router-dom";
import 'chartjs-plugin-datalabels';
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
  getAttendData.forEach((element) => {
    if(element.Attendance_Status == "Present"){
        Status.push({
          Attendance_Status: element?.Attendance_Status,
          Month: element?.Month,
          Date : element?.Date,
          Time_in : element?.Emp_Time_IN,
          Time_out : element?.Emp_Time_out,
          Present: element?.Progress,
          Remarks: element?.Remarks,
          PresentBg:"green",
        });
    }
    else if(element.Attendance_Status == "Absent"){
        Status.push({
          Attendance_Status: element?.Attendance_Status,
          Month: element?.Month,
          Date : element?.Date,
          Time_in : element?.Emp_Time_IN,
          Time_out : element?.Emp_Time_out,
          Absent: element?.Progress,
          Remarks: element?.Remarks,
          AbsentBg:"red",
        });
    }
  });

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
          label: function (context,index) {
            let label = data.labels[context.datasetIndex];
            console.log("data",data?.datasets[0]?.id)
            return (
              console.log("Filter",Status.filter(items => items.Date == data?.datasets[0]?.id))
              // console.log("Status",Status)
              // Status.map((element) => {
              //   return(
              //     // `Status -${element?.Attendance_Status}`
              //   )
              // })
            );
          }
        },
        external: function(context) {
            var tooltipModel = context.tooltip;
            // console.log("tooltipModel",tooltipModel)
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip');
    
            // Create element on first render
            // if (!tooltipEl) {
            //     tooltipEl = document.createElement('div');
            //     tooltipEl.id = 'chartjs-tooltip';
            //     tooltipEl.innerHTML = '<table></table>';
            //     // tooltipEl.classList.add("scrollbar");
            //     document.body.appendChild(tooltipEl);
            // }
    
            // function getBody(bodyItem) {
            //     return bodyItem.lines;
            // }
    
            // Set Text
            // if (tooltipModel.body) {
            //     var titleLines = tooltipModel.title || [];
            //     var bodyLines = tooltipModel.body.map(getBody);
    
            //     var innerHtml = '<thead>';
    
            //     titleLines.forEach(function(title) {
            //         innerHtml += '<tr><th>' + title + '</th></tr>';
            //     });
            //     innerHtml += '</thead><tbody >';
    
            //     bodyLines.forEach(function(body, i) {
            //         var colors = tooltipModel.labelColors[i];
            //         var style = 'background:' + colors.backgroundColor;
            //         style += '; border-color:' + colors.borderColor;
            //         style += '; border-width: 2px !important';
            //         style += '; width: 10px !important';
            //         style += '; height: 10px !important';
            //         style += '; display: inline-block !important';
            //         style += '; margin-right: 3px !important';
            //         var box = `<span style="${style}"></span>`
            //         innerHtml += `<tr><td>${box}${body}</td></tr>`;
    
            //     });
            //     innerHtml += '</tbody>';
    
            //     var tableRoot = tooltipEl.querySelector('table');
            //     tableRoot.innerHTML = innerHtml;
            // }
    
            // `this` will be the overall tooltip
            // var position = this.chart.canvas.getBoundingClientRect();
    
            // Display, position, and set styles for font
            // tooltipEl.style.opacity = 1;
            // tooltipEl.style.position = 'absolute';
            // tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            // tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            // tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            // tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
            // tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            // tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
            // tooltipEl.style.pointerEvents = 'none'; // Use when need to stop mouse events such as Onhover and Scrolling
            // tooltipEl.style.borderColor = 'blue';
            // tooltipEl.style.borderRadius = '4px';
            // tooltipEl.style.backgroundColor = "white";
            // tooltipEl.style.maxHeight = "100px";
            // tooltipEl.style.overflowY = "auto";
            // tooltipEl.style.scrollBehavior = "smooth";   
       }
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    }
  };

  const data = {
    labels,
    datasets: [
      {
        id: getAttendData.map((items) =>  items.Date),
        label: 'Sample Data',
        data : Status?.map((element) =>  element?.Present || element?.Absent ),
        backgroundColor: Status?.map((element) => {
          return(element.PresentBg || element.AbsentBg)
        }),
      },
    ],
  };

  useEffect(() => {
    getAttendance();
  }, []);



  return (

    <div className="container">
      <Bar options={options} data={data}/>
    </div>

  );
}