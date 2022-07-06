import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useFullScreenHandle } from "react-full-screen";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../store/actions";
import mainLogo from "../img/logo.svg";
const DashboardTopbar = () => {
  const [toggleFullscreen, settoggleFullscreen] = useState(false);
  const [toggle, setToggle] = useState(false);
  let dispatch = useDispatch();
  let history = useHistory();
  const handleLogout = () => {
    dispatch(logoutUser(history));
  };
  const handle = useFullScreenHandle();
  return (
    <div>
      <div
        className={
          toggle
            ? "dashboard-topbar-wrap showNavbar"
            : "dashboard-topbar-wrap responsive-navbar"
        }
      >
        {toggle ? (
          <Link to="/">
            {/* <h5>Issue Tracker</h5> */}
            <img src={mainLogo} alt="" style={{ width: "71px" }} />
          </Link>
        ) : (
          <Link to="/">
            {" "}
            <img src={mainLogo} alt="" style={{ width: "71px" }} />
          </Link>
        )}
        {/* <Link to="/">
            <img src={logo} alt="" />
          </Link> */}
        <div className="header-topbar-right-content-wrap">
          <div className="header-topbar-right-content-wrap-left-area">
            <div className="search-box-header-top-wrap">
              <i className="fas fa-search"></i>
              <input type="search" name="" id="" placeholder="Search..." />
            </div>
          </div>
          <div className="header-topbar-right-content-wrap-right-area">
            <div className="profile-view-dropdown-area">
              <button
                className="btn p-0 full-scree"
                onClick={() => {
                  settoggleFullscreen(!toggleFullscreen);
                }}
              >
                {toggleFullscreen ? (
                  <button className="btn p-0 full-scree" onClick={handle.exit}>
                    <i className="fas fa-compress"></i>
                  </button>
                ) : (
                  <button className="btn p-0 full-scree" onClick={handle.enter}>
                    <i className="fas fa-expand"></i>
                  </button>
                )}
              </button>
              <Dropdown className="notification-dropdown-area">
                <Dropdown.Toggle
                  className="dropdown-profile-right-area-btn notification-bar"
                  id="dropdown-basic"
                >
                  <i className="far fa-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu></Dropdown.Menu>
              </Dropdown>{" "}
              <Dropdown>
                <Dropdown.Toggle
                  className="dropdown-profile-right-area-btn"
                  id="dropdown-basic"
                >
                  {/* <img src={profilePic} alt="" /> */}
                  Profile
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item> */}
                  <Dropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopbar;
