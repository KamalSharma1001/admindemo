import React, { useEffect, useRef, useState } from 'react'
import Dashboard from './Dashboard'
import { writeFileSync } from "xlsx";
import * as XLSX from "xlsx";
import '../App.css';
import $ from "jquery"; // Import jQuery (required for DataTables)
import "datatables.net"; // Import DataTables CSS and JS
import "datatables.net-dt";

import swal from "sweetalert";
import SessionTableData from './SessionTableData';


const SessionManagement = () => {

  const handleExport = () => {
    const table = document.getElementById("ExportData"); // Replace with your table ID
    const tableData = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, tableData, "Sheet1");

    // Convert workbook to array buffer
    const wbArrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Create a Blob from the array buffer
    const blob = new Blob([wbArrayBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Create a download link and trigger the click event
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "table-data.xlsx";
    link.click();
  };

  const handleEndSession = (id) => {
    swal({
      title: "Are you sure?",
      text: "This will end the session.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willEnd) => {
      if (willEnd) {
        setData(prevData => prevData.map(item => {
          if (item.id === id) {
            return { ...item, isSessionEnded: true };
          }
          return item;
        }));
        swal("Session ended.", {
          icon: "success",
        });
      } else {
        swal("Session not ended.");
      }
    });
  };

  const [data, setData] = useState([
    {
      "id": 1,
      "login": "JohnDoe",
      "loginTime": "2023-02-24 20:53:38",
      "clientIP": "117.211.245.98",
      "lastActivity": "0 minutes",
      "isSessionEnded": true
    },
    {
      "id": 2,
      "login": "JaneSmith",
      "loginTime": "2023-02-24 21:15:21",
      "clientIP": "192.168.1.10",
      "lastActivity": "5 minutes",
      "isSessionEnded": false
    },
    {
      "id": 3,
      "login": "MichaelJohnson",
      "loginTime": "2023-02-24 21:45:10",
      "clientIP": "203.45.67.89",
      "lastActivity": "15 minutes",
      "isSessionEnded": false
    },
    {
      "id": 4,
      "login": "EmilyBrown",
      "loginTime": "2023-02-24 22:10:02",
      "clientIP": "120.10.20.30",
      "lastActivity": "30 minutes",
      "isSessionEnded": false
    },
    {
      "id": 5,
      "login": "WilliamJones",
      "loginTime": "2023-02-24 22:30:55",
      "clientIP": "87.65.43.21",
      "lastActivity": "45 minutes",
      "isSessionEnded": false
    },
    {
      "id": 6,
      "login": "OliviaWilliams",
      "loginTime": "2023-02-24 22:45:12",
      "clientIP": "10.20.30.40",
      "lastActivity": "1 hour",
      "isSessionEnded": false
    },
    {
      "id": 7,
      "login": "EthanDavis",
      "loginTime": "2023-02-24 23:10:30",
      "clientIP": "45.67.89.10",
      "lastActivity": "2 hours",
      "isSessionEnded": false
    },
    {
      "id": 8,
      "login": "SophiaMiller",
      "loginTime": "2023-02-24 23:45:05",
      "clientIP": "98.76.54.32",
      "lastActivity": "3 hours",
      "isSessionEnded": false
    },
    {
      "id": 9,
      "login": "LiamWilson",
      "loginTime": "2023-02-25 00:30:20",
      "clientIP": "123.45.67.89",
      "lastActivity": "4 hours",
      "isSessionEnded": false
    },
    {
      "id": 10,
      "login": "AvaMartinez",
      "loginTime": "2023-02-25 01:15:45",
      "clientIP": "67.89.10.12",
      "lastActivity": "5 hours",
      "isSessionEnded": false
    },
    {
      "id": 11,
      "login": "MatthewTaylor",
      "loginTime": "2023-02-25 02:30:10",
      "clientIP": "143.67.89.10",
      "lastActivity": "1 hour",
      "isSessionEnded": false
    },
    {
      "id": 12,
      "login": "IsabellaClark",
      "loginTime": "2023-02-25 03:45:25",
      "clientIP": "65.43.21.12",
      "lastActivity": "2 hours",
      "isSessionEnded": false
    },
    {
      "id": 13,
      "login": "DanielWhite",
      "loginTime": "2023-02-25 04:20:50",
      "clientIP": "87.23.45.67",
      "lastActivity": "3 hours",
      "isSessionEnded": false
    },
    {
      "id": 14,
      "login": "MiaLee",
      "loginTime": "2023-02-25 05:15:15",
      "clientIP": "98.76.54.32",
      "lastActivity": "4 hours",
      "isSessionEnded": false
    },
    {
      "id": 15,
      "login": "JamesSmith",
      "loginTime": "2023-02-25 06:30:30",
      "clientIP": "10.20.30.40",
      "lastActivity": "5 hours",
      "isSessionEnded": false
    },
    {
      "id": 16,
      "login": "OliviaJohnson",
      "loginTime": "2023-02-25 07:45:45",
      "clientIP": "203.45.67.89",
      "lastActivity": "1 hour",
      "isSessionEnded": false
    },
    {
      "id": 17,
      "login": "BenjaminDavis",
      "loginTime": "2023-02-25 08:00:00",
      "clientIP": "120.10.20.30",
      "lastActivity": "2 hours",
      "isSessionEnded": false
    },
    {
      "id": 18,
      "login": "EmmaMiller",
      "loginTime": "2023-02-25 09:30:15",
      "clientIP": "45.67.89.10",
      "lastActivity": "3 hours",
      "isSessionEnded": false
    },
    {
      "id": 19,
      "login": "WilliamBrown",
      "loginTime": "2023-02-25 10:15:30",
      "clientIP": "123.45.67.89",
      "lastActivity": "4 hours",
      "isSessionEnded": false
    },
    {
      "id": 20,
      "login": "SophiaJones",
      "loginTime": "2023-02-25 11:30:45",
      "clientIP": "87.89.10.12",
      "lastActivity": "5 hours",
      "isSessionEnded": false
    }
  ]
  )

  const tableRef = useRef(null);

  useEffect(() => {
    const dataTable = $(tableRef.current).DataTable({
      paging: true,
      pageLength: 5,
      searching: true,
      responsive: true,
      lengthMenu: [5, 10, 25, 50, 100],
      dom: '<"top"lf>rt<"bottom"ip><"clear">',
      language: {
        paginate: {
          previous: 'Previous',
          next: 'Next',
        },
      },
    });

    return () => {
      // Destroy the DataTable when the component unmounts
      dataTable.destroy();
    };
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="page-header">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="title">
                  <h4>Session Management</h4>
                </div>
                <nav aria-label="breadcrumb" role="navigation">
                  <ol className="breadcrumb">
                    {/* <li className="breadcrumb-item">
                      <a href="">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                    
                    </li> */}
                  </ol>
                </nav>
              </div>
              <div className="col-md-6 col-sm-12 text-right">
                <div className="dropdown">
                  <a
                    className="btn btn-primary dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                  >
                    Add Group
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" onClick={handleExport}>
                      Export List
                    </a>
                    <a className="dropdown-item" href="#">
                      Policies
                    </a>
                    <a className="dropdown-item" href="#">
                      View Assets
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pd-20 card-box mb-30">

            {/* Button to navigate the session */}
            <div className="clearfix mb-30">
              <div class="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" class="btn btn-outline-primary">
                  User Session
                </button>

                <button type="button" class="btn btn-outline-primary">
                  Center Session
                </button>
              </div>
            </div>


            <div className="table-responsive ">
              {/* <table className="table table-striped" id="ExportData" ref={tableRef}>
                <thead>
                  <tr>
                    <th scope="col">Login</th>
                    <th scope="col">Login Time</th>
                    <th scope="col">Client IP</th>
                    <th scope="col">Last Activity</th>
                    <th scope="col">End Session</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.id}>
                      <th scope="row">{item.login}</th>
                      <td>{item.loginTime}</td>
                      <td>{item.clientIP}</td>
                      <td>{item.lastActivity}</td>
                      <td>
                        <button
                          className={`badge badge-danger end-session-button  ${item.isSessionEnded ? "disabled" : ""
                            }`}
                          disabled={item.isSessionEnded}
                          onClick={() => handleEndSession(item.id)}
                        >
                          {item.isSessionEnded ? "Session Ended" : "End Session"}
                        </button>
                        {item.isSessionEnded && <div className="black-background" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> */}

              {/* Fetch data from API and Make easy to Use it */}
              <SessionTableData />

            </div>
          </div></div></div>
    </>
  )
}

export default SessionManagement