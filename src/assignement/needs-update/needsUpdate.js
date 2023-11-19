import React from "react";
import { useTheme } from "@mui/material";
import * as applicationConstants from "../../Componnemts/utils/ApplicationConstants";
import Navbar from "../../Componnemts/navBar/GlobalNavBar";
import { Fragment } from "react";
import { Diversity1 } from "@mui/icons-material";
import ScreenFrame from "../../Layouts/ScreenFrame";
import { Box } from "@mui/system";

const themedStyles = (theme) => {
  return {
    content: {
      padding: 3,
      marginLeft: applicationConstants.DRAWER_WIDTH + 15,
      marginTop: 75,
    },
  };
};

const NeedsUpdate = () => {
  const theme = useTheme();

  return (
    <Box  style={{ ...themedStyles(theme).content }}>

        <h1>needsUpdate</h1>
    </Box>
  
  );
};

export default NeedsUpdate;
