/* eslint-disable jsx-a11y/role-supports-aria-props */
// MetisMenu
import MetisMenu from "metismenujs";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
// //Import Scrollbar
import SimpleBar from "simplebar-react";
import boxAdd from "../icon/box-add.svg";
import box from "../icon/box.svg";
import cube from "../icon/cube.svg";
import icon1 from "../icon/dashboard.svg";
import gps from "../icon/gps.svg";
import hub from "../icon/hub.svg";
import icon5 from "../icon/location.svg";
import profileCircle from "../icon/profile-circle.svg";
import challan from "../icon/receipt-item.svg";
import reconcil from "../icon/reconcil.svg";
import triangle from "../icon/triangle.svg";

const SidebarContent = (props) => {
  const ref = useRef();
  const { userrole } = useSelector((state) => ({
    userrole: state.Login.userrole,
  }));

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;
    const initMenu = () => {
      const splitMain = pathName?.split("/");
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        const spitPath = items[i].pathname.split("/");
        if (
          pathName === items[i].pathname ||
          splitMain?.[1] === spitPath?.[1]
        ) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{"Menu"} </li>
            {userrole === "HUB" ? null : (
              <li>
                <Link to="/admin-dashboard" className="">
                  <i>
                    <img src={icon1} alt="icon" />
                  </i>
                  <span>{"Dashboard"}</span>
                </Link>
              </li>
            )}

      
     
            {userrole === "SUPERADMIN" ||
            userrole === "CENTRALWAREHOUSE" ||
            userrole === "HUB" ||
            userrole === "ADMIN" ||
            userrole === "VIEWADMIN" ? (
              <React.Fragment>
                <li>
                  <Link to="/user" className="">
                    <i>
                      <img src={profileCircle} alt="" />
                    </i>
                    <span>{"Users"}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/product" className="">
                    <i>
                      <img src={box} alt="" />
                    </i>
                    <span>{"Product"}</span>
                  </Link>
                </li>
              </React.Fragment>
            ) : null}

   

{userrole === "SUPERADMIN" ||
            userrole === "CENTRALWAREHOUSE" ||
            userrole === "ADMIN" ||
            userrole === "VIEWADMIN" ? (
              <li>
                <Link to="/#" className="has-arrow">
                  <i>
                    <img src={icon5} alt="" />
                  </i>
                  <span>GEO Information</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/region">{"Region"}</Link>
                  </li>
                  <li>
                    <Link to="/area">{"Area"}</Link>
                  </li>
                  <li>
                    <Link to="/territory">{"Territory"}</Link>
                  </li>
                </ul>
              </li>
            ) : null}

            {/* info */}
            {userrole === "SUPERADMIN" ||
            userrole === "CENTRALWAREHOUSE" ||
            userrole === "ADMIN" ||
            userrole === "VIEWADMIN" ? (
              <li>
                <Link to="/#" className="has-arrow">
                  <i>
                    <img src={triangle} alt="" />
                  </i>
                  <span>Info Creation</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/brand">{"Brand"}</Link>
                  </li>
                  <li>
                    <Link to="/category">{"Category"}</Link>
                  </li>
                  <li>
                    <Link to="/partner">{"Partner"}</Link>
                  </li>
                </ul>
              </li>
            ) : null}
       
         
         
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

export default withRouter(SidebarContent);
