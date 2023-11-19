import React, { Fragment } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  ListItemButton,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import LockIcon from "@mui/icons-material/Lock";

import styled from "@mui/system/styled";
import * as applicationConstants from "../../utils/ApplicationConstants";
import { menuItems } from "../data/sidebarData";
import colors from "../../utils/colors";
import MaterialUISwitch from "../../Button/Switch";
import { useNavigate } from "react-router-dom";

const LogoutButton = styled(Button)({
  marginTop: "auto",
  marginBottom: "10px",
  marginRight: "5px",
  marginLeft: "5px",
});

const DrawerComponent = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const navigat = useNavigate();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = applicationConstants.DRAWER_WIDTH - 40;

  return (
    <Fragment>
      <Drawer
        sx={{
          "& .MuiBackdrop-root": {
            display: "none",
          },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        disableEnforceFocus
        variant="temporary"
        open={open}
        onClose={handleClose}
      >
        <List sx={{ mt: "4rem" }}>
          {menuItems.map((item) => (
            <ListItem
              disablePadding
              key={item.text}
              button
              onClick={item.onClick}
              disableGutters
            >
              <ListItemButton
                sx={{
                  "&:hover": {
                    width: 200,
                    paddingLeft: 5,
                  },
                }}
                component="a"
                onClick={() => {
                  navigat(item.link);
                }}
              >
                <ListItemIcon>{item.icon} </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <FormGroup>
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
              label="MUI switch"
            />
          </FormGroup>
        </List>
        {isMatch && (
          <LogoutButton
            onClick={() => {}}
            variant="contained"
            startIcon={<LockIcon />}
          >
            Log Out
          </LogoutButton>
        )}
      </Drawer>
      {isMatch && (
        <IconButton
          sx={{
            color: colors["blackDarker"],
            marginLeft: "auto",
          }}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <ListIcon />
        </IconButton>
      )}
    </Fragment>
  );
};

export default DrawerComponent;
