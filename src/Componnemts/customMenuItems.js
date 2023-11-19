import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 8, // Rounded corners
    boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)", // Drop shadow
    minWidth: 160, // Set the menu's width
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&.MuiListItem-root": {
    padding: theme.spacing(1.5, 3), // Adjust padding
    "&:hover": {
      backgroundColor: theme.palette.primary.main, // Change background color on hover
      color: "#FFFFFF", // Text color on hover
    },
  },
}));

const CustomMenu = ({ anchorEl, open, onClose, items }) => {
  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {items.map((item, index) => (
        <StyledMenuItem key={index} onClick={item.onClick}>
          {item.icon}
          <Typography sx={{ marginLeft: 1 }}>{item.label}</Typography>
        </StyledMenuItem>
      ))}
    </StyledMenu>
  );
};

export default CustomMenu;
