import React, { useState } from "react";
import './assets/css/sidebar.css'
import { MdDashboard as Dashboard_ico } from "react-icons/md";
import LogoMish from '../../Assets/Images/logoMish.png'
import { BiTransfer as Transaction_ico } from "react-icons/bi";
 

const Sidebar = (props) => {
  return (
    <>
      <div
        className="sideBarMainBox"
        id={props.isActiveSideBar == true ? "showSideBar" : ""}
      >
        <div
          className="sideBarInnerBox"
          id={props.isActiveSideBar == true ? "showbar" : ""}
        >
          <span>
          {props.isActiveSideBar == true ? (
            <img src={LogoMish} className="logo" />
          ) : (
            ""
          )}
        </span>
          <div className="sideBarScrollBox">
            <ul className="menuUlBox">
              <li>
                <a href="/Dashboard">
                  <span>
                    <Dashboard_ico />
                    {props.isActiveSideBar == true ? "Dashboard" : ""}
                  </span>
                </a>
              </li>
              <li>
                <a href="/TransactionAppointment">
                  <span>
                    <Transaction_ico className="SidebarIco" />
                    {props.isActiveSideBar == true
                      ? "Appointment"
                      : ""}
                  </span>
                </a>
              </li>
              <li>
                <a href="">
                  <span>
                    <Dashboard_ico />
                    {props.isActiveSideBar == true ? "Dashboard" : ""}
                  </span>
                </a>
              </li>
              <li>
                <a href="">
                  <span>
                    <Dashboard_ico />
                    {props.isActiveSideBar == true ? "Dashboard" : ""}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
