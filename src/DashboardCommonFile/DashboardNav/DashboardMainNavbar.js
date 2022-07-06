import React, { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Footer from "../../Components/Footer/Footer";
import "../dashboardNavbar.scss";
import DashboardTopbar from "./DashboardTopbar";
import "./navbar.scss";
import NavbarMainLink from "./NavbarMainLink";
const DashboardMainNavbar = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  // const [toggleFullscreen, settoggleFullscreen] = useState(false);
  const handle = useFullScreenHandle();
  // let dispatch = useDispatch();
  // let history = useHistory();
  // const handleLogout = () => {
  //   dispatch(logoutUser(history));
  // };
  return (
    <div>
      <FullScreen handle={handle}>
        <div
          className={
            toggle
              ? "dashboard-sidebar-nav-area showNavbar"
              : "dashboard-sidebar-nav-area"
          }
        >
          <div className="main-dashboard">
            {/* dashboard topbar  */}
            <DashboardTopbar />
            {/* dashboard topbar  */}
            <div className="toggle-main-button-area-wrap  mobile-show">
              <button
                onClick={() => {
                  setToggle(!toggle);
                }}
                className="btn mobile-show"
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
            <div className="main-navbar-body-area">
              <div
                className={
                  toggle
                    ? "dashboard-left-navbar-wrap showNavbar"
                    : "dashboard-left-navbar-wrap"
                }
              >
                {/* navbar-toggle icon wrap */}
                {/* <div className="toggle-main-button-area-wrap mobile-hide">
                  <button
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                    className="mobile-hide"
                  >
                    <i className="fas fa-bars"></i>
                  </button>
                </div> */}
                {/* navbar-toggle icon wrap */}
                <div
                  className={
                    toggle
                      ? "navbar-link-dashboard-page-components-wrap showNavbar"
                      : "navbar-link-dashboard-page-components-wrap"
                  }
                >
                  <NavbarMainLink />
                </div>
              </div>
              {/* dashboardb main body  */}
              <div
                className={
                  toggle
                    ? "dashboard-main-body-wrap showNavbar"
                    : "dashboard-main-body-wrap"
                }
              >
                {children}
              </div>

              {/* dashboardb main body  */}
            </div>
            <Footer />
          </div>
        </div>
      </FullScreen>
    </div>
  );
};

export default DashboardMainNavbar;
