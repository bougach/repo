import React from "react";
import { Fragment } from "react";
import { useTheme } from "@mui/material";
 import * as applicationConstants from "../../../Componnemts/utils/ApplicationConstants"

const themedStyles = (theme) => {
  return {
    content: {
      padding: 3,
      marginLeft: applicationConstants.DRAWER_WIDTH + 15,
      marginTop: 75,
    },
  };
};

const AwaitingReview = () => {
  const theme = useTheme();

  return (
    <Fragment>

      <div style={{ ...themedStyles(theme).content }}>
        <h1>hello u</h1>
      </div>
    </Fragment>
  );
};

export default AwaitingReview;
