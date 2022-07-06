import React from "react";
import { Dropdown } from "react-bootstrap";
import profilePic from "./img/user bg.png";
const HeaderTopBar = () => {
  return (
    <div className="header-topbar-right-content-wrap">
      <div className="header-topbar-right-content-wrap-left-area">
        <div className="search-box-header-top-wrap">
          <i className="fas fa-search"></i>
          <input type="search" name="" id="" placeholder="Search..." />
        </div>
      </div>
      <div className="header-topbar-right-content-wrap-right-area">
        <div className="profile-view-dropdown-area">
          <Dropdown className="notification-dropdown-area">
            <Dropdown.Toggle
              className="dropdown-profile-right-area-btn notification-bar"
              id="dropdown-basic1"
            >
              <i className="far fa-bell"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>{" "}
          <Dropdown>
            <Dropdown.Toggle
              className="dropdown-profile-right-area-btn"
              id="dropdown-basic2"
            >
              <img src={profilePic} alt="" />
              Profile
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopBar;
