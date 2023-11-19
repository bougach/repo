import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { Fragment } from "react";
import logoImg from "../../assets/imgs/bg/mylogoo.png";
import { useState } from "react";
import DrawerComponent from "../drawers/screens/DrawerComponent";
import { useLocalState } from "../localStorage/useLocalstorage";
import { useNavigate } from "react-router-dom";
import customFetch from "../customFetch";
import colors from "../utils/colors";
const drawerWidth = 240;

const themedStyles = (theme) => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: colors["mistyrose"],
    },
  };
};

const Navbar = () => {
  const [value, setValue] = useState(0);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const logoutfn = async () => {
    try {
      navigate("/");
      setJwt(null);

      await customFetch(`/api/auth/logout`, "post", jwt);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Fragment>
      <AppBar position="fixed" sx={{ ...themedStyles(theme).appBar }}>
        <Toolbar>
          <Avatar
            sx={{
              width: 100,
              height: 50,
            }}
            src={logoImg}
          />
          {isMatch ? (
            <>
              <DrawerComponent open={open} setOpen={setOpen} />
            </>
          ) : (
            <>
              <DrawerComponent open={true} setOpen={setOpen} />

              <Button
                onClick={logoutfn}
                sx={{
                  marginLeft: "auto",
                  bgcolor: colors["cornflowerBlue"],
                }}
                variant="contained"
              >
                Log Out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;
