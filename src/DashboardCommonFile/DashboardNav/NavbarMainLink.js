import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'react-pro-sidebar/dist/css/styles.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import boxAdd from './icon/box-add.svg';
import box from './icon/box.svg';
import cube from './icon/cube.svg';
import icon1 from './icon/dashboard.svg';
import gps from './icon/gps.svg';
import hub from './icon/hub.svg';
import icon5 from './icon/location.svg';
import profileCircle from './icon/profile-circle.svg';
import challan from './icon/receipt-item.svg';
import reconcil from './icon/reconcil.svg';
import tickSquare from './icon/tick-square.svg';
import triangle from './icon/triangle.svg';
const NavbarMainLink = () => {
  const [dropClose, setDropClose] = useState(false);
  // const handleDropClose = () =>{
  //   setDropClose()
  // }
  const { userrole } = useSelector((state) => ({
    userrole: state.Login.userrole,
  }));

  return (
    <div className="navbar-item-main-wrap-nav-items">
      <h3>Menu</h3>

      <ul>
        <li onClick={() => setDropClose(!dropClose)}>
          <NavLink
            exact
            activeClassName="nav-link-selected"
            to="/admin-dashboard"
          >
            <img src={icon1} alt="" />
            <span>Dashboard</span>
          </NavLink>
        </li>
   
    
        <li
          onClick={() => setDropClose(!dropClose)}
          className={
            userrole === 'SUPERADMIN' ||
            userrole === 'CENTRALWAREHOUSE' ||
            userrole === 'HUB' ||
            userrole === 'ADMIN'
              ? 'd-block'
              : 'd-none'
          }
        >
          <NavLink exact activeClassName="nav-link-selected" to="/user">
            <img src={profileCircle} alt="" />
            <span>Users</span>
          </NavLink>
        </li>
        <li
          onClick={() => setDropClose(!dropClose)}
          className={
            userrole === 'SUPERADMIN' ||
            userrole === 'CENTRALWAREHOUSE' ||
            userrole === 'HUB' ||
            userrole === 'ADMIN'
              ? 'd-block'
              : 'd-none'
          }
        >
          <NavLink exact activeClassName="nav-link-selected" to="/product">
            <img src={box} alt="" />
            <span>Product</span>
          </NavLink>
        </li>
        <li
          onClick={() => setDropClose(!dropClose)}
          className={
            userrole === 'SUPERADMIN' ||
            userrole === 'CENTRALWAREHOUSE' ||
            userrole === 'ADMIN'
              ? 'd-block'
              : 'd-none'
          }
        >
          <NavLink exact activeClassName="nav-link-selected" to="/stock-in">
            <img src={boxAdd} alt="" />
            <span>Stock In</span>
          </NavLink>
        </li>
        <li
          onClick={() => setDropClose(!dropClose)}
          className={
            userrole === 'SUPERADMIN' ||
            userrole === 'HUB' ||
            userrole === 'CENTRALWAREHOUSE' ||
            userrole === 'ADMIN'
              ? 'd-block'
              : 'd-none'
          }
        >
          <NavLink exact activeClassName="nav-link-selected" to="/challan">
            <img src={challan} alt="" />
            <span>Challan</span>
          </NavLink>
        </li>
        <li
          onClick={() => setDropClose(!dropClose)}
          className={
            userrole === 'SUPERADMIN' || userrole === 'ADMIN'
              ? 'd-block'
              : 'd-none'
          }
        >
          <NavLink
            exact
            activeClassName="nav-link-selected"
            to="/disburse-plan"
          >
            <img src={icon1} alt="" />
            <span>Disburse Plan</span>
          </NavLink>
        </li>
        <li
          onClick={() => setDropClose(!dropClose)}
          className={
            userrole === 'SUPERADMIN' ||
            userrole === 'HUB' ||
            userrole === 'ADMIN'
              ? 'd-block'
              : 'd-none'
          }
        >
          <NavLink
            exact
            activeClassName="nav-link-selected"
            to="/reconciliation"
          >
            <img src={reconcil} alt="" />
            <span>Reconciliation</span>
          </NavLink>
        </li>
        <li
          className={
            userrole === 'SUPERADMIN' ||
            userrole === 'CENTRALWAREHOUSE' ||
            userrole === 'ADMIN'
              ? 'nav-link-dropdown-main jnmf d-block'
              : userrole === 'HUB'
              ? 'nav-link-dropdown-main jnmf d-block custom_height_hub'
              : ' nav-link-dropdown-main jnmf d-none'
          }
        >
          <a>
            <img src={gps} alt="" />
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <span>Current Stock</span>
                <b>
                  <i class="fa-solid fa-chevron-down"></i>
                </b>
              </Dropdown.Toggle>

              <Dropdown.Menu
                show={
                  window.location.pathname === '/central-inventory' ||
                  window.location.pathname === '/distribution-inventory'
                    ? true
                    : false
                }
              >
                <div className=" ">
                  <NavLink
                    exact
                    activeClassName="nav-link-selected"
                    to="/central-inventory"
                    className={
                      userrole === 'SUPERADMIN' ||
                      userrole === 'CENTRALWAREHOUSE' ||
                      userrole === 'ADMIN'
                        ? 'nav-link-dropdown-main jnmf d-block'
                        : 'nav-link-dropdown-main jnmf d-none'
                    }
                  >
                    Central Inventory
                  </NavLink>
                  <NavLink
                    activeClassName="nav-link-selected"
                    to="/distribution-inventory"
                  >
                    Hub Stock
                  </NavLink>
                  {/* <NavLink
                    activeClassName="nav-link-selected"
                    to="/inventory-bp"
                  >
                    BP Inventory
                  </NavLink> */}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </a>
        </li>{' '}
        <li
          className={
            userrole === 'SUPERADMIN' ||
            userrole === 'CENTRALWAREHOUSE' ||
            userrole === 'ADMIN'
              ? 'nav-link-dropdown-main jnmf d-block'
              : userrole === 'HUB'
              ? 'nav-link-dropdown-main jnmf d-block custom_height_hub'
              : ' nav-link-dropdown-main jnmf d-none'
          }
        >
          <a>
            <img src={cube} alt="" />
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <span>Inventory Report</span>
                <b>
                  <i class="fa-solid fa-chevron-down"></i>
                </b>
              </Dropdown.Toggle>

              <Dropdown.Menu
                show={
                  window.location.pathname === '/central-warehouse' ||
                  window.location.pathname === '/distribution-hub'
                    ? true
                    : false
                }
              >
                <div className=" ">
                  <NavLink
                    exact
                    activeClassName="nav-link-selected"
                    to="/central-warehouse"
                    className={
                      userrole === 'SUPERADMIN' ||
                      userrole === 'CENTRALWAREHOUSE' ||
                      userrole === 'ADMIN'
                        ? 'nav-link-dropdown-main jnmf d-block'
                        : 'nav-link-dropdown-main jnmf d-none'
                    }
                  >
                    Central Warehouse
                  </NavLink>
                  <NavLink
                    activeClassName="nav-link-selected"
                    to="/distribution-hub"
                  >
                    Distribution Hub
                  </NavLink>
                  {/* <NavLink
                    activeClassName="nav-link-selected"
                    to="/bp-inventory"
                  >
                    BP Inventory
                  </NavLink> */}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </a>
        </li>{' '}
        <li
          className={
            userrole === 'HUB'
              ? 'nav-link-dropdown-main jnmf d-block'
              : 'nav-link-dropdown-main jnmf d-none'
          }
        >
          <a>
            <img src={tickSquare} alt="" />
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <span>Disburse Plan</span>
                <b>
                  <i class="fa-solid fa-chevron-down"></i>
                </b>
              </Dropdown.Toggle>

              <Dropdown.Menu
                show={
                  window.location.pathname === '/today-disburse-plan' ||
                  window.location.pathname === '/distribution-disburse-plan'
                    ? true
                    : false
                }
              >
                <div className=" ">
                  <NavLink
                    exact
                    activeClassName="nav-link-selected"
                    to="/today-disburse-plan"
                  >
                    Today’s Disburse Plan
                  </NavLink>
                  <NavLink
                    activeClassName="nav-link-selected"
                    to="/distribution-disburse-plan"
                  >
                    Disbursement Report
                  </NavLink>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </a>
        </li>{' '}
      </ul>
    </div>
  );
};

export default NavbarMainLink;
