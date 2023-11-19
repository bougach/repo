import React from "react";
import { useTheme } from "@mui/material";
import * as applicationConstants from "../../Componnemts/utils/ApplicationConstants";
import Navbar from "../../Componnemts/navBar/GlobalNavBar";
import { Fragment } from "react";

const themedStyles = (theme) => {
  return {
    content: {
      padding: 3,
      marginLeft: applicationConstants.DRAWER_WIDTH + 15,
      marginTop: 75,
    },
  };
};

const InReview = () => {
  const theme = useTheme();

  return (
      <div style={{ ...themedStyles(theme).content }}>
        <h1>inReview</h1>
      </div>
  );
};

export default InReview;
