import React from "react";
import { Menu, MenuItem, ProSidebar, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
const NavbarNew = () => {
  return (
    <div>
      <ProSidebar>
        <Menu iconShape="square">
          <MenuItem>Dashboard</MenuItem>
          <SubMenu title="Components">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
      ;
    </div>
  );
};

export default NavbarNew;
