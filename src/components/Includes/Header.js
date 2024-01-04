import React, { useEffect, useState, useRef } from 'react'
import './assets/css/header.css'
import { MdLogout as MdLogout } from 'react-icons/md';
import { MdNotifications as Notify_ico } from "react-icons/md";
import Propic from '../../Assets/Images/profile.png'
import Logo from '../../Assets/Images/logoMish.png'
import secureLocalStorage from 'react-secure-storage';
import { Link, useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CancelIcon from '@mui/icons-material/Cancel';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LogoHeader from '../image/logo.webp'
const config = require('../../config.json')



const Header = (props) => {
  const [isMultilevel, setMultilevel] = useState([])
  const [isMultiLevelError, setMultiLevelError] = useState(false)
  const navigate = useNavigate()
  const ref = useRef()
  const [loading, setLoading] = useState(true);
  const [dataLoader, setDataLoader] = useState(false);
  const [isShowIconOne, setisShowIconOne] = useState("")
  const [isShowIconTwo, setisShowIconTwo] = useState("")
  const [isShowIconThree, setisShowIconThree] = useState("")
  var get_refresh_token = localStorage.getItem("refresh");
  var get_access_token = localStorage.getItem("access_token");
  var get_Name = localStorage.getItem("Emp_Name")

  async function getMultiLevelDropDown() {
    await fetch(`${config['baseUrl']}/dirmenus/GetDirMenus`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/dirmenus/GetDirMenus`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") {  }
          else {
            localStorage.setItem("refresh", response.referesh_token);
            localStorage.setItem("access_token", response.access_token);
            setMultilevel(response.data)
            setDataLoader(true);
          }
        }).catch((error) => {
          setMultiLevelError(error.message)
        }).finally(() => {
          setLoading(false);
        });
      }
      // navigate("/");
      else {
        if (response.messsage == "timeout error") {  }
        else {
          setMultilevel(response.data)
          setDataLoader(true);
        }
      }
    }).catch((error) => {
      setMultiLevelError(error.message)
    })
      .finally(() => {
        setLoading(false);
      });
  }
  
  const [isActive, setActive] = useState(false)
  const checkSideBar = () => {
    setActive(!isActive)
  }

  const logOutHandler = () => {
    secureLocalStorage.clear()
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = '/'
  }

  useEffect(() => {
    getMultiLevelDropDown()
  }, [])



  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row HeaderMain d-flex justify-content-between">
            <div className="col-lg-6 col-md-6 col-sm-6 d-flex align-items-center ColMobileRes">
              <h4 className="Header_logo">
                <TableRowsIcon onClick={checkSideBar} />
              </h4>
              <div className="form-group">
                <div className="Header_Search">
                  <Link to="/TAShortsCut" className='d-block'> 
                      <img src={LogoHeader} alt="" className='ImgLogo' />
                  </Link>
                
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 d-flex align-items-center justify-content-end ColMobileRes2">
              <span style={{color: "white",textTransform: 'capitalize'}}>{get_Name}</span>
              <div className="Header_Settings">
                <Notify_ico className="notify_ico" />
              </div>
              <div className='Header_pro_pic'>
                <img src={Propic} alt="" className="profile_img" />
              </div>

            </div>
          </div>
        </div>
        <div className='treeViewBox' id={isActive ? "openSideBar" : ""}>
          <CancelIcon className='closeIco' onClick={() => { setActive(false) }} />
          <img src={Logo} className="logoImg" alt="" />
          <span className='borderLogo'></span>
          {loading && (
            <div
              className="d-flex justify-content-center pt-2 w-100"
              style={{ background: "#262837" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          )}

          {dataLoader && (
            <>
              <ul className='menuBoxUl'>
                {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].map((items, index) => (
                  <>
                    {items.ParentCode == localStorage.getItem("Parent_Code") && items.Level == 1 ?
                      <li onClick={(e) => {
                        e.stopPropagation();
                        if (isShowIconOne == items.menulabel) {
                          setisShowIconOne("")
                        } else {
                          setisShowIconOne(items.menulabel)
                        }
                      }}>

                        <div className='flexLinks'>
                          {isShowIconOne == items.menulabel ? <ExpandMoreIcon /> : items.menulabel == "Logout" ? "" : <ChevronRightIcon />}
                          <Link to="#">{items.menulabel == "Logout" ? "" : items.menulabel}</Link>
                        </div>
                        {isShowIconOne == items.menulabel && (
                          <div className='ulList'>
                            {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == items.menucode && data.Level == 2).map((innerItemsOne) => (
                              <li
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isShowIconTwo == innerItemsOne.menulabel) {
                                    setisShowIconTwo("")
                                  } else {
                                    setisShowIconTwo(innerItemsOne.menulabel)
                                  }
                                }}
                              >

                                <div className="flexLinks">
                                  {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == innerItemsOne.menucode && data.Level == 3).length > 0 ? isShowIconTwo == innerItemsOne.menulabel ? <ExpandMoreIcon /> : <ChevronRightIcon /> : "" : ""}
                                  {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == innerItemsOne.menucode && data.Level == 3).length > 0 ? isShowIconTwo == innerItemsOne.menulabel ? <Link to="#">{innerItemsOne.menulabel}</Link> : <Link to="#">{innerItemsOne.menulabel}</Link> : <Link onClick={() => {
                                    if (innerItemsOne.menulabel) {
                                      const originalString = innerItemsOne.menulabel;
                                      const stringWithoutSpaces = originalString.split(' ').join('_');
                                      window.location.href = `/${stringWithoutSpaces}`
                                    }
                                  }} className='singleItem'>{innerItemsOne.menulabel}</Link> : ""}
                                </div>
                                {isShowIconTwo == innerItemsOne.menulabel && (
                                  <div className='ulList'>
                                    {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == innerItemsOne.menucode && data.Level == 3).map((three) => (
                                      <li
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (isShowIconThree == three.menulabel) {
                                            setisShowIconThree("")
                                          } else {
                                            setisShowIconThree(three.menulabel)
                                          }
                                        }}
                                      >

                                        <div className="flexLinks">
                                          {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == three.menucode && data.Level == 4).length > 0 ? isShowIconThree == three.menulabel ? <ExpandMoreIcon /> : <ChevronRightIcon /> : "" : ""}

                                          {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == three.menucode && data.Level == 4).length > 0 ? <Link to="#">{three.menulabel}</Link> : <Link to="#"
                                            onClick={() => {
                                              if (three.menulabel) {
                                                const originalString = three.menulabel;
                                                const removeSubstrace = originalString.replace(" – ", "_")
                                                const stringWithoutSpaces = removeSubstrace.split(' ').join('_');
                                                window.location.href = `/${stringWithoutSpaces}`
                                              }
                                            }}
                                            className='singleItem'>{three.menulabel}</Link> : ""}
                                        </div>

                                        {isShowIconThree == three.menulabel && (
                                          <div className='ulList'>
                                            {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == three.menucode && data.Level == 4).map((four) => (
                                              <li
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                }}
                                              >
                                                <Link to="#" className='singleItem4'
                                                  onClick={() => {
                                                    if (four.menulabel) {
                                                      const originalString = four.menulabel;
                                                      const removeSubstrace = originalString.replace(" – ", "_")
                                                      const stringWithoutSpaces = removeSubstrace.split(' ').join('_');
                                                      window.location.href = `/${stringWithoutSpaces}`
                                                    }
                                                  }}
                                                  >{four.menulabel}</Link>
                                              </li>
                                            )) : ""}
                                          </div>
                                        )}
                                      </li>
                                    )) : ""}
                                  </div>
                                )}
                              </li>
                            )) : ""}
                          </div>
                        )}

                      </li>
                      : ""}
                  </>
                )) : ""}

                <li>
                  <div className='flexLinks'>
                    <MdLogout className='d-lg-block d-none' style={{
                      margin:"0 5px",
                      fontSize: "18px"
                    }}/>
                    <Link className='LogOutLinkDesktop' onClick={logOutHandler}>Logout</Link>
                  </div>
                </li>

              </ul>
            </>
          )}

          <a href="#" className='mobileLogOutLink' onClick={logOutHandler}>
            <MdLogout /> Log out</a>
        </div>


      </section>
    </>
  );
};

export default Header;





