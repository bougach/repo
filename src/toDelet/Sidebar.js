import React, { Fragment } from "react";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";

import styled from "@mui/system/styled";
import * as applicationConstants from "../Componnemts/utils/ApplicationConstants";
import { menuItems } from "../Componnemts/drawers/data/sidebarData";
import { Link } from "react-router-dom";

const DrawerWrapper = styled(Drawer)(({ theme }) => ({
  width: applicationConstants.DRAWER_WIDTH + 100,
  "& .MuiBackdrop-root": {
    display: "none",
  },
}));

const Sidebar = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="sidebar">
      <ul className="SidebarList">
        {menuItems.map((val, key) => {
          return (
            <li
            
              key={key}
              id={window.location.pathname === val.link ? "active" : ""}
            >
              <Link to={val.link} className="row">
                <div id="icon">{val.icon}</div>
                <div id="title">{val.text}</div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* <div>
         <Outlet />
       </div> */}
    </div>
  );
};

export default Sidebar;
